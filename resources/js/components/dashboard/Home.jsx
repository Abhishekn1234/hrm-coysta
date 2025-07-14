import React, { useState,useEffect } from "react";
import { Card, Container, Row, Col } from "react-bootstrap";
import AddEmployee from "./AddEmployee";
import HRDashboardHeader from "./Navbar";
import Sidebar from "./Sidebar";
import Tables from "./Tables";
import Cards from "./Cards";

export default function Home() {
  const [stats, setStats] = useState(null);

useEffect(() => {
  fetch("http://127.0.0.1:8000/api/v1/dashboard/employee-metrics")
    .then((res) => res.json())
    .then((data) => setStats(data))
    .catch((err) => {
      console.error("Failed to fetch employee stats", err);
    });
}, []);
const cardData = stats
  ? [
      {
        id: 1,
        title: "Total Employees",
        count: stats.total_users,
        growth: stats.user_growth >= 0
          ? `+${stats.user_growth} this month`
          : `${stats.user_growth} decline`,
        countColor: "#2c7be5",
        titleBgColor: "#f8f9fa",
        bgColor: "white",
      },
      {
        id: 2,
        title: "Active Employees",
        count: stats.active_users,
        growth: `${stats.active_users} active (${Math.round((stats.active_users / stats.total_users) * 100)}%)`,
        countColor: "#00d97e",
        titleBgColor: "#f8f9fa",
        bgColor: "white",
      },
      {
        id: 3,
        title: "On Leave",
        count: stats.total_leaves_this_month,
        growth: `${stats.users_returning_this_week} returning this week`,
        countColor: "#f6c343",
        titleBgColor: "#f8f9fa",
        bgColor: "white",
      },
      {
        id: 4,
        title: "Open Positions",
        count: stats.available_positions,
        growth: `${stats.open_positions} urgent hires`,
        countColor: "#e63757",
        titleBgColor: "#f8f9fa",
        bgColor: "white",
      },
    ]
  : [];

  return (
    <>
      <HRDashboardHeader />
      <div style={{ padding: "15px" }}>
    <Container fluid style={{ padding: "0 15px" }}>
      <Row className="g-3">
        {cardData.map((item) => (
          <Col
            key={item.id}
            xs={12}
            sm={6}
            md={3}
            lg={3}
            style={{ minWidth: "230px", overflow: "hidden" }}
          >
            <Card
              style={{
                height: "150px",
                width: "270px",
                borderRadius: "12px",
                overflow: "hidden",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.03)",
                border: "1px solid #e3e6ef",
                display: "flex",
                flexDirection: "column",
                margin: "0 auto"
              }}
            >
              {/* Title Section */}
              <div
                style={{
                  backgroundColor: "#fff",
                  padding: "12px 16px",
                  borderBottom: "1px solid #f0f0f0"
                }}
              >
                <Card.Title
                  style={{
                    fontSize: "14px",
                    marginBottom: "0",
                    fontWeight: "600",
                    color: "#2f3c4e"
                  }}
                >
                  {item.title}
                </Card.Title>
              </div>

              {/* Body Section */}
              <div
                style={{
                  backgroundColor: "#f7f9fc",
                  padding: "16px",
                  flex: "1",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between"
                }}
              >
                <div
                  style={{
                    fontSize: "28px",
                    fontWeight: "700",
                    color: item.countColor,
                    marginBottom: "8px"
                  }}
                >
                  {item.count}
                </div>

                <div
                  style={{
                    fontSize: "12px",
                    color: "#95aac9",
                    fontWeight: "500"
                  }}
                >
                  {item.growth}
                </div>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  </div>
      <AddEmployee />
      <Row className="g-0">
        <Col lg={3}>
          <Sidebar />
          <Cards/>
        </Col>
        <Col lg={9}>
          <Tables />
        </Col>
      </Row>
    </>
  );
}