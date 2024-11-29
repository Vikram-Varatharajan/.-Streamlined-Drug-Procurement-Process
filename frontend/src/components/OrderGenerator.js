import React, { useState } from 'react';
import { generateOrder } from '../services/api';

function OrderGenerator({ onOrderGenerated }) {
  const [medicineName, setMedicineName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!medicineName || isNaN(quantity) || quantity <= 0) {
      setError('Please enter a valid medicine name and quantity.');
      return;
    }

    try {
      // console.log(medicineName,quantity)
      const result = await generateOrder(medicineName, parseInt(quantity, 10));
      onOrderGenerated(result);
    } catch (error) {
      console.error('Order generation error:', error);
      setError('Failed to generate order. Please try again.');
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
      <input
        type="number"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
        placeholder="Enter quantity"
        required
      />
      <button type="submit">Generate Order</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
}

export default OrderGenerator;
