import { PlusSquareFilled } from "@ant-design/icons";
import { Button, Flex } from "antd";
import { useState } from "react";

const useQr = () => {
  const [h1] = useState("QR Page");
  const items = [
    {
      label: (
        <span
          style={{
            fontFamily: "Georama, sans-serif",
            fontWeight: "600",
            fontSize: "16px",
          }}
        >
          Attendance
        </span>
      ),
      key: "attendance", // Match the key to routes
    },
    {
      label: (
        <span
          style={{
            fontFamily: "Georama, sans-serif",
            fontWeight: "600",
            fontSize: "16px",
          }}
        >
          QR CODE
        </span>
      ),
      key: "qr", // Match the key to routes
    },
  ];

  const handleMenuClick = (e) => {
    console.log("Menu item clicked:", e.key);
  };

  function detail() {
    return (
      <Flex vertical>
        <span
          style={{
            fontFamily: "Geologica",
            fontWeight: "bold",
            fontSize: "40px",
            color: "#F69800",
          }}
        >
          About classroom
        </span>

        <Flex
          vertical
          style={{
            fontFamily: "Open Sans",
            fontWeight: "600",
            fontSize: "18px",
            color: "#000000",
          }}
        >
          <span>CSC-230 Computer Architecture & Design</span>
          <span>Lecturer - Arjan xxxxxxxxx</span>
          <span>Time - 1:30 to 4:30 PM (Thursday)</span>
        </Flex>
      </Flex>
    );
  }

  function qrButton() {
    return (
      <Button
        style={{
          color: "white",
          backgroundColor: "#F69800",
          fontFamily: "Open Sans",
          fontWeight: "400",
          fontSize: "16px",
          height: "5vh",
          borderRadius: "8px",
        }}
      >
        Generate QR CODE
        <PlusSquareFilled style={{ color: "#1A1B1E", fontSize: "24px" }} />
      </Button>
    );
  }

  return {
    h1,
    items,
    handleMenuClick,
    detail,
    qrButton,
  };
};

export default useQr;