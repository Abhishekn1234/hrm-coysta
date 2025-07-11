import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Row, Col, Form, InputGroup } from 'react-bootstrap';
import {
  FaUsers,
  FaBuilding,
  FaUser,
  FaSearch,
  FaFilter,
  FaUndo,
} from 'react-icons/fa';

export default function CustomerCards() {
  const [counts, setCounts] = useState({
    total: 0,
    business: 0,
    individual: 0,
  });

  const [filters, setFilters] = useState({
    search: '',
    organization: '',
    date: '',
  });

  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    fetchCounts();
    fetchCustomers();
  }, []);

  const fetchCounts = async () => {
    try {
      const [totalRes, businessRes, individualRes] = await Promise.all([
        axios.get('http://127.0.0.1:8000/api/customer/customers'),
        axios.get('http://127.0.0.1:8000/api/customer/customer-count-business'),
        axios.get('http://127.0.0.1:8000/api/customer/customer-count-individual'),
      ]);

      setCounts({
        total: totalRes.data.length,
        business: businessRes.data.business,
        individual: individualRes.data.individual,
      });
    } catch (err) {
      console.error('Error fetching counts:', err);
    }
  };

  const fetchCustomers = async () => {
    try {
      const res = await axios.get('http://127.0.0.1:8000/api/customer/customers');
      setCustomers(res.data);
    } catch (err) {
      console.error('Error fetching customers:', err);
    }
  };

  const handleReset = () => {
    setFilters({ search: '', organization: '', date: '' });
  };

  return (
    <div className="mb-5 px-3">
      {/* Summary Cards */}
      <div style={{ paddingRight: '10rem' }}>
        <Row className="g-4 my-4">
          {/* Total Customers */}
          <Col md={4}>
            <Card className="h-100 shadow-sm border-0" style={{ borderRadius: '16px', minHeight: '120px' }}>
              <Card.Body className="d-flex align-items-center">
                <div className="bg-light text-primary d-flex align-items-center justify-content-center me-3"
                     style={{ width: '48px', height: '48px', borderRadius: '12px' }}>
                  <FaUsers size={24} />
                </div>
                <div>
                  <div className="text-muted fw-semibold">Total Customers</div>
                  <div className="h4 fw-bold mb-0">{customers.length}</div>
                </div>
              </Card.Body>
            </Card>
          </Col>

          {/* Business */}
          <Col md={4}>
            <Card className="h-100 shadow-sm border-0" style={{ borderRadius: '16px', minHeight: '120px' }}>
              <Card.Body className="d-flex align-items-center">
                <div className="bg-light text-primary d-flex align-items-center justify-content-center me-3"
                     style={{ width: '48px', height: '48px', borderRadius: '12px' }}>
                  <FaBuilding size={24} />
                </div>
                <div>
                  <div className="text-muted fw-semibold">Business</div>
                  <div className="h4 fw-bold mb-0">{counts.business}</div>
                </div>
              </Card.Body>
            </Card>
          </Col>

          {/* Individual */}
          <Col md={4}>
            <Card className="h-100 shadow-sm border-0" style={{ borderRadius: '16px', minHeight: '120px' }}>
              <Card.Body className="d-flex align-items-center">
                <div className="bg-light text-primary d-flex align-items-center justify-content-center me-3"
                     style={{ width: '48px', height: '48px', borderRadius: '12px' }}>
                  <FaUser size={24} />
                </div>
                <div>
                  <div className="text-muted fw-semibold">Individual</div>
                  <div className="h4 fw-bold mb-0">{counts.individual}</div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>

      {/* Filter/Search Panel */}
      

      {/* Customer Cards */}
    
    </div>
  );
}
