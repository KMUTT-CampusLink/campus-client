// src/pages/DriverPage.js

import React, { useState } from 'react';
import QrScanner from 'react-qr-scanner';

const DriverPage = () => {
  const [data, setData] = useState('No result');

  const handleScan = async (scanData) => {
    if (scanData) {
      // Log the scanned data for debugging
      console.log('Scanned data:', scanData);
      setData('Validating...'); // Provide user feedback while checking

      try {
        // Ensure scanData is in the expected format (string or id)
        const idToCheck = typeof scanData === 'string' ? scanData : scanData.id;

        const response = await fetch(`${process.env.REACT_APP_API_URL}/check-id/${idToCheck}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        // Check if the response is okay
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const result = await response.json();

        // Check the response structure based on your backend API
        if (result.isValid) {
          setData(`ID is valid! Number: ${result.number}`);
        } else {
          setData('ID is not valid. Please try again.');
        }
      } catch (error) {
        console.error('Error:', error);
        setData('An error occurred while checking the ID.'); // Consider providing more context
      }
    }
  };

  const handleError = (err) => {
    console.error('Scan error:', err);
    setData('Error scanning QR code. Please try again.');
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Scan QR Code</h1>
      <QrScanner
        onScan={handleScan}
        onError={handleError}
        style={{ width: '100%', maxWidth: '500px', margin: '0 auto' }}
      />
      <p style={{ fontSize: '18px', color: '#333' }}>{data}</p>
    </div>
  );
};

export default DriverPage;
