/* eslint-disable react/prop-types */
import { Col, Divider, Menu, Row } from "antd";
import NavBar from "../../registration/components/NavBarComponents/NavBar";
import useDashboard from "../hook/useDashboard";

const DashboardComponent = ({ allCourse = () => {}, CourseCard = () => {} }) => {
  const { items, handleMenuClick } = useDashboard();

  return (
    <div
      style={{
        height: "100vh",
        background: "linear-gradient(to right, #c2544d, #f09107)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <NavBar />

      <div
        style={{
          marginTop: "70px",
          flex: 1,
          borderTopRightRadius: "40px",
          borderTopLeftRadius: "40px",
          backgroundColor: "white",
        }}
      >
        <Row>
          <Col span={4}></Col>
          <Col span={20}>
            <Menu
              onClick={handleMenuClick}
              items={items}
              mode="horizontal"
              style={{
                backgroundColor: "transparent",
                border: "none",
                marginTop: "15px",
              }}
            />
          </Col>
        </Row>

        <div
          style={{
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          <Divider
            style={{
              borderColor: "#000000",
              height: "4px",
              width: "100%",
              margin: "0",
            }}
          />

          <div
            style={{
              marginTop: "30px",
              textAlign: "left",
              marginLeft: "10vw",
            }}
          >
            {allCourse()}
           
          </div>
          {CourseCard()} 
        </div>
      </div>
    </div>
  );
};

export default DashboardComponent;
