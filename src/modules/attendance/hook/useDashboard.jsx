import { useState } from "react";
import { Button, Card, Col, Row } from "antd";
import { SearchOutlined } from "@ant-design/icons";

const useDashboard = () => {
  const [h1] = useState("Dashboard Page");
  const { Meta } = Card;
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
          Dashboard
        </span>
      ),
      key: "dashboard",
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
          Course
        </span>
      ),
      key: "course",
    },
  ];

  const handleMenuClick = (e) => {
    console.log("Menu item clicked:", e.key);
  };

  function allCourse() {
    const commonStyle = {
      fontFamily: "Georama, sans-serif",
      fontWeight: 400,
      fontSize: "16px",
      borderRadius: "8px",
      height: "6vh",
    };

    return (
      <div style={{ display: "flex", flexDirection: "column" }}>
        <Row>
          <Col span={12}>
            <span
              style={{
                fontFamily: "Geologica",
                fontWeight: "bold",
                fontSize: "40px",
                color: "#000000",
              }}
            >
              All Course
            </span>
          </Col>
          <Col span={12} style={{ textAlign: "-webkit-center" }}>
            <Button
              type="primary"
              style={{
                ...commonStyle,
                width: "60%",
                color: "#000000",
                backgroundColor: "#F2F2F2",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span>Search for course...</span>
              <SearchOutlined style={{ color: "black" }} />
            </Button>
          </Col>
        </Row>
      </div>
    );
  }

  function CourseCard() {
    return (
      <div style={{ marginTop: "4vh" }}>
        <Row >
          <Col span={8} style={{ textAlign: "-webkit-right" }}>
            <Card
              hoverable
              style={{
                width: 260,
              }}
              cover={<img src="https://i.imgur.com/ET1CofP.png" />}
            >
              <Meta
                title="CSC 210 Introduction to Java ....."
                description="Semester 1/2024"
                style={{ textAlign: "left" }}
              />
            </Card>
          </Col>
          <Col span={8} style={{ textAlign: "-webkit-center" }}>
            <Card
              hoverable
              style={{
                width: 260,
              }}
              cover={<img src="https://i.imgur.com/3JlUVHL.png" />}
            >
              <Meta
                title="CSC 220 Linear Algebra for Com..."
                description="Semester 1/2024"
                style={{ textAlign: "left" }}
              />
            </Card>
          </Col>
          <Col span={8} style={{ textAlign: "-webkit-left" }}>
            <Card
              hoverable
              style={{
                width: 260,
              }}
              cover={<img src="https://i.imgur.com/Hj9vo9R.png" />}
            >
              <Meta
                title="CSC 213 Database System"
                description="Semester 1/2024"
                style={{ textAlign: "left" }}
              />
            </Card>
          </Col>
        </Row>
        <Row style={{ marginTop: "2vh" }}>
          <Col span={8} style={{ textAlign: "-webkit-right" }}>
            <Card
              hoverable
              style={{
                width: 260,
              }}
              cover={<img src="https://i.imgur.com/mBlQHYa.png" />}
            >
              <Meta
                title="CSC 220 English Listening"
                description="Semester 1/2024"
                style={{ textAlign: "left" }}
              />
            </Card>
          </Col>
          <Col span={8} style={{ textAlign: "-webkit-center" }}>
            <Card
              hoverable
              style={{
                width: 260,
              }}
              cover={<img src="https://i.imgur.com/jZz3Rby.png" />}
            >
              <Meta
                title="CSC 257 Introduction to Web ..."
                description="Semester 1/2024"
                style={{ textAlign: "left" }}
              />
            </Card>
          </Col>
          <Col span={8} style={{ textAlign: "-webkit-left" }}>
            <Card
              hoverable
              style={{
                width: 260,
              }}
              cover={<img src="https://i.imgur.com/2CmuYoR.png" />}
            >
              <Meta
                title="CSC 213 CAO"
                description="www.instagram.com"
                style={{ textAlign: "left" }}
              />
            </Card>
          </Col>
        </Row>
      </div>
    );
  }

  return {
    h1,
    items,
    handleMenuClick,
    allCourse,
    CourseCard,
  };
};

export default useDashboard;
