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
  FaGift, FaUserShield, FaFileMedical, FaBalanceScale,
  FaPlane, FaWallet, FaBriefcase, FaMoneyBill, FaPercentage,
  FaPassport, FaTicketAlt, FaComment, FaEdit
} from 'react-icons/fa';

const EmployeeBenefits = ({ show, onHide }) => {
  const [activeItem, setActiveItem] = useState(null);
  const [formData, setFormData] = useState({});

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
  ];

  const handleItemClick = (itemId) => {
    setActiveItem(prev => (prev === itemId ? null : itemId));
    setFormData({}); // Load existing data if needed
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
    <Modal show={show} onHide={handleClose} size="lg" centered scrollable>
      <Modal.Header closeButton>
        <Modal.Title>Employee Benefits - Next Renewal: 2025-12-31</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="container-fluid">
          <Row>
            {benefitItems.map((item) => (
              <Col md={4} key={item.id} className="mb-4">
               <Card className="shadow-sm">

                  <Card.Body>
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <div className="d-flex align-items-center gap-2">
                        <span className="text-primary">{item.icon}</span>
                        <span style={{ fontWeight: '500' }}>{item.label}</span>
                      </div>
                      <FaEdit
                        style={{ cursor: 'pointer' }}
                        className="text-muted"
                        onClick={() => handleItemClick(item.id)}
                      />
                    </div>

                    {/* Show form inside the card if active */}
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

                        {/* Add other benefit-specific conditions here if needed */}

                        <div className="d-flex justify-content-end mt-3">
                          <Button type="submit" size="sm" variant="primary">
                            Save
                          </Button>
                        </div>
                      </Form>
                    )}
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EmployeeBenefits;
