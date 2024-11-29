import React from 'react';
import SignupForm from './SignupForm';
import LoginForm from './LoginForm';
import AdminLoginForm from './AdminLoginForm';

function HomePage({ onLogin }) {
  return (
    <div>
      <h1>Welcome to our Content</h1>
      <SignupForm />
      <LoginForm onLogin={onLogin} />
      <AdminLoginForm onLogin={onLogin} />
    </div>
  );
}

export default HomePage;
