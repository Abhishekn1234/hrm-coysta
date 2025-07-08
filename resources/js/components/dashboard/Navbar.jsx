import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FaUsersCog } from "react-icons/fa";

export default function HRDashboardHeader() {
  
  return (
    <div
      style={{
        position: "relative", // Changed from fixed to relative for normal flow
        width: "100%",
        backgroundColor: "purple",
        color: "white",
        padding: "10px 0", // Reduced vertical padding
        borderBottom: "1px solid #fff",
        boxSizing: "border-box",
       
      }}
    >
      <Container>
        <Row className="align-items-center">
          {/* Left Side - Dashboard Title */}
          <Col xs={7} md={8}>
            <div style={{ 
              display: "flex", 
              
            
              
            }}>
              <FaUsersCog style={{ fontSize: "28px" }} /> {/* Slightly smaller icon */}
              <div>
                <h4 style={{ 
                  margin: 0, 
                  fontWeight: "bold",
                  fontSize: "18px", // Slightly smaller font
                  color:"white"
                }}>
                  HR Management Dashboard
                </h4>
                <p style={{ 
                  margin: 0, 
                  fontSize: "13px", // Slightly smaller font
                  opacity: 0.9,
                  lineHeight: "1.3" // Tighter line height
                }}>
                  Manage your workforce efficiently
                </p>
              </div>
            </div>
          </Col>

          {/* Right Side - User Profile */}
          <Col xs={5} md={4}>
            <div style={{ 
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              gap: "10px", // Reduced gap
              paddingRight: "15px" // Reduced padding
            }}>
              <div style={{ textAlign: "right" }}>
                <div style={{ 
                  display: "flex",
                  alignItems: "center",
                  gap: "8px", // Reduced gap
                  justifyContent: "flex-end"
                }}>
                  <div
                    style={{
                      width: "34px", // Smaller avatar
                      height: "34px",
                      borderRadius: "50%",
                      backgroundColor: "#5dade2",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      color: "white",
                      fontWeight: "bold",
                      fontSize: "13px", // Smaller font
                    }}
                  >
                    HM
                  </div>
                  <div style={{ 
                    fontWeight: "bold", 
                    fontSize: "14px" // Slightly smaller font
                  }}>
                    Abhishek N
                  </div>
                </div>
                <div
                  style={{
                    fontSize: "12px", // Smaller font
                    marginTop: "1px", // Reduced margin
                    opacity: 0.9,
                  }}
                >
                  HR Manager
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}