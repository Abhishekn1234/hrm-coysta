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
        const response = await axios.get("http://127.0.0.1:8000/api/vendors/count/all");
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

      {/* Filters Row */}
      <Row className="align-items-end mb-3">
        <Col md={4}>
          <Form.Group controlId="search">
            <Form.Control
              type="text"
              placeholder="Keyword Search"
              style={{
                borderRadius: "12px",
                padding: "0.6rem 1rem",
                boxShadow: "none",
                border: "1px solid #ced4da",
              }}
            />
          </Form.Group>
        </Col>

        <Col md={4}>
          <Form.Group controlId="organization">
            <Form.Label style={{ fontWeight: 500 }}>All Organization</Form.Label>
            <Form.Select
              style={{
                borderRadius: "12px",
                padding: "0.6rem 1rem",
              }}
            >
              <option>All</option>
              <option>Organization A</option>
              <option>Organization B</option>
            </Form.Select>
          </Form.Group>
        </Col>

        <Col md={4}>
          <Form.Group controlId="tillDate">
            <Form.Label style={{ fontWeight: 500 }}>Till Date</Form.Label>
            <Form.Control
              type="date"
              style={{
                borderRadius: "12px",
                padding: "0.6rem 1rem",
              }}
            />
          </Form.Group>
        </Col>
      </Row>

      {/* Reset Filters Link */}
      <Row>
        <Col className="text-end">
          <Button
            variant="link"
            style={{
              padding: 0,
              color: "#0d6efd",
              fontWeight: 500,
            }}
          >
            Reset Filters
          </Button>
        </Col>
      </Row>
    </>
  );
}
