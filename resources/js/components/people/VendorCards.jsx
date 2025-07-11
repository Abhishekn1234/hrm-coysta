import React, { useEffect, useState } from "react";
import { Card, Col, Row, Form, Button } from "react-bootstrap";
import { FaUsers, FaCubes, FaTools } from "react-icons/fa";
import axios from "axios";

export default function VendorCards() {
  const [counts, setCounts] = useState({
    total: 0,
    material: 0,
    service: 0,
  });

  useEffect(() => {
    async function fetchCounts() {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/v1/vendor-count");
        setCounts(response.data);
      } catch (error) {
        console.error("Error fetching vendor counts:", error);
      }
    }

    fetchCounts();
  }, []);

  const cards = [
    {
      title: "Total Vendors",
      value: counts.total,
      icon: <FaUsers size={24} color="blue" />,
    },
    {
      title: "Material",
      value: counts.material,
      icon: <FaCubes size={24} color="blue" />,
    },
    {
      title: "Service",
      value: counts.service,
      icon: <FaTools size={24} color="blue" />,
    },
  ];

  return (
    <>
      {/* Count Cards */}
      <div style={{ paddingRight: "3rem" }}>
        <Row className="g-4 mb-4 justify-content-start">
          {cards.map((card, index) => (
            <Col md={3} key={index}>
              <Card
                style={{
                  borderRadius: "14px",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                  padding: "1.2rem",
                  height: "100%",
                }}
              >
                <div className="d-flex align-items-center">
                  <div
                    style={{
                      backgroundColor: "#f1f1f1",
                      borderRadius: "50%",
                      padding: "10px",
                      marginRight: "1rem",
                    }}
                  >
                    {card.icon}
                  </div>
                  <div>
                    <h6 style={{ margin: 0, fontWeight: 600, fontSize: "0.95rem" }}>
                      {card.title}
                    </h6>
                    <h5 style={{ margin: 0 }}>{card.value}</h5>
                  </div>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </div>

     
    </>
  );
}
