import React, { useState } from "react";
import { QRCodeSVG } from "qrcode.react"; // Import QRCode component to generate QR codes

const QRCodePage = ({ tripID, userID }) => {
  const value = `tripID=${tripID}&userID=${userID}`;

  return <QRCodeSVG value={value} level="H" size={200} marginSize={5} />;
};

export default QRCodePage;
