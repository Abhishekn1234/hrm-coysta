import { Row, Col, Form } from 'react-bootstrap';

 export default function StaffDetails() {
  return (
    <Form>
      <Row className="mb-3">
        <Col md={4}>
          <Form.Group>
            <Form.Label>Salutation <span className="text-danger">*</span></Form.Label>
            <Form.Select>
              <option>Mr.</option>
              <option>Ms.</option>
              <option>Mrs.</option>
            </Form.Select>
          </Form.Group>
        </Col>
        <Col md={4}>
          <Form.Group>
            <Form.Label>First Name <span className="text-danger">*</span></Form.Label>
            <Form.Control type="text" />
          </Form.Group>
        </Col>
        <Col md={4}>
          <Form.Group>
            <Form.Label>Last Name <span className="text-danger">*</span></Form.Label>
            <Form.Control type="text" />
          </Form.Group>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col md={4}>
          <Form.Group>
            <Form.Label>Staff ID</Form.Label>
            <Form.Control type="text" />
          </Form.Group>
        </Col>
        <Col md={4}>
          <Form.Group>
            <Form.Label>Monthly/Daily Staff <span className="text-danger">*</span></Form.Label>
            <Form.Select>
              <option>Monthly</option>
              <option>Daily</option>
            </Form.Select>
          </Form.Group>
        </Col>
        <Col md={4}>
          <Form.Group>
            <Form.Label>Designation <span className="text-danger">*</span></Form.Label>
            <Form.Select>
              <option>Select Designation</option>
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col md={4}>
          <Form.Group>
            <Form.Label>Status <span className="text-danger">*</span></Form.Label>
            <Form.Select>
              <option>Active</option>
              <option>Inactive</option>
            </Form.Select>
          </Form.Group>
        </Col>
        <Col md={4}>
          <Form.Group>
            <Form.Label>Date of Birth</Form.Label>
            <Form.Control type="date" />
          </Form.Group>
        </Col>
        <Col md={4}>
          <Form.Group>
            <Form.Label>Blood Group</Form.Label>
            <Form.Control type="text" />
          </Form.Group>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col md={4}>
          <Form.Group>
            <Form.Label>Date of Joining</Form.Label>
            <Form.Control type="date" />
          </Form.Group>
        </Col>
        <Col md={4}>
          <Form.Group>
            <Form.Label>Nature of Staff</Form.Label>
            <Form.Select>
              <option>Probation</option>
              <option>Permanent</option>
              <option>Contract</option>
            </Form.Select>
          </Form.Group>
        </Col>
        <Col md={4}>
          <Form.Group>
            <Form.Label>Experience</Form.Label>
            <Form.Control type="text" />
          </Form.Group>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col md={12}>
          <Form.Group>
            <Form.Label>Educational Qualification</Form.Label>
            <Form.Control type="text" />
          </Form.Group>
        </Col>
      </Row>
    </Form>
  );
}
