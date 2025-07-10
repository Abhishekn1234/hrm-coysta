import React from 'react';
import { Row, Col, Card, Form, Button } from 'react-bootstrap';
import {
  PeopleFill,
  PersonCheckFill,
  PersonDashFill,
  Calendar2MonthFill
} from 'react-bootstrap-icons';
import { useState,useEffect } from 'react';
export default function Dashboard() {
  const [counts, setCounts] = useState({
    total: 0,
    active: 0,
    inactive: 0,
    monthly: 0
  });
  useEffect(() => {
    // Fetch total/active/inactive counts
    const fetchCounts = async () => {
      try {
        const res = await axios.get('http://127.0.0.1:8000/api/staff/counts');
        setCounts((prev) => ({
          ...prev,
          total: res.data.total_staff,
          active: res.data.active_staff,
          inactive: res.data.inactive_staff
        }));
      } catch (err) {
        console.error('Error fetching staff counts:', err);
      }
    };

    // Fetch latest month staff count
    const fetchMonthly = async () => {
      try {
        const res = await axios.get('http://127.0.0.1:8000/api/staff/monthly');
        const latestMonth = res.data?.[res.data.length - 1]?.count || 0;

        setCounts((prev) => ({
          ...prev,
          monthly: latestMonth
        }));
      } catch (err) {
        console.error('Error fetching monthly staff:', err);
      }
    };

    fetchCounts();
    fetchMonthly();
  }, []);
  const cards = [
    {
      title: 'Total Staff',
      value: counts.total,
      icon: <PeopleFill size={24} className="text-primary" />,
    },
    {
      title: 'Active',
      value: counts.active,
      icon: <PersonCheckFill size={24} className="text-primary" />,
    },
    {
      title: 'Inactive',
      value: counts.inactive,
      icon: <PersonDashFill size={24} className="text-primary" />,
    },
    {
      title: 'Monthly Staff',
      value: counts.monthly,
      icon: <Calendar2MonthFill size={24} className="text-primary" />,
    }
  ];

  return (
    <>
      {/* Stats Cards Row */}
      {/* Stats Cards Row */}
      
<Row className="mb-4 g-4">
      {cards.map((card, idx) => (
        <Col key={idx} lg={3} md={6} sm={12}>
          <Card
            style={{
              borderRadius: '12px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
              padding: '1.2rem',
              height: '100%',
            }}
          >
            <Card.Body className="d-flex align-items-center">
              <div
                style={{
                  backgroundColor: '#f1f1f1', // Light grey background for icon circle
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
