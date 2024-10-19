// src/components/NotFound.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1>404 - Page Not Found</h1>
      <p>Sorry, the page you're looking for doesn't exist.</p>
      <button onClick={() => navigate('/login')}>Go to Login</button>
    </div>
  );
};

export default NotFound;
