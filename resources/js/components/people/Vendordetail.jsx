import { useParams, useLocation, useNavigate, } from 'react-router-dom';
import { Button, Tabs, Tab,Nav,Table ,Modal,Card,Row,Col,Form,Accordion,AccordionButton,AccordionContext,useAccordionButton} from 'react-bootstrap';
import {
  FaUserTie, FaUserFriends, FaUsers,FaFileAlt, FaEnvelope, FaFileInvoice, FaClipboardList,
  FaMoneyBillWave, FaStickyNote, FaCartPlus,FaEdit,FaTrash
} from 'react-icons/fa';
import { BsChevronRight, BsChevronDown } from "react-icons/bs";
import React,{useState,useEffect,useContext} from 'react';
function CustomAccordionToggle({ children, eventKey, icon }) {
  const { activeEventKey } = useContext(AccordionContext);
  const decoratedOnClick = useAccordionButton(eventKey);

  // Check if eventKey is currently active (for alwaysOpen mode)
  const isOpen = Array.isArray(activeEventKey)
    ? activeEventKey.includes(eventKey)
    : activeEventKey === eventKey;

  return (
    <div
      onClick={decoratedOnClick}
      className="d-flex justify-content-between align-items-center p-3 mb-2"
      style={{
        backgroundColor: "#f8f9fc",
        borderRadius: "12px",
        cursor: "pointer",
        fontWeight: 500,
        transition: "background 0.2s",
      }}
    >
      <div className="d-flex align-items-center text-dark">
        <span className="me-2 text-primary">{icon}</span>
        {children}
      </div>

      {/* Show ↓ when open, → when closed */}
      {isOpen ? (
        <BsChevronDown className="accordion-chevron" />
      ) : (
        <BsChevronRight className="accordion-chevron" />
      )}
    </div>
  );
}
export default function Vendordetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
    const [loginEnabled, setLoginEnabled] = useState(true);
    const [organization, setOrganization] = useState("Bangalore Branch");
    const [username, setUsername] = useState("arun.k");
    const [password, setPassword] = useState("password123");
    const [addresses, setAddresses] = useState([]);
       const [showForm, setShowForm] = useState(false);
       const [newAddress, setNewAddress] = useState({
         address: '',
         city: '',
         state: '',
         pincode: ''
       });
     
     // const [loginEnabled, setLoginEnabled] = useState(false);
     //   const [organization, setOrganization] = useState("");
      const [contacts, setContacts] = useState([]); // start empty
     const handleSaveVendor=()=>{
            
            }
       const handleSaveAddress = () => {
         setAddresses([...addresses, newAddress]);
         setNewAddress({
           address: '',
           city: '',
           state: '',
           pincode: ''
         });
         setShowForm(false);
       };
     
       const [contactPersons, setContactPersons] = useState([]);
        
  const addContact = () => {
     setContacts([...contacts, { name: "", designation: "", email: "", phone: "" }]);
   };
 
   const removeContact = (index) => {
     const newContacts = contacts.filter((_, i) => i !== index);
     setContacts(newContacts);
   };
 
   const handleContactChanges = (index, field, value) => {
     const updated = [...contacts];
     updated[index][field] = value;
     setContacts(updated);
   };
 const handleContactChange = (index, field, value) => {
   const updated = [...contactPersons];
   updated[index][field] = value;
   setContactPersons(updated);
 };
 
  const vendor = location.state?.vendor;
  const path = location.pathname;
  if (!vendor) return <p className="text-danger">Vendor not found.</p>;

  // Determine initial tab based on optional query param (optional)
  const query = new URLSearchParams(location.search);
  const initialTab = query.get('tab') || 'staff';

  const [key, setKey] = useState(initialTab);

  const handleTabChange = (newKey) => {
  setKey(newKey);

  if (newKey === 'customers') {
    navigate('/customer');
  }
  if (newKey === 'vendors') {
    navigate('/vendor');
  }
  if (newKey === 'staff') {
    navigate('/admin/people');
  }
};

