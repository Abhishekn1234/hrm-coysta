import React, { useEffect, useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { Users, PackageCheck, CheckCircle2 } from "lucide-react"; // Lucide icons
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
      icon: <Users size={22} color="#3b82f6" />,
      bg: "#eff6ff", // blue-100
    },
    {
      title: "Material",
      value: counts.material,
      icon: <PackageCheck size={22} color="#10b981" />,
      bg: "#ecfdf5", // green-100
    },
    {
      title: "Service",
      value: counts.service,
      icon: <CheckCircle2 size={22} color="#a855f7" />,
      bg: "#f5f3ff", // purple-100
    },
  ];

  return (
    <div className="mb-4">
      <Row className="g-4">
        {cards.map((card, index) => (
          <Col md={3} key={index}>
            <Card
              style={{
                borderRadius: "16px",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
                padding: "20px",
                border: "none",
              }}
            >
              <div className="d-flex align-items-center">
                <div
                  style={{
                    backgroundColor: card.bg,
                    borderRadius: "50%",
                    padding: "12px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginRight: "16px",
                    width: "42px",
                    height: "42px",
                  }}
                >
                  {card.icon}
                </div>
                <div>
                  <h5
                    style={{
                      margin: 0,
                      fontWeight: 700,
                      color: "#0f172a",
                      fontSize: "1.1rem",
                    }}
                  >
                    {card.value}
                  </h5>
                  <div
                    style={{
                      margin: 0,
                      color: "#475569",
                      fontSize: "14px",
                      fontWeight: 500,
                    }}
                  >
                    {card.title}
                  </div>
                </div>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}
