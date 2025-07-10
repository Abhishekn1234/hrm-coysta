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

  useEffect(() => {
    fetchCounts();
  }, []);

  const fetchCounts = async () => {
    try {
      const [totalRes, businessRes, individualRes] = await Promise.all([
        axios.get('http://127.0.0.1:8000/api/customers-count'),
        axios.get('http://127.0.0.1:8000/api/customers-business-count'),
        axios.get('http://127.0.0.1:8000/api/customers-individual-count'),
      ]);

      setCounts({
        total: totalRes.data.total,
        business: businessRes.data.business,
        individual: individualRes.data.individual,
      });
    } catch (err) {
      console.error('Error fetching counts:', err);
    }
  };

  const handleReset = () => {
    setFilters({ search: '', organization: '', date: '' });
  };

  return (
    <div className="mb-5 px-3">
      {/* Summary Cards */}
      <div style={{ paddingRight: '3rem' }}>
        <Row className="g-4 my-4">
          {/* Total Customers */}
          <Col md={4}>
            <Card
              className="h-100 shadow-sm border-0"
              style={{ borderRadius: '16px', minHeight: '120px' }}
            >
              <Card.Body className="d-flex align-items-center">
                <div
                  className="bg-light text-primary d-flex align-items-center justify-content-center me-3"
                  style={{ width: '48px', height: '48px', borderRadius: '12px' }}
                >
                  <FaUsers size={24} />
                </div>
                <div>
                  <div className="text-muted fw-semibold">Total Customers</div>
                  <div className="h4 fw-bold mb-0">{counts.total}</div>
                </div>
              </Card.Body>
            </Card>
          </Col>

          {/* Business */}
          <Col md={4}>
            <Card
              className="h-100 shadow-sm border-0"
              style={{ borderRadius: '16px', minHeight: '120px' }}
            >
              <Card.Body className="d-flex align-items-center">
                <div
                  className="bg-light text-primary d-flex align-items-center justify-content-center me-3"
                  style={{ width: '48px', height: '48px', borderRadius: '12px' }}
                >
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
            <Card
              className="h-100 shadow-sm border-0"
              style={{ borderRadius: '16px', minHeight: '120px' }}
            >
              <Card.Body className="d-flex align-items-center">
                <div
                  className="bg-light text-primary d-flex align-items-center justify-content-center me-3"
                  style={{ width: '48px', height: '48px', borderRadius: '12px' }}
                >
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
      <Card className="shadow-sm border-0 rounded-4">
        <Card.Body>
          <Row className="g-3 align-items-center">
            {/* Search */}
            <Col md={4}>
              <InputGroup>
                <InputGroup.Text className="bg-light border-end-0">
                  <FaSearch className="text-muted" />
                </InputGroup.Text>
                <Form.Control
                  placeholder="Keyword search..."
                  aria-label="Search customers"
                  className="border-start-0"
                  value={filters.search}
                  onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                />
              </InputGroup>
            </Col>

            {/* Organization Filter */}
            <Col md={4}>
              <InputGroup>
                <InputGroup.Text className="bg-light border-end-0">
                  <FaFilter className="text-muted" />
                </InputGroup.Text>
                <Form.Select
                  className="border-start-0"
                  aria-label="Organization filter"
                  value={filters.organization}
                  onChange={(e) => setFilters({ ...filters, organization: e.target.value })}
                >
                  <option value="">All Organizations</option>
                  <option value="org1">Organization 1</option>
                  <option value="org2">Organization 2</option>
                </Form.Select>
              </InputGroup>
            </Col>

            {/* Date Filter */}
            <Col md={4}>
              <Form.Select
                aria-label="Date filter"
                value={filters.date}
                onChange={(e) => setFilters({ ...filters, date: e.target.value })}
              >
                <option value="">Till Date</option>
                <option value="today">Today</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
              </Form.Select>
            </Col>
          </Row>

          {/* Reset Filters */}
          <div className="d-flex justify-content-end mt-3">
            <span
              className="text-primary fw-semibold d-flex align-items-center"
              style={{ cursor: 'pointer' }}
              onClick={handleReset}
            >
              <FaUndo className="me-1" /> Reset Filters
            </span>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}
