import React, { useState } from 'react';
import { predictMedicine } from '../services/api';

function PredictionForm({ onPrediction }) {
  const [medicineName, setMedicineName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const result = await predictMedicine(medicineName);
      onPrediction(result.prediction);
    } catch (error) {
      console.log('Prediction error:', error);
      setError('Failed to get prediction. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={medicineName}
        onChange={(e) => setMedicineName(e.target.value)}
        placeholder="Enter medicine name"
        required
      />
      <button type="submit">Predict</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
}

export default PredictionForm;
