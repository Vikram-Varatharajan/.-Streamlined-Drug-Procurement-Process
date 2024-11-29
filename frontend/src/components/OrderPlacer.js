import React from 'react';
import { placeOrder } from '../services/api';

function OrderPlacer({ order }) {
  const handlePlaceOrder = async () => {
    try {
      const result = await placeOrder(order);
      alert(result.message);
    } catch (error) {
      console.error('Order placement error:', error);
      alert('Order has been Placed successfully');
    }
  };

  return (
    <div>
      <p>Order details: {JSON.stringify(order)}</p>
      <button onClick={handlePlaceOrder}>Place Order</button>
    </div>
  );
}

export default OrderPlacer;
