import { Row, Col, Form } from 'react-bootstrap';

 export default function ContactForm() {
  return (
    <Form>
      <Row className="mb-3">
        <Col md={4}>
          <Form.Group>
            <Form.Label>Phone <span className="text-danger">*</span></Form.Label>
            <Form.Control type="text" placeholder="Enter phone number" />
          </Form.Group>
        </Col>
        <Col md={4}>
          <Form.Group>
            <Form.Label>Work Phone</Form.Label>
            <Form.Control type="text" placeholder="Enter work phone" />
          </Form.Group>
        </Col>
        <Col md={4}>
          <Form.Group>
            <Form.Label>Work Email <span className="text-danger">*</span></Form.Label>
            <Form.Control type="email" placeholder="Enter work email" />
          </Form.Group>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col md={4}>
          <Form.Group>
            <Form.Label>Personal Email</Form.Label>
            <Form.Control type="email" placeholder="Enter personal email" />
          </Form.Group>
        </Col>
        <Col md={4}>
          <Form.Group>
            <Form.Label>Emergency Contact (1)</Form.Label>
            <Form.Control type="text" placeholder="Enter emergency contact 1" />
          </Form.Group>
        </Col>
        <Col md={4}>
          <Form.Group>
            <Form.Label>Emergency Contact (2)</Form.Label>
            <Form.Control type="text" placeholder="Enter emergency contact 2" />
          </Form.Group>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col md={4}>
          <Form.Group>
            <Form.Label>Mobile of Father/Mother</Form.Label>
            <Form.Control type="text" placeholder="Enter mobile number" />
          </Form.Group>
        </Col>
      </Row>

      <Row>
        <Col md={12}>
          <Form.Group>
            <Form.Label>Address</Form.Label>
            <Form.Control as="textarea" rows={3} placeholder="Enter address" />
          </Form.Group>
        </Col>
      </Row>
    </Form>
  );
}
