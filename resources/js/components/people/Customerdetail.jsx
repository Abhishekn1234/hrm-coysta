import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import {
  Container,
  Row,
  Col,
  Button,
  Modal,
  Tabs,
  Tab,
  Accordion,
  AccordionContext,
  useAccordionButton,
  Card,
  Form
} from 'react-bootstrap';
import {
  FaUser,
  FaUsers,
  FaUserTie,
  FaUserFriends,
  FaEnvelope,
  FaFileInvoice,
  FaProjectDiagram,
  FaMoneyBillWave,
  FaClipboardList,
  FaBriefcase,
  FaPlus,
  FaPhone,
  FaDollarSign,
  FaCertificate,
  FaFileAlt,
  FaBuilding
} from 'react-icons/fa';
import { BsChevronRight, BsChevronDown } from "react-icons/bs";

// Custom components
import StaffDetails from './StaffDetails';
import ContactForm from './ContactForm';
import FinancialHR from './FinancialHr';
import Skills from './Skills';
import Dashboard from './Dashboard';
import StaffTable from './StaffTable';
import CustomerProfileForm from './CustomerProfileForm';

// Styles
import './styles.css';
import './page.css';
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
export default function Customerdetail() {
     const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [customer, setCustomer] = useState(location.state?.customer || null);
  const [activeKey, setActiveKey] = useState('profile');
  const [contactPersons, setContactPersons] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [gstDetails, setGstDetails] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newAddress, setNewAddress] = useState({ address: '', city: '', state: '', pincode: '' });
  const [showEditModal, setShowEditModal] = useState(false);

  const quickActions = [
    { label: 'New Project', icon: <FaPlus /> },
    { label: 'New Invoice', icon: <FaFileInvoice /> },
    { label: 'New Estimate', icon: <FaClipboardList /> },
    { label: 'Log Payment', icon: <FaMoneyBillWave /> },
    { label: 'Send Mail', icon: <FaEnvelope /> }
  ];

  useEffect(() => {
    if (!customer && id) {
      axios.get(`http://127.0.0.1:8000/api/customers/${id}`)
        .then(res => setCustomer(res.data))
        .catch(err => console.error('Failed to fetch customer:', err));
    }
  }, [id]);

  const handleAddContact = () => {
    setContactPersons([...contactPersons, {
      name: '', designation: '', workEmail: '', workPhone: '', personalEmail: '', personalPhone: ''
    }]);
  };

  const handleAddGst = () => {
    setGstDetails([...gstDetails, { gstNo: '', placeOfSupply: '' }]);
  };

  const handleRemoveGst = (index) => {
    const updated = [...gstDetails];
    updated.splice(index, 1);
    setGstDetails(updated);
  };

  const handleInputChange = (field, value) => {
    setNewAddress(prev => ({ ...prev, [field]: value }));
  };

  const handleGstChange = (index, field, value) => {
    const updated = [...gstDetails];
    updated[index][field] = value;
    setGstDetails(updated);
  };

  if (!customer) return <p className="text-danger">Customer not found.</p>;
  
  return (
    <div className="bg-light min-vh-100">
      {/* Top Tabs styled like nav pills */}
    

      <Container className="py-4">
        {/* Back Button */}
        <div className="mb-3">
        <Button variant="link" onClick={() => navigate(-1)} className="p-0 text-primary">
            ← Back to Customers
            </Button>

        </div>

        {/* Header Section */}
        <div className="d-flex justify-content-between align-items-start mb-4">
          <div className="d-flex align-items-center gap-3">
            <div
              className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center shadow"
              style={{ width: 80, height: 80, fontSize: '2rem' }}
            >
              {customer.company.charAt(0)}
            </div>
            <div>
              <h3 className="fw-bold mb-1">{customer.company}</h3>
              <div className="text-muted">{customer.branch}</div>
              <div className="small text-muted">Last login: {customer.lastLogin}</div>
            </div>
          </div>
          <div className="d-flex gap-2">
            <Button variant="outline-primary" onClick={() => setShowEditModal(true)}>
          <i className="bi bi-pencil-square"></i> Edit
        </Button>
            <Button variant="outline-danger">
              <i className="bi bi-trash"></i> Delete
            </Button>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white p-3 rounded shadow-sm mb-4">
  <h6 className="text-muted mb-3">Quick Actions</h6>
  <div className="d-flex flex-wrap gap-3">
    {quickActions.map((action, idx) => (
      <Button key={idx} variant="light" className="border text-nowrap d-flex align-items-center gap-2">
        {action.icon} {action.label}
      </Button>
    ))}
  </div>
</div>


        {/* Detail Tabs */}
        <div className="bg-white p-3 rounded shadow-sm">
          <Tabs activeKey={tab} onSelect={(k) => setTab(k)} className="mb-3">
          <Tab
            eventKey="profile"
            title={
                <div className="d-inline-flex align-items-center">
                <FaUser className="me-2" />
                <span>Profile</span>
                </div>
            }
            >

  {/* Company & Contact Info */}
  <div className="mb-4">
    <h5 className="mb-3">Company & Contact Information</h5>
   <hr/>
    <div className="row mb-2">
      <div className="col-md-4">
        <strong>Organization:</strong>
        <div>Bangalore Branch</div>
      </div>
      <div className="col-md-4">
        <strong>Customer Type:</strong>
        <div>Business</div>
      </div>
      <div className="col-md-4">
        <strong>Company Name:</strong>
        <div>Global Event Planners</div>
      </div>
    </div>

    <div className="row mb-2">
      <div className="col-md-4">
        <strong>Display Name:</strong>
        <div>Global Events</div>
      </div>
      <div className="col-md-4">
        <strong>Owner Name:</strong>
        <div>Rohan Sharma</div>
      </div>
      <div className="col-md-4">
        <strong>PAN No.:</strong>
        <div>ABCDE1234F</div>
      </div>
    </div> 
    <hr/>

    <div className="mt-3">
      <h5>Registered Address:</h5>
      <hr/>
      <div>1 Corporate Towers, MG Road, Bangalore, 560001</div>
    </div>
  </div>
  <hr/>
  {/* GST Details Table */}
  <div className="mb-4">
    <h5>GST Details</h5>
    <hr/>
    <div className="table-responsive">
      <table className="table table-hover table-bordered align-middle">
        <thead className="table-light">
          <tr>
            <th>GST Number</th>
            <th>Place of Supply</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>29ABCDE1234F1Z5</td>
            <td>Karnataka</td>
          </tr>
          <tr>
            <td>27FGHIJ5678K1Z9</td>
            <td>Maharashtra</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
<hr/>
  {/* Shipping Address Table */}
  <div>
    <h5>Shipping Addresses</h5>
    <hr/>
    <div className="table-responsive">
      <table className="table table-hover table-bordered align-middle">
        <thead className="table-light">
          <tr>
            <th>Address</th>
            <th>City</th>
            <th>State</th>
            <th>Pincode</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Unit 10, Tech Park, Whitefield</td>
            <td>Bangalore</td>
            <td>Karnataka</td>
            <td>560066</td>
          </tr>
          <tr>
            <td>5th Floor, Trade Center, BKC</td>
            <td>Mumbai</td>
            <td>Maharashtra</td>
            <td>400051</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</Tab>


          <Tab
  eventKey="contacts"
  title={
    <div className="d-inline-flex align-items-center">
      <FaEnvelope className="me-2" />
      <span>Contacts</span>
    </div>
  }
>
  <div className="pt-3 px-2">
    <h6 className="fw-semibold mb-2">All Contacts</h6>
    <hr className="my-2" />
    <p className="text-muted mb-0">No additional contacts found.</p>
  </div>
</Tab>


           <Tab
  eventKey="projects"
  title={
    <div className="d-inline-flex align-items-center">
      <FaProjectDiagram className="me-2" />
      <span>Projects</span>
    </div>
  }
>
  <div className="pt-3 px-2">
    <h6 className="fw-semibold mb-3">Projects</h6>
    <div className="table-responsive">
      <table className="table table-hover table-bordered align-middle">
        <thead className="table-light">
          <tr>
            <th>Project Name</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Value</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Anjali & Rohan Wedding</td>
            <td>2025-06-10</td>
            <td>2025-06-12</td>
            <td>₹1,20,000</td>
            <td>
              <span className="badge bg-success">Completed</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</Tab>


          <Tab
  eventKey="invoices"
  title={
    <span className="d-inline-flex align-items-center">
      <FaFileInvoice className="me-2" />
      Invoices
    </span>
  }
>
  <div className="pt-3 px-2">
    <h6 className="fw-semibold mb-3">Invoices</h6>
    <div className="table-responsive">
      <table className="table table-hover table-bordered align-middle">
        <thead className="table-light">
          <tr>
            <th>Invoice ID</th>
            <th>Issue Date</th>
            <th>Due Date</th>
            <th>Amount</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>INV-002</td>
            <td>2025-06-15</td>
            <td>2025-07-15</td>
            <td>₹1,20,000</td>
            <td>
              <span className="badge bg-success">Paid</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</Tab>


           <Tab
  eventKey="estimates"
  title={
    <span className="d-inline-flex align-items-center">
      <FaClipboardList className="me-2" />
      Estimates
    </span>
  }
>
  <div className="pt-3 px-2">
    <h6 className="fw-semibold mb-3">Estimates</h6>
    <div className="table-responsive">
      <table className="table table-hover table-bordered align-middle">
        <thead className="table-light">
          <tr>
            <th>Estimate ID</th>
            <th>Date</th>
            <th>Amount</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>EST-010</td>
            <td>2025-06-05</td>
            <td>₹1,20,000</td>
            <td><span className="badge bg-warning text-dark">Pending</span></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</Tab>


            <Tab eventKey="payments" title={<span> <div className="d-inline-flex align-items-center"><FaMoneyBillWave className="me-1" />Payments</div></span>}>
              <p>Payment history for this customer.</p>
            </Tab>

            <Tab eventKey="mails" title={<span> <div className="d-inline-flex align-items-center"><FaEnvelope className="me-1" />Mails</div></span>}>
              <p>Emails sent to this customer.</p>
            </Tab>
          </Tabs>
        </div>
       
       <Modal show={showEditModal} onHide={() => setShowEditModal(false)} size="lg" centered scrollable>
    <Modal.Header closeButton>
          <Modal.Title className="fw-bold">Edit Customer</Modal.Title>
        </Modal.Header>
        <hr/>
       {/* Login Toggle */}
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
              <Accordion activeKey={activeKey} onSelect={(k) => setActiveKey(k)}>
          {/* Primary Details */}
          <Card className="mb-3">
            <CustomAccordionToggle eventKey="0">Primary Details</CustomAccordionToggle>
            <Accordion.Collapse eventKey="0">
              <Card.Body>
               <CustomerProfileForm/>
              </Card.Body>
            </Accordion.Collapse>
          </Card>

          {/* GST Details */}
       <Card className="mb-3">
  <CustomAccordionToggle eventKey="1">GST Details</CustomAccordionToggle>
  <Accordion.Collapse eventKey="1">
    <Card.Body>
      <Form>
        {gstDetails.map((gst, index) => (
          <div key={index} className="mb-3 p-3 border rounded">
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>GST No.</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter GST number"
                    value={gst.gstNo}
                    onChange={(e) => handleInputChange(index, 'gstNo', e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Place of Supply</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter place of supply"
                    value={gst.placeOfSupply}
                    onChange={(e) => handleInputChange(index, 'placeOfSupply', e.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Button
              variant="outline-danger"
              size="sm"
              onClick={() => handleRemoveGst(index)}
              className="mt-2"
            >
              Delete
            </Button>
          </div>
        ))}

        <Button
          variant="outline-primary"
          onClick={handleAddGst}
          className="mt-2"
        >
          + Add GST Number
        </Button>
      </Form>
    </Card.Body>
  </Accordion.Collapse>
</Card>


          {/* Shipping Addresses */}
         <Card className="mb-3">
  <CustomAccordionToggle eventKey="2">Shipping Addresses</CustomAccordionToggle>
  <Accordion.Collapse eventKey="2">
    <Card.Body>
      {/* Existing addresses */}
      {addresses.map((address, index) => (
        <div key={index} className="mb-3 p-3 border rounded">
          <Row className="align-items-center mb-2">
            <Col md={12}>
              <div className="fw-semibold">Address:</div>
              <div>{address.address}</div>
            </Col>
          </Row>
          <Row className="align-items-center">
            <Col md={3}>
              <div className="fw-semibold">City:</div>
              <div>{address.city}</div>
            </Col>
            <Col md={3}>
              <div className="fw-semibold">State:</div>
              <div>{address.state}</div>
            </Col>
            <Col md={3}>
              <div className="fw-semibold">Pincode:</div>
              <div>{address.pincode}</div>
            </Col>
            <Col md={3}>
              <Button
                variant="link"
                className="text-danger"
                onClick={() => handleRemoveAddress(index)}
              >
                <FaTrash />
              </Button>
            </Col>
          </Row>
        </div>
      ))}

      {/* Add new address form */}
      {showForm ? (
        <div className="mb-3 p-3 border rounded">
          <Row className="mb-2">
            <Col md={12}>
              <Form.Group>
                <Form.Label>Address</Form.Label>
                <Form.Control
                  type="text"
                  value={newAddress.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                />
              </Form.Group>
            </Col>
          </Row>
                    <Row className="align-items-end">
            <Col style={{ width: '25%' }}>
                <Form.Group>
                <Form.Label>City</Form.Label>
                <Form.Control
                    type="text"
                    value={newAddress.city}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                />
                </Form.Group>
            </Col>
            <Col style={{ width: '25%' }}>
                <Form.Group>
                <Form.Label>State</Form.Label>
                <Form.Control
                    type="text"
                    value={newAddress.state}
                    onChange={(e) => handleInputChange('state', e.target.value)}
                />
                </Form.Group>
            </Col>
            <Col style={{ width: '25%' }}>
                <Form.Group>
                <Form.Label>Pincode</Form.Label>
                <Form.Control
                    type="text"
                    value={newAddress.pincode}
                    onChange={(e) => handleInputChange('pincode', e.target.value)}
                />
                </Form.Group>
            </Col>
            <Col style={{ width: '15%' }}>
                <Button
                variant="link"
                className="text-danger mt-4"
                onClick={() => setShowForm(false)}
                >
                <FaTrash />
                </Button>
            </Col>
            </Row>

        </div>
      ) : (
        <Button
          variant="outline-primary"
          onClick={handleAddClicks}
          className="mt-2"
        >
          + Add Shipping Address
        </Button>
      )}
    </Card.Body>
  </Accordion.Collapse>
</Card>


          {/* Contact Persons */}
         <Card className="mb-3">
  <CustomAccordionToggle eventKey="3">Contact Persons</CustomAccordionToggle>
  <Accordion.Collapse eventKey="3">
    <Card.Body>
      <Form>
        {contactPersons.map((person, index) => (
          <div key={index} className="mb-4 p-3 border rounded">
            {/* Row 1: Name & Designation */}
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Contact Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={person.name}
                    onChange={(e) => handleContactChange(index, 'name', e.target.value)}
                    placeholder="Enter contact name"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Designation</Form.Label>
                  <Form.Control
                    type="text"
                    value={person.designation}
                    onChange={(e) => handleContactChange(index, 'designation', e.target.value)}
                    placeholder="Enter designation"
                  />
                </Form.Group>
              </Col>
            </Row>

            {/* Row 2: Work Email & Work Phone */}
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Work Email</Form.Label>
                  <Form.Control
                    type="email"
                    value={person.workEmail}
                    onChange={(e) => handleContactChange(index, 'workEmail', e.target.value)}
                    placeholder="Enter work email"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Work Phone</Form.Label>
                  <Form.Control
                    type="text"
                    value={person.workPhone}
                    onChange={(e) => handleContactChange(index, 'workPhone', e.target.value)}
                    placeholder="Enter work phone"
                  />
                </Form.Group>
              </Col>
            </Row>

            {/* Row 3: Personal Email & Personal Phone */}
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Personal Email</Form.Label>
                  <Form.Control
                    type="email"
                    value={person.personalEmail}
                    onChange={(e) => handleContactChange(index, 'personalEmail', e.target.value)}
                    placeholder="Enter personal email"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Personal Phone</Form.Label>
                  <Form.Control
                    type="text"
                    value={person.personalPhone}
                    onChange={(e) => handleContactChange(index, 'personalPhone', e.target.value)}
                    placeholder="Enter personal phone"
                  />
                </Form.Group>
              </Col>
            </Row>

            {/* Row 4: Delete Icon */}
            <Row>
              <Col className="text-end">
                <Button
                  variant="link"
                  className="text-danger"
                  onClick={() => handleRemoveContact(index)}
                >
                  <FaTrash />
                </Button>
              </Col>
            </Row>
          </div>
        ))}

        {/* Add Button */}
        <Button variant="outline-primary" onClick={handleAddContact}>
          + Add Contact Person
        </Button>
      </Form>
    </Card.Body>
  </Accordion.Collapse>
</Card>

        </Accordion>
      </Modal.Body>

      <Modal.Footer style={{backgroundColor:"#f8f9fa"}}>
        <Button variant="secondary" onClick={() => setShowCustomerModal(false)}>
          Cancel
        </Button>
        <Button variant="primary">
          Edit Customer
        </Button>
      </Modal.Footer>
  
   </Modal>
      </Container>
    </div>
  );
}
