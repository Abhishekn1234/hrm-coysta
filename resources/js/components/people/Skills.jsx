import { Form } from 'react-bootstrap';

export default function Skills() {
  return (
    <Form>
      <Form.Group>
        <Form.Label>Skills</Form.Label>
        <Form.Select multiple style={{ height: '150px' }}>
          <option>Client Service</option>
          <option>Sales</option>
          <option>Video Design</option>
          <option>Transportation</option>
          <option>Asst.Technician</option>
        </Form.Select>
        <Form.Text muted>
          Hold Ctrl/Cmd to select multiple.
        </Form.Text>
      </Form.Group>
    </Form>
  );
}
