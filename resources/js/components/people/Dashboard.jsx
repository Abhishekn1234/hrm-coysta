import React from 'react';
import { Row, Col, Card, Form, Button } from 'react-bootstrap';
import {
  PeopleFill,
  PersonCheckFill,
  PersonDashFill,
  Calendar2MonthFill
} from 'react-bootstrap-icons';

export default function Dashboard() {
  const cards = [
    {
      title: 'Total Staff',
      value: 6,
      icon: <PeopleFill size={24} className="text-primary" />,
    },
    {
      title: 'Active',
      value: 5,
      icon: <PersonCheckFill size={24} className="text-primary" />,
    },
    {
      title: 'Inactive',
      value: 1,
      icon: <PersonDashFill size={24} className="text-primary" />,
    },
    {
      title: 'Monthly Staff',
      value: 5,
      icon: <Calendar2MonthFill size={24} className="text-primary" />,
    }
  ];

  return (
    <>
      {/* Stats Cards Row */}
      <Row className="mb-4">
        {cards.map((card, idx) => (
          <Col md={3} key={idx}>
            <Card
              style={{
                borderRadius: '16px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                height: '100%',
                padding: '1rem',
              }}
            >
              <Card.Body className="d-flex align-items-center">
                <div
                  style={{
                    backgroundColor: '#f1f1f1',
                    borderRadius: '50%',
                    padding: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: '1rem',
                  }}
                >
                  {card.icon}
                </div>
                <div>
                  <h6 style={{ marginBottom: '0.25rem', fontWeight: 600 }}>{card.title}</h6>
                  <h4 style={{ margin: 0 }}>{card.value}</h4>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Filters Section */}
      <Card className="mb-3">
        <Card.Body>
          {/* First Row - Search and Org Select */}
          <Row className="mb-3 g-3">
            <Col md={6}>
              <Form.Control
                type="search"
                placeholder="Search..."
                style={{ borderRadius: '12px', padding: '0.6rem 1rem' }}
              />
            </Col>
            <Col md={6}>
              <Form.Select style={{ borderRadius: '12px', padding: '0.6rem 1rem' }}>
                <option>All Organizations</option>
                <option>Organization 1</option>
                <option>Organization 2</option>
              </Form.Select>
            </Col>
          </Row>

          {/* Second Row - Type & Designation */}
          <Row className="mb-3 g-3">
            <Col md={6}>
              <Form.Select style={{ borderRadius: '12px', padding: '0.6rem 1rem' }}>
                <option>All Types</option>
                <option>Type 1</option>
                <option>Type 2</option>
              </Form.Select>
            </Col>
            <Col md={6}>
              <Form.Select style={{ borderRadius: '12px', padding: '0.6rem 1rem' }}>
                <option>All Designations</option>
                <option>Designation 1</option>
                <option>Designation 2</option>
              </Form.Select>
            </Col>
          </Row>

          {/* Third Row - Skills & Reset */}
          <Row className="align-items-center g-3">
            <Col md={10}>
              <Form.Select style={{ borderRadius: '12px', padding: '0.6rem 1rem' }}>
                <option>All Skills</option>
                <option>Skill 1</option>
                <option>Skill 2</option>
              </Form.Select>
            </Col>
            <Col md={2} className="text-md-end text-start">
              <Button variant="link" className="text-primary fw-semibold p-0">
                Reset Filters
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </>
  );
}
