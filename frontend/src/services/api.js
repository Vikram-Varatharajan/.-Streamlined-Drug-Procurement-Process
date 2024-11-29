const API_BASE_URL = 'http://127.0.0.1:8000';

export async function predictMedicine(medicineName) {
  const response = await fetch(`${API_BASE_URL}/predict/?medicine_name=${medicineName}`, {
    method: 'GET',
  });
  if (!response.ok) {
    throw new Error('Prediction request failed');
  }
  return response.json();
}


export async function generateOrder(medicineName, quantity) {
  try {
    console.log(medicineName,quantity)
    const response = await fetch(`${API_BASE_URL}/orders/generate`, {
      method: 'POST',
      body:JSON.stringify({ medicine_name: medicineName, quantity:quantity }), 
    });

    if (!response.ok) {
      throw new Error(`Order generation request failed with status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}


export async function placeOrder(orderDetails) {
  const response = await fetch(`${API_BASE_URL}/orders/place`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ order_details: orderDetails }),
  });
  if (!response.ok) {
    throw new Error('Order placement request failed');
  }
  return response.json();
}
