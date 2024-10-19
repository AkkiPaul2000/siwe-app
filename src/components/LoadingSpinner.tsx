// src/components/LoadingSpinner.tsx
import React from 'react';

const LoadingSpinner = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div className="spinner"></div>  {/* Add your CSS for the spinner here */}
      <p>Loading...</p>
    </div>
  );
};

export default LoadingSpinner;
