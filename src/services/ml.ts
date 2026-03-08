import * as tf from '@tensorflow/tfjs';

export class TariffMLModel {
  private model: tf.LayersModel | null = null;
  private isLoaded = false;

  async loadModel(modelPath: string = '/models/tariff-predictor') {
    try {
      this.model = await tf.loadLayersModel(`${modelPath}/model.json`);
      this.isLoaded = true;
      console.log('ML Model loaded successfully');
    } catch (error) {
      console.error('Failed to load ML model:', error);
      this.isLoaded = false;
    }
  }

  async predict(input: {
    lifelineThreshold: number;
    lifelineRate: number;
    domesticRate: number;
    fixedCharge: number;
    regionalSubsidy: number;
    householdIncome: number;
    consumption: number;
  }) {
    if (!this.isLoaded || !this.model) {
      return this.fallbackPrediction(input);
    }

    try {
      const inputTensor = tf.tensor2d([[
        input.lifelineThreshold,
        input.lifelineRate,
        input.domesticRate,
        input.fixedCharge,
        input.regionalSubsidy,
        input.householdIncome,
        input.consumption,
      ]]);

      const prediction = this.model.predict(inputTensor) as tf.Tensor;
      const result = await prediction.data();
      
      inputTensor.dispose();
      prediction.dispose();

      return {
        predictedEPI: result[0],
        predictedCost: result[1],
        confidence: result[2],
      };
    } catch (error) {
      console.error('Prediction error:', error);
      return this.fallbackPrediction(input);
    }
  }

  private fallbackPrediction(input: any) {
    let cost = 0;
    if (input.consumption <= input.lifelineThreshold) {
      cost = input.consumption * input.lifelineRate;
    } else {
      cost = input.lifelineThreshold * input.lifelineRate;
      cost += (input.consumption - input.lifelineThreshold) * input.domesticRate;
    }
    cost += input.fixedCharge;
    cost = cost * (1 - input.regionalSubsidy / 100);

    const epi = (cost / input.householdIncome) * 100;

    return {
      predictedEPI: epi,
      predictedCost: cost,
      confidence: 0.85,
    };
  }

  async batchPredict(inputs: any[]) {
    return Promise.all(inputs.map(input => this.predict(input)));
  }
}

export const mlModel = new TariffMLModel();