const [showEditModal, setShowEditModal] = useState(false);

  return (
    <div className="p-3">
      {/* Top nav */}
     

      {/* Back */}
     <Card className="mb-4 shadow-sm border-0">
  <Card.Body className="p-4">

    {/* Back Button */}
    <Button variant="link" onClick={() => navigate(-1)} className="p-0 text-primary mb-3">
      ← Back to Vendors
    </Button>

    {/* Header Section */}
    <div className="d-flex justify-content-between align-items-start">
      <div className="d-flex align-items-center gap-3">
        {/* Light Blue Circle */}
        <div
          className="rounded-circle text-dark d-flex align-items-center justify-content-center shadow"
          style={{
            width: 80,
            height: 80,
            fontSize: '2rem',
            backgroundColor: '#e0f0ff' // Light blue
          }}
        >
          {vendor.name.charAt(0)}
        </div>

        {/* Vendor Name and Type */}
        <div>
          <h3 className="fw-bold mb-0">{vendor.name}</h3>
          <div className="text-muted">{vendor.type} Vendor</div>
        </div>
      </div>

      {/* Edit & Delete Buttons */}
      <div className="d-flex gap-2">
        <Button
          variant="outline-primary"
          className="d-flex align-items-center"
          onClick={() => setShowEditModal(true)}
        >
          <FaEdit className="me-1" /> Edit
        </Button>
        <Button variant="outline-danger" className="d-flex align-items-center">
          <FaTrash className="me-1" /> Delete
        </Button>
      </div>
    </div>

  </Card.Body>
</Card>
<br/>

      {/* Quick Actions */}
     <Card className="mb-4 shadow-sm border-0">
  <Card.Body className="bg-light rounded">
    <div className="fw-semibold mb-2 text-muted">Quick Actions</div>
    <div className="d-flex flex-wrap gap-3">
      <Button variant="light" className="border d-flex align-items-center">
        <FaFileInvoice className="me-2" /> New Bill
      </Button>
      <Button variant="light" className="border d-flex align-items-center">
        <FaCartPlus className="me-2" /> New PO
      </Button>
      <Button variant="light" className="border d-flex align-items-center">
        <FaMoneyBillWave className="me-2" /> Log Payment
      </Button>
      <Button variant="light" className="border d-flex align-items-center">
        <FaStickyNote className="me-2" /> Add Note
      </Button>
    </div>
  </Card.Body>
</Card>



      {/* Tabs (example only Overview) */}
      <div className="bg-white p-3 rounded shadow-sm">
       <Tabs defaultActiveKey="overview" className="mb-3">
  <Tab
    eventKey="overview"
    title={
      <span className="d-inline-flex align-items-center">
        <FaUserTie className="me-1" /> Overview
      </span>
    }
  >
    <h5 className="fw-semibold">Vendor Information</h5>
    <div className="row mt-3">
      <div className="col-md-4"><strong>Organization:</strong><br />{vendor.branch}</div>
      <div className="col-md-4"><strong>Vendor Name:</strong><br />Mr. {vendor.name}</div>
      <div className="col-md-4"><strong>Phone:</strong><br />{vendor.contact}</div>
    </div>
    <div className="row mt-3">
      <div className="col-md-4"><strong>Email:</strong><br />{vendor.email}</div>
      <div className="col-md-4"><strong>Type:</strong><br />{vendor.type}</div>
      <div className="col-md-4"><strong>Created:</strong><br />{vendor.createdDate}</div>
    </div>
  </Tab>

 <Tab
  eventKey="contacts"
  title={
    <span className="d-inline-flex align-items-center">
      <FaEnvelope className="me-1" /> Contacts
    </span>
  }
>
  <h6 className="fw-semibold mb-3">All Contacts</h6>
  <hr/>
  <Table responsive bordered hover size="sm" className="table-light">
    <thead className="table-secondary">
      <tr>
        <th>Name</th>
        <th>Designation</th>
        <th>Work Email</th>
        <th>Work Phone</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Vikram Singh</td>
        <td>Owner</td>
        <td>vikram@avpro.com</td>
        <td>7654321098</td>
      </tr>
      {/* You can map through an array here if more contacts exist */}
    </tbody>
  </Table>
</Tab>


 <Tab
  eventKey="purchase-orders"
  title={
    <span className="d-inline-flex align-items-center">
      <FaFileAlt className="me-1" /> Purchase Orders
    </span>
  }
>
  <h6 className="fw-semibold mb-3">Purchase Orders</h6>

  <Table responsive bordered hover size="sm" className="table-light">
    <thead className="table-secondary">
      <tr>
        <th>PO ID</th>
        <th>Date</th>
        <th>Amount</th>
        <th>Status</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>PO-001</td>
        <td>2025-02-20</td>
        <td>₹50,000</td>
        <td>Fulfilled</td>
      </tr>
      <tr>
        <td>PO-003</td>
        <td>2025-06-25</td>
        <td>₹70,000</td>
        <td>Ordered</td>
      </tr>
    </tbody>
  </Table>
</Tab>


 <Tab
  eventKey="bills"
  title={
    <span className="d-inline-flex align-items-center">
      <FaFileInvoice className="me-1" /> Bills
    </span>
  }
>
  <h6 className="fw-semibold mb-3">Vendor Bills</h6>

  <Table responsive bordered hover size="sm" className="table-light">
    <thead className="table-secondary">
      <tr>
        <th>Bill ID</th>
        <th>PO ID</th>
        <th>Date</th>
        <th>Amount</th>
        <th>Status</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>BILL-001</td>
        <td>PO-001</td>
        <td>2025-03-01</td>
        <td>₹50,000</td>
        <td style={{ color: 'green', fontWeight: 500 }}>Paid</td>
      </tr>
      <tr>
        <td>BILL-003</td>
        <td>PO-003</td>
        <td>2025-07-01</td>
        <td>₹70,000</td>
        <td style={{ color: 'orange', fontWeight: 500 }}>Due</td>
      </tr>
    </tbody>
  </Table>
</Tab>

  <Tab
    eventKey="payments"
    title={
      <span className="d-inline-flex align-items-center">
        <FaMoneyBillWave className="me-1" /> Payments
      </span>
    }
  >
    <p>Payment records.</p>
  </Tab>

  <Tab
    eventKey="notes"
    title={
      <span className="d-inline-flex align-items-center">
        <FaStickyNote className="me-1" /> Notes
      </span>
    }
  >
    <p>Notes related to this vendor.</p>
  </Tab>
</Tabs>
<Modal
  show={showEditModal}
  onHide={() => setShowEditModal(false)}
  size="lg"
  centered scrollable
>
  <Modal.Header closeButton>
    <Modal.Title className="fw-bold">Edit Vendor</Modal.Title>
  </Modal.Header>
  <hr/>
<Card
  className="mb-4 p-3 shadow-sm border rounded bg-light"
  style={{ maxWidth: '720px',marginLeft:"40px" }} // Optional: center with margin: '0 auto'
>
  {/* First Row: Login toggle and Organization */}
  <Row className="mb-3">
    {/* Login Toggle */}
    <Col md={6} className="d-flex align-items-center">
      <Form.Label className="fw-semibold mb-0 me-3">
        Login is enabled
      </Form.Label>
      <Form.Check
        type="switch"
        id="login-switch"
        checked={loginEnabled}
        onChange={(e) => setLoginEnabled(e.target.checked)}
      />
    </Col>

    {/* Organization Dropdown */}
    <Col md={6}>
      <Form.Label className="fw-semibold">
        Organization <span className="text-danger">*</span>
      </Form.Label>
      <Form.Select
        value={organization}
        onChange={(e) => setOrganization(e.target.value)}
      >
        <option value="">Select Organization</option>
        <option value="Bangalore Branch">Bangalore Branch</option>
        <option value="Kochi Branch">Kochi Branch</option>
        <option value="Calicut Branch">Calicut Branch</option>
      </Form.Select>
    </Col>
  </Row>

  {/* Second Row: Username and Password */}
  <Row>
    <Col md={6}>
      <Form.Group className="mb-3">
        <Form.Label className="fw-semibold">
          Username <span className="text-danger">*</span>
        </Form.Label>
        <Form.Control
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter username"
        />
      </Form.Group>
    </Col>

    <Col md={6}>
      <Form.Group className="mb-3">
        <Form.Label className="fw-semibold">
          Password <span className="text-danger">*</span>
        </Form.Label>
        <Form.Control
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter password"
        />
      </Form.Group>
    </Col>
  </Row>
</Card>
 <Modal.Body>
<Accordion defaultActiveKey="0" alwaysOpen>
          {/* Vendor Details */}
          <Accordion.Item eventKey="0">
            <CustomAccordionToggle eventKey="0">Vendor Details</CustomAccordionToggle>
            <Accordion.Body>
              <Row className="mb-3">
                <Col md={3}>
                  <Form.Group controlId="salutation">
                    <Form.Label>Salutation<span className="text-danger">*</span></Form.Label>
                    <Form.Select>
                      <option>Mr.</option>
                      <option>Ms.</option>
                      <option>Mrs.</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={3}>
                  <Form.Group controlId="vendorName">
                    <Form.Label>Name<span className="text-danger">*</span></Form.Label>
                    <Form.Control type="text" />
                  </Form.Group>
                </Col>
                <Col md={3}>
                  <Form.Group controlId="vendorPhone">
                    <Form.Label>Phone<span className="text-danger">*</span></Form.Label>
                    <Form.Control type="text" />
                  </Form.Group>
                </Col>
                <Col md={3}>
                  <Form.Group controlId="vendorEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" />
                  </Form.Group>
                </Col>
              </Row>

              <Row className="mb-3">
                <Col md={4}>
                  <Form.Group controlId="gstNo">
                    <Form.Label>GST No.</Form.Label>
                    <Form.Control type="text" />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group controlId="vendorType">
                    <Form.Label>Type<span className="text-danger">*</span></Form.Label>
                    <Form.Select>
                      <option>Material</option>
                      <option>Service</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group controlId="vendorAddress">
                    <Form.Label>Address</Form.Label>
                    <Form.Control as="textarea" rows={1} />
                  </Form.Group>
                </Col>
              </Row>
            </Accordion.Body>
          </Accordion.Item>

          {/* Contact Persons */}
          <Accordion.Item eventKey="1">
            <CustomAccordionToggle eventKey="1">Contact Persons</CustomAccordionToggle>
            <Accordion.Body>
              {contacts.length === 0 && (
                <div className="text-end mb-3">
                  <Button variant="primary" size="sm" onClick={addContact}>
                    + Add Contact Person
                  </Button>
                </div>
              )}

              {contacts.map((contact, index) => (
                <div key={index} className="mb-3 border rounded p-3 bg-white">
                  <Row className="mb-2">
                    <Col md={6}>
                      <Form.Group controlId={`contact-name-${index}`}>
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                          type="text"
                          value={contact.name}
                          onChange={(e) => handleContactChanges(index, "name", e.target.value)}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group controlId={`contact-designation-${index}`}>
                        <Form.Label>Designation</Form.Label>
                        <Form.Control
                          type="text"
                          value={contact.designation}
                          onChange={(e) => handleContactChanges(index, "designation", e.target.value)}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={6}>
                      <Form.Group controlId={`contact-email-${index}`}>
                        <Form.Label>Work Email</Form.Label>
                        <Form.Control
                          type="email"
                          value={contact.email}
                          onChange={(e) => handleContactChanges(index, "email", e.target.value)}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group controlId={`contact-phone-${index}`}>
                        <Form.Label>Work Phone</Form.Label>
                        <Form.Control
                          type="text"
                          value={contact.phone}
                          onChange={(e) => handleContactChanges(index, "phone", e.target.value)}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <div className="text-end mt-3">
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => removeContact(index)}
                      title="Delete Contact"
                    >
                      <FaTrash />
                    </Button>
                  </div>
                </div>
              ))}

              {contacts.length > 0 && (
                <div className="text-start">
                  <Button variant="primary" size="sm" onClick={addContact}>
                    + Add Contact Person
                  </Button>
                </div>
              )}
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
        </Modal.Body>
       <Modal.Footer>
               <Button variant="secondary" onClick={() => setShowEditModal(false)}>
                 Cancel
               </Button>
               <Button variant="primary" onClick={handleSaveVendor}>
                 Edit Vendor
               </Button>
             </Modal.Footer>
           
  </Modal>
      </div>
    </div>
  );
}
