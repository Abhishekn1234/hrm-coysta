import React from "react";
import { Card, Col, Row, Form, Button } from "react-bootstrap";
import { FaUsers, FaCubes, FaTools } from "react-icons/fa";

export default function VendorCards() {
  const cards = [
    {
      title: "Total Vendors",
      value: 4,
      icon: <FaUsers size={24} color="blue" />,
    },
    {
      title: "Material",
      value: 2,
      icon: <FaCubes size={24} color="blue" />,
    },
    {
      title: "Service",
      value: 2,
      icon: <FaTools size={24} color="blue" />,
    },
  ];

  return (
    <>
      {/* Top Summary Cards */}
      <Row className="g-4 mb-4">
        {cards.map((card, index) => (
          <Col md={4} key={index}>
            <Card
              style={{
                borderRadius: "16px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                padding: "1.5rem",
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
                  <h6 style={{ margin: 0, fontWeight: 600 }}>{card.title}</h6>
                  <h4 style={{ margin: 0 }}>{card.value}</h4>
                </div>
              </div>
            </Card>
          </Col>
        ))}
      </Row>

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
