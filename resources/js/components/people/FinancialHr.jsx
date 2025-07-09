import { Row, Col, Form } from 'react-bootstrap';

export default function FinancialHR() {
  return (
    <Form>
      <Row className="mb-3">
        <Col md={4}>
          <Form.Group>
            <Form.Label>Daily Remuneration</Form.Label>
            <Form.Control type="number" placeholder="Enter daily remuneration" />
          </Form.Group>
        </Col>

        <Col md={4}>
          <Form.Group>
            <Form.Label>Rent Allowance %</Form.Label>
            <Form.Control type="number" placeholder="Enter allowance percentage" />
          </Form.Group>
        </Col>

        <Col md={4}>
          <Form.Group>
            <Form.Label>No. Of Casual Leaves</Form.Label>
            <Form.Control type="number" placeholder="Enter no. of casual leaves" />
          </Form.Group>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col md={4}>
          <Form.Group>
            <Form.Label>ESI Card No.</Form.Label>
            <Form.Control type="text" placeholder="Enter ESI card number" />
          </Form.Group>
        </Col>

        <Col md={4}>
          <Form.Group>
            <Form.Label>PF No.</Form.Label>
            <Form.Control type="text" placeholder="Enter PF number" />
          </Form.Group>
        </Col>

        <Col md={4}>
          <Form.Group>
            <Form.Label>COVID-19 Vaccinated</Form.Label>
            <Form.Select>
              <option>Yes</option>
              <option>No</option>
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>
    </Form>
  );
}
