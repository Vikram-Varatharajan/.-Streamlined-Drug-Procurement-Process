import React, { useState } from 'react';
import './App.css';
import PredictionForm from './components/PredictionForm';
import OrderGenerator from './components/OrderGenerator';
import OrderPlacer from './components/OrderPlacer';

function App() {
  const [prediction, setPrediction] = useState(null);
  const [order, setOrder] = useState(null);
  const [currentView, setCurrentView] = useState('home');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  const salesData = [
    { name: 'Jan', sales: 4000 },
    { name: 'Feb', sales: 3000 },
    { name: 'Mar', sales: 5000 },
    { name: 'Apr', sales: 2780 },
    { name: 'May', sales: 1890 },
    { name: 'Jun', sales: 2390 },
  ];


  const medicineInventory = [
    { name: 'Aspirin', quantity: 500, reorderLevel: 100 },
    { name: 'Ibuprofen', quantity: 300, reorderLevel: 75 },
    { name: 'Paracetamol', quantity: 400, reorderLevel: 150 },
    { name: 'Amoxicillin', quantity: 200, reorderLevel: 50 },
    { name: 'Omeprazole', quantity: 150, reorderLevel: 30 },
  ];

  const handleSignup = (e) => {
    e.preventDefault();
    alert('Signup Successful! Please continue to login.');
    setCurrentView('login');
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoggedIn(true);
    setCurrentView('prediction');
  };

  const handleAdminLogin = (e) => {
    e.preventDefault();
    setIsAdminLoggedIn(true);
    setCurrentView('adminDashboard');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsAdminLoggedIn(false);
    setCurrentView('home');
  };

  const renderHome = () => (
    <div>
      <h1>Welcome to our Medicinal Procurement System</h1>
      <button onClick={() => setCurrentView('signup')}>Sign Up</button>
      <button onClick={() => setCurrentView('login')}>Login</button>
      <button onClick={() => setCurrentView('adminLogin')}>Admin Login</button>
    </div>
  );

  const renderSignup = () => (
    <form onSubmit={handleSignup}>
      <h2>Sign Up</h2>
      <input type="text" placeholder="Username" required />
      <input type="email" placeholder="Email" required />
      <input type="password" placeholder="Password" required />
      <button type="submit">Sign Up</button>
    </form>
  );

  const renderLogin = () => (
    <form onSubmit={handleLogin}>
      <h2>Login</h2>
      <input type="text" placeholder="Username" required />
      <input type="password" placeholder="Password" required />
      <button type="submit">Login</button>
    </form>
  );

  const renderAdminLogin = () => (
    <form onSubmit={handleAdminLogin}>
      <h2>Admin Login</h2>
      <input type="text" placeholder="Admin Username" required />
      <input type="password" placeholder="Admin Password" required />
      <button type="submit">Admin Login</button>
    </form>
  );

  const renderPredictionForm = () => (
    <div>
      <h1>Medicinal Procurement Prediction</h1>
      <PredictionForm onPrediction={setPrediction} />
      {prediction && (
        <>
          <p>Prediction: {prediction}</p>
          <OrderGenerator onOrderGenerated={setOrder} />
        </>
      )}
      {order && <OrderPlacer order={order} />}
      <button onClick={handleLogout}>Logout</button>
    </div>
  );

  const renderAdminDashboard = () => (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      <div className="dashboard-container">
        <div className="dashboard-section">
          <h2>Medicine Sales Graph</h2>
          <div className="bar-chart">
            {salesData.map((data, index) => (
              <div key={index} className="bar-container">
                <div 
                  className="bar" 
                  style={{ height: `${data.sales / 50}px` }}
                  title={`${data.name}: ${data.sales}`}
                ></div>
                <div className="bar-label">{data.name}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="dashboard-section">
          <h2>Medicine Inventory</h2>
          <table className="inventory-table">
            <thead>
              <tr>
                <th>Medicine Name</th>
                <th>Quantity</th>
                <th>Reorder Level</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {medicineInventory.map((medicine, index) => (
                <tr key={index}>
                  <td>{medicine.name}</td>
                  <td>{medicine.quantity}</td>
                  <td>{medicine.reorderLevel}</td>
                  <td className={medicine.quantity <= medicine.reorderLevel ? 'low-stock' : ''}>
                    {medicine.quantity <= medicine.reorderLevel ? 'Low Stock' : 'In Stock'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );

  return (
    <div className="App">
      {currentView === 'home' && renderHome()}
      {currentView === 'signup' && renderSignup()}
      {currentView === 'login' && renderLogin()}
      {currentView === 'adminLogin' && renderAdminLogin()}
      {isLoggedIn && currentView === 'prediction' && renderPredictionForm()}
      {isAdminLoggedIn && currentView === 'adminDashboard' && renderAdminDashboard()}
    </div>
  );
}

export default App;