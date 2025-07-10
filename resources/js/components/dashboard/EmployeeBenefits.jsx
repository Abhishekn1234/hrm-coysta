import React, { useState } from 'react';
import {
  Modal,
  Button,
  Form,
  Card,
  Row,
  Col
} from 'react-bootstrap';
import {
  FaCalendarAlt,
  FaFilePdf,
  FaSave,
  FaTimes,
  FaEdit,
  FaFileMedical,
  FaUserShield,
  FaBalanceScale,
  FaBriefcase,
  FaWallet,
  FaMoneyBill,
  FaPercentage,
  FaGift,
  FaPassport,
  FaTicketAlt,
  FaComment,
   FaEllipsisH
} from 'react-icons/fa';

const EmployeeBenefits = ({ show, onHide }) => {
  const currentDate = new Date().toISOString().split("T")[0]; // YYYY-MM-DD
  const [activeItem, setActiveItem] = useState(null);
  const [formData, setFormData] = useState({});
const [viewItem, setViewItem] = useState(null);

  const benefitItems = [
    { id: 'esi', label: 'ESI', icon: <FaFileMedical /> },
    { id: 'insurance', label: 'Insurance', icon: <FaUserShield /> },
    { id: 'leave', label: 'Leave Balances', icon: <FaBalanceScale /> },
    { id: 'stock', label: 'Stock Options', icon: <FaBriefcase /> },
    { id: 'loan', label: 'Loan Info', icon: <FaWallet /> },
    { id: 'pf', label: 'Provident Fund', icon: <FaMoneyBill /> },
    { id: 'gratuity', label: 'Gratuity', icon: <FaPercentage /> },
    { id: 'bonus', label: 'Bonus', icon: <FaGift /> },
    { id: 'incentives', label: 'Incentives', icon: <FaPercentage /> },
    { id: 'visa', label: 'Visa', icon: <FaPassport /> },
    { id: 'travel', label: 'Travel Tickets', icon: <FaTicketAlt /> },
    { id: 'feedback', label: 'Feedback', icon: <FaComment /> },
    { id: 'other', label: 'Other Benefits', icon: <FaEllipsisH /> }
  ];

  const handleItemClick = (itemId) => {
    setActiveItem(prev => (prev === itemId ? null : itemId));
    setFormData({}); // Reset or preload if needed
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  const handleClose = () => {
    setActiveItem(null);
    onHide();
  };

  return (
    <>
   <style>
        {`
          .custom-rectangular-modal .modal-dialog {
            max-width: 90%;
            width: 90%;
            margin: auto;
          }
          .custom-rectangular-modal .modal-content {
            border-radius: 16px;
            padding: 0.5rem;
            border: 1px solid #dee2e6;
          }
        `}
      </style>

      <Modal
        show={show}
        onHide={handleClose}
        size="lg"
        centered
        scrollable
        dialogClassName="custom-rectangular-modal"
      >
        {/* Modal Header with Calendar Icon and Date */}
        <div className="px-4 pt-4">
          <div className="d-flex justify-content-end">
            <div
              className="d-inline-flex align-items-center"
              style={{
                backgroundColor: "white",
                padding: "0.5rem 1rem",
                borderRadius: "10px",
                fontSize: "10px"
              }}
            >
              <FaCalendarAlt size={10} style={{ color: "#007bff", marginRight: "8px" }} />
              <span className="fw-semibold text-secondary">
                {new Date().toLocaleDateString('en-GB', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
              </span>
            </div>
          </div>
        </div>

        {/* Summary Card */}
        <div className="px-4 pt-3">
          <Card
            style={{
              borderRadius: "15px",
              padding: "1.5rem",
              backgroundColor: "#f9f9f9",
              border: "1px solid #ddd",
            }}
            className="shadow-sm"
          >
            <Row className="align-items-center">
              <Col md={3} className="text-center mb-2 mb-md-0">
                <strong style={{ fontSize: "1.5rem", color: "#28a745" }}>₹852,500</strong>
                <p className="mb-0 text-muted">Total Benefits Value</p>
              </Col>
              <Col md={3} className="text-center mb-2 mb-md-0">
                <strong className="d-block">9</strong>
                <span className="text-muted">Active Benefits</span>
              </Col>
              <Col md={3} className="text-center mb-2 mb-md-0">
                <strong className="d-block">2025-12-31</strong>
                <span className="text-muted">Next Renewal</span>
              </Col>
              <Col md={3} className="text-center">
                <strong className="d-block">4.2/5</strong>
                <span className="text-muted">Satisfaction</span>
              </Col>
            </Row>
          </Card>
        </div>

        {/* Modal Body - Benefit Items */}
       <Modal.Body style={{ padding: "1rem 2rem" }}>
      <div className="container-fluid">
        <Row>
          {benefitItems.map((item) => (
            <Col md={3} key={item.id} className="mb-4 h-100">
              <Card className="shadow-sm h-100" style={{ borderRadius: "12px" }}>
                <Card.Body className="d-flex flex-column">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <div
                      className="d-flex align-items-center gap-2"
                      style={{ cursor: 'pointer' }}
                      onClick={() => {
                        setViewItem(item.id);
                        setActiveItem(null); // Close edit view if any
                      }}
                    >
                      <span className="text-primary">{item.icon}</span>
                      <span style={{ fontWeight: '500' }}>{item.label}</span>
                    </div>
                    <FaEdit
                      title="Edit"
                      style={{ cursor: 'pointer' }}
                      className="text-muted"
                      onClick={() => {
                        setActiveItem(item.id);
                        setViewItem(null); // Close view mode
                      }}
                    />
                  </div>

                  <hr />

                  <div className="flex-grow-1">
                    {/* View Mode */}
                    {viewItem === item.id && activeItem !== item.id && (
                      <div style={{ fontSize: "0.9rem" }}>
                        {item.id === 'esi' && (
                          <>
                            <p className="mb-1">
                              <strong>ESI Number:</strong> {formData.esiNumber || 'N/A'}
                            </p>
                            <p className="mb-1">
                              <strong>Coverage Amount:</strong> ₹{formData.coverageAmount || 'N/A'}
                            </p>
                          </>
                        )}
                        {item.id === 'insurance' && (
                          <>
                            <p className="mb-1">
                              <strong>Policy Number:</strong> {formData.policyNumber || 'N/A'}
                            </p>
                            <p className="mb-1">
                              <strong>Provider:</strong> {formData.provider || 'N/A'}
                            </p>
                          </>
                        )}
                      </div>
                    )}

                    {/* Edit Mode */}
                    {activeItem === item.id && (
                      <Form onSubmit={handleSubmit}>
                        {item.id === 'esi' && (
                          <>
                            <Form.Group className="mb-2">
                              <Form.Label>ESI Number</Form.Label>
                              <Form.Control
                                size="sm"
                                type="text"
                                name="esiNumber"
                                value={formData.esiNumber || ''}
                                onChange={handleInputChange}
                              />
                            </Form.Group>
                            <Form.Group className="mb-2">
                              <Form.Label>Coverage Amount</Form.Label>
                              <Form.Control
                                size="sm"
                                type="text"
                                name="coverageAmount"
                                value={formData.coverageAmount || ''}
                                onChange={handleInputChange}
                              />
                            </Form.Group>
                          </>
                        )}

                        {item.id === 'insurance' && (
                          <>
                            <Form.Group className="mb-2">
                              <Form.Label>Policy Number</Form.Label>
                              <Form.Control
                                size="sm"
                                type="text"
                                name="policyNumber"
                                value={formData.policyNumber || ''}
                                onChange={handleInputChange}
                              />
                            </Form.Group>
                            <Form.Group className="mb-2">
                              <Form.Label>Insurance Provider</Form.Label>
                              <Form.Control
                                size="sm"
                                type="text"
                                name="provider"
                                value={formData.provider || ''}
                                onChange={handleInputChange}
                              />
                            </Form.Group>
                          </>
                        )}

                        <div className="d-flex justify-content-end mt-3">
                          <Button type="submit" size="sm" variant="primary">
                            <FaSave className="me-1" />
                            Save
                          </Button>
                        </div>
                      </Form>
                    )}
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </Modal.Body>

        {/* Modal Footer */}
        <Modal.Footer className="d-flex justify-content-end gap-2 flex-wrap" style={{ flexWrap: "nowrap" }}>
          <Button variant="secondary" onClick={handleClose} className="d-flex align-items-center">
            <FaTimes className="me-1" />
            Close
          </Button>
          <Button variant="secondary" className="d-flex align-items-center">
            <FaFilePdf className="me-1" />
            Export to PDF
          </Button>
          <Button variant="primary" className="d-flex align-items-center">
            <FaSave className="me-1" />
            Save All Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default EmployeeBenefits;