// src/pages/QRCodePage.js

import React, { useState } from 'react';
import QRCodeGenerator from '../components/QRCodeGenerator';

const QRCodePage = () => {
  const [id, setId] = useState('');            // State for the ID input
  const [qrValue, setQrValue] = useState('');   // State for the QR code URL
  const [number, setNumber] = useState('');     // State for the number fetched from the database
  const [message, setMessage] = useState('');   // State for success/failure message

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Set the QR code URL with the id parameter
    const qrUrl = `https://your-website.com/scan?id=${id}`;
    setQrValue(qrUrl);

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/check-id/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      // Handle the response from the backend
      if (data.isValid) {
        setNumber(data.number); // Display the number from the database
        setMessage('ID is valid! Here’s the number associated with it:');
      } else {
        setMessage('ID is not valid. Please try again.');
        setNumber('');
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('An error occurred. Please try again.');
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1 style={{ margin: '30px 0', color: '#333' }}>Scan QR to check people in the car</h1>

      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        <input
          type="text"
          value={id}
          onChange={(e) => setId(e.target.value)}
          placeholder="Enter ID"
          required
          style={{
            padding: '10px',
            fontSize: '16px',
            borderRadius: '4px',
            border: '1px solid #ddd',
            marginRight: '10px',
          }}
        />
        <button
          type="submit"
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            backgroundColor: '#ff5722',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
          }}
        >
          Check ID
        </button>
      </form>

      {message && <p style={{ fontSize: '18px', color: '#333' }}>{message}</p>}
      {number && <p style={{ fontSize: '20px', fontWeight: 'bold', color: '#333' }}>Number: {number}</p>}

      {/* QR Code Component */}
      <QRCodeGenerator qrValue={qrValue} />
    </div>
  );
};

export default QRCodePage;
