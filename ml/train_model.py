import numpy as np
import pandas as pd
import tensorflow as tf
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
import tensorflowjs as tfjs

def prepare_data():
    n_samples = 10000
    data = {
        'lifelineThreshold': np.random.uniform(20, 60, n_samples),
        'lifelineRate': np.random.uniform(8, 18, n_samples),
        'domesticRate': np.random.uniform(15, 30, n_samples),
        'fixedCharge': np.random.uniform(50, 250, n_samples),
        'regionalSubsidy': np.random.uniform(0, 30, n_samples),
        'householdIncome': np.random.uniform(15000, 80000, n_samples),
        'consumption': np.random.uniform(30, 300, n_samples),
    }
    df = pd.DataFrame(data)
    
    def calculate_cost(row):
        if row['consumption'] <= row['lifelineThreshold']:
            cost = row['consumption'] * row['lifelineRate']
        else:
            cost = row['lifelineThreshold'] * row['lifelineRate']
            cost += (row['consumption'] - row['lifelineThreshold']) * row['domesticRate']
        cost += row['fixedCharge']
        cost = cost * (1 - row['regionalSubsidy'] / 100)
        return cost
    
    df['electricityCost'] = df.apply(calculate_cost, axis=1)
    df['epi'] = (df['electricityCost'] / df['householdIncome']) * 100
    return df

def build_model(input_dim):
    model = tf.keras.Sequential([
        tf.keras.layers.Dense(128, activation='relu', input_dim=input_dim),
        tf.keras.layers.Dropout(0.2),
        tf.keras.layers.Dense(64, activation='relu'),
        tf.keras.layers.Dropout(0.2),
        tf.keras.layers.Dense(32, activation='relu'),
        tf.keras.layers.Dense(3)
    ])
    model.compile(optimizer='adam', loss='mse', metrics=['mae'])
    return model

def train_model():
    df = prepare_data()
    features = ['lifelineThreshold', 'lifelineRate', 'domesticRate', 
                'fixedCharge', 'regionalSubsidy', 'householdIncome', 'consumption']
    X = df[features].values
    y = np.column_stack([df['epi'].values, df['electricityCost'].values, np.ones(len(df))])
    
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    scaler = StandardScaler()
    X_train = scaler.fit_transform(X_train)
    X_test = scaler.transform(X_test)
    
    model = build_model(X_train.shape[1])
    model.fit(X_train, y_train, validation_data=(X_test, y_test), epochs=50, batch_size=32, verbose=1)
    return model

def export_model(model, output_path='./public/models/tariff-predictor'):
    tfjs.converters.save_keras_model(model, output_path)

if __name__ == '__main__':
    model = train_model()
    export_model(model)
