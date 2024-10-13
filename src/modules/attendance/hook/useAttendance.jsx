import { Flex, DatePicker, Row, Col, Button, Table } from "antd";
import { useState } from "react";
import moment from "moment";
import { SearchOutlined, FormOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const useAttendance = () => {
  const [h1] = useState("Attendance Page");
  const [selectedDate, setSelectedDate] = useState(null);
  const navigate = useNavigate();

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
      key: "Attendance",
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
      key: "QR CODE",
    },
  ];

  const handleMenuClick = (e) => {
    console.log("Menu item clicked:", e.key);
    if (e.key === "Attendance") {
      navigate("/attendance");
    } else if (e.key === "qQR CODE") {
      navigate("/qr");
    }
  };

  const AttendanceDetail = () => (
    <Flex vertical>
      <span
        style={{
          fontFamily: "Geologica",
          fontWeight: "bold",
          fontSize: "30px",
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

  const chooseDate = () => {
    const handleDateChange = (date, dateString) => {
      setSelectedDate(date);
      console.log("Selected Date:", dateString);
    };

    const commonStyle = {
      fontFamily: "Georama, sans-serif",
      fontWeight: 400,
      fontSize: "16px",
      borderRadius: "10px",
      height: "5vh",
    };

    return (
      <Flex vertical>
        <span
          style={{
            fontFamily: "Geologica",
            fontWeight: "bold",
            fontSize: "30px",
            color: "#F69800",
          }}
        >
          Choose Date
        </span>
        <Row align="middle" gutter={16} style={{ marginTop: "20px" }}>
          <Col span={12}>
            <DatePicker
              onChange={handleDateChange}
              format="YYYY-MM-DD"
              value={selectedDate ? moment(selectedDate) : null}
              style={{ ...commonStyle, width: "80%" }}
              placeholder="Select Date"
            />
          </Col>
          <Col span={12}>
            <Button
              type="primary"
              style={{
                ...commonStyle,
                width: "20%",
                color: "white",
                backgroundColor: "#F69800",
              }}
            >
              Search
              <SearchOutlined style={{ marginLeft: "8px", color: "white" }} />
            </Button>
          </Col>
        </Row>
      </Flex>
    );
  };

  const table = () => {
    const columns = [
      { title: "Date", dataIndex: "date", key: "date" },
      { title: "Student Name", dataIndex: "studentName", key: "studentName" },
      { title: "Student ID", dataIndex: "studentId", key: "studentId" },
      {
        title: "Status",
        dataIndex: "status",
        key: "status",
        render: (text) => (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span style={{ marginRight: "8px" }}>{text}</span>
            <FormOutlined style={{ color: "#864E41" }} />
          </div>
        ),
      },
    ];

    const data = [
      {
        key: "1",
        date: "2024-10-12",
        studentName: "John Brown",
        studentId: "S12345",
        status: "Present",
      },
      {
        key: "2",
        date: "2024-10-12",
        studentName: "Jim Green",
        studentId: "S12346",
        status: "Absent",
      },
      {
        key: "3",
        date: "2024-10-12",
        studentName: "Joe Black",
        studentId: "S12347",
        status: "Late",
      },
    ];

    return (
      <Flex vertical>
        <span
          style={{
            fontFamily: "Geologica",
            fontWeight: "bold",
            fontSize: "30px",
            color: "#F69800",
          }}
        >
          Attendance Check
        </span>
        <Table
          columns={columns}
          dataSource={data}
          style={{ marginTop: "20px", width: "100%", maxWidth: "75vw" }}
          pagination={false}
        />
      </Flex>
    );
  };

  return {
    h1,
    items,
    handleMenuClick,
    AttendanceDetail,
    chooseDate,
    table,
  };
};

export default useAttendance;
