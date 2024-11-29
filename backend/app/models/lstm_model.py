import numpy as np
import pandas as pd
from sklearn.preprocessing import MinMaxScaler
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import LSTM, Dense
from tensorflow.keras.optimizers import Adam
from app.utils.data_preprocessing import load_and_preprocess_data, create_sequences

class LSTMModel:
    def __init__(self, file_path='E:/One YES Hackathon/data/medical_sales_data.csv', n_steps=30):
        self.n_steps = n_steps
        self.df = load_and_preprocess_data(file_path)
        
        self.scaler = MinMaxScaler()
        self.scaled_data = self.scaler.fit_transform(self.df.drop('total', axis=1))
        
        self.X, self.y = create_sequences(self.scaled_data, self.n_steps)
        
        self.model = self._build_model()
        self._train_model()

    def _build_model(self):
        model = Sequential([
            LSTM(50, activation='relu', input_shape=(self.n_steps, self.X.shape[2]), return_sequences=True),
            LSTM(50, activation='relu'),
            Dense(self.X.shape[2])  
        ])
        model.compile(optimizer=Adam(learning_rate=0.001), loss='mse')  
        return model

    def _train_model(self, epochs=200, batch_size=32):
        print(f"Training model with input shape: {self.X.shape}")
        self.model.fit(self.X, self.y, epochs=epochs, batch_size=batch_size, validation_split=0.2, verbose=1)

    def predict(self, medicine_name):
        if medicine_name not in self.df.columns:
            raise ValueError(f"Medicine '{medicine_name}' not found in the dataset")
        
        medicine_index = self.df.columns.get_loc(medicine_name)
        
        last_sequence = self.X[-1] 
        
        prediction = self.model.predict(np.array([last_sequence]))
        
        prediction_rescaled = self.scaler.inverse_transform(prediction)
        
        medicine_prediction = prediction_rescaled[0, medicine_index]
        return int(round(medicine_prediction))

lstm_model = LSTMModel()
