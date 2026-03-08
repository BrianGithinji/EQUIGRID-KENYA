import express from 'express';
import cors from 'cors';
import * as tf from '@tensorflow/tfjs-node';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

let mlModel: tf.LayersModel | null = null;

async function loadModel() {
  try {
    mlModel = await tf.loadLayersModel('file://./models/tariff-predictor/model.json');
    console.log('ML Model loaded');
  } catch (error) {
    console.error('Model load failed:', error);
  }
}

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', modelLoaded: mlModel !== null });
});

app.post('/api/ml/predict', async (req, res) => {
  try {
    const { households, tariffParams } = req.body;
    if (!mlModel) return res.status(503).json({ error: 'ML model not loaded' });

    const predictions = await Promise.all(
      households.map(async (hh: any) => {
        const input = tf.tensor2d([[
          tariffParams.lifelineThreshold, tariffParams.lifelineRate,
          tariffParams.domesticRate, tariffParams.fixedCharge,
          tariffParams.regionalSubsidy, hh.householdIncome, hh.consumption,
        ]]);
        const prediction = mlModel!.predict(input) as tf.Tensor;
        const result = await prediction.data();
        input.dispose();
        prediction.dispose();
        return { householdId: hh.id, predictedEPI: result[0], predictedCost: result[1], confidence: result[2] };
      })
    );
    res.json({ predictions });
  } catch (error) {
    res.status(500).json({ error: 'Prediction failed' });
  }
});

app.post('/api/households', async (req, res) => {
  res.json({ data: [], total: 0 });
});

app.get('/api/gis/boundaries', async (req, res) => {
  res.json({ type: 'FeatureCollection', features: [] });
});

app.post('/api/sync', async (req, res) => {
  res.json({ success: true });
});

loadModel().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
