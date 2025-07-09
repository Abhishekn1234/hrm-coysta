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
  return (
    <div className="mb-4">
      {/* Summary Cards Row */}
      <Row className="mb-4 g-3">
        {/* Total Customers */}
        <Col md={4}>
          <Card className="h-100 shadow-sm" style={{ borderRadius: '16px' }}>
            <Card.Body className="d-flex align-items-center">
              <div className="icon-circle bg-light me-3">
                <FaUsers className="text-primary" size={24} />
              </div>
              <div>
                <h6 className="mb-1 fw-semibold">Total Customers</h6>
                <h4 className="mb-0 fw-bold">4</h4>
              </div>
            </Card.Body>
          </Card>
        </Col>

        {/* Business */}
        <Col md={4}>
          <Card className="h-100 shadow-sm" style={{ borderRadius: '16px' }}>
            <Card.Body className="d-flex align-items-center">
              <div className="icon-circle bg-light me-3">
                <FaBuilding className="text-primary" size={24} />
              </div>
              <div>
                <h6 className="mb-1 fw-semibold">Business</h6>
                <h4 className="mb-0 fw-bold">2</h4>
              </div>
            </Card.Body>
          </Card>
        </Col>

        {/* Individual */}
        <Col md={4}>
          <Card className="h-100 shadow-sm" style={{ borderRadius: '16px' }}>
            <Card.Body className="d-flex align-items-center">
              <div className="icon-circle bg-light me-3">
                <FaUser className="text-primary" size={24} />
              </div>
              <div>
                <h6 className="mb-1 fw-semibold">Individual</h6>
                <h4 className="mb-0 fw-bold">2</h4>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Filters and Search Row */}
      <Card className="shadow-sm mb-4" style={{ borderRadius: '16px' }}>
        <Card.Body>
          <Row className="g-3 align-items-center">
            {/* Search */}
            <Col md={4}>
              <InputGroup>
                <InputGroup.Text className="bg-light">
                  <FaSearch className="text-muted" />
                </InputGroup.Text>
                <Form.Control
                  placeholder="Keyword search..."
                  aria-label="Search customers"
                  style={{ borderRadius: '0 8px 8px 0' }}
                />
              </InputGroup>
            </Col>

            {/* Organization Filter */}
            <Col md={4}>
              <InputGroup>
                <InputGroup.Text className="bg-light">
                  <FaFilter className="text-muted" />
                </InputGroup.Text>
                <Form.Select aria-label="Organization filter">
                  <option>All Organizations</option>
                  <option value="org1">Organization 1</option>
                  <option value="org2">Organization 2</option>
                </Form.Select>
              </InputGroup>
            </Col>

            {/* Date Filter */}
            <Col md={4}>
              <Form.Select aria-label="Date filter">
                <option>Till Date</option>
                <option value="today">Today</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
              </Form.Select>
            </Col>
          </Row>

          {/* Reset Button */}
          <div className="d-flex justify-content-end mt-3">
            <span
              className="text-primary fw-semibold d-flex align-items-center"
              style={{ cursor: 'pointer' }}
            >
             Reset Filters
            </span>
          </div>
        </Card.Body>
      </Card>

      {/* Icon styling */}
      <style jsx>{`
        .icon-circle {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }
      `}</style>
    </div>
  );
}
