import React, { useState,useContext } from 'react';
import { Container, Row, Col, Button, Modal,Tabs,Tab,AccordionContext, Form, Accordion,useAccordionButton,Card } from 'react-bootstrap';
import { FaUsers, FaUserFriends, FaUserTie, FaUser, FaPhone, FaDollarSign, FaCertificate, FaFileAlt, FaBuilding} from 'react-icons/fa';
import { BsChevronRight, BsChevronDown } from "react-icons/bs";
import { FaTrash } from 'react-icons/fa';
import StaffDetails from './StaffDetails';
import ContactForm from './ContactForm';
import FinancialHR from './FinancialHr';
import Skills from './Skills';
import './styles.css';
import './page.css';
import Dashboard from './Dashboard';
import StaffTable from './StaffTable';
import CustomerProfileForm from './CustomerProfileForm';
import CustomerCards from './CustomerCards';
import CustomerTable from './CustomerTable';
import VendorCards from './VendorCards';
import VendorTable from './VendorTable';
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
function PeoplePage() {
  const [key, setKey] = useState('staff');
  const [showModal, setShowModal] = useState(false);
  const [loginEnabled, setLoginEnabled] = useState(false);
  const [organization, setOrganization] = useState('');
        const [showStaffModal, setShowStaffModal] = useState(false);
        const [showCustomerModal, setShowCustomerModal] = useState(false);
        const [showVendorModal, setShowVendorModal] = useState(false);
    const [activeKey, setActiveKey] = useState('0');
  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);
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

const handleAddContact = () => {
  setContactPersons([
    ...contactPersons,
    {
      name: '',
      designation: '',
      workEmail: '',
      workPhone: '',
      personalEmail: '',
      personalPhone: '',
    },
  ]);
};
const handleSaveVendor=()=>{

}
const handleRemoveContact = (index) => {
  const updated = [...contactPersons];
  updated.splice(index, 1);
  setContactPersons(updated);
};
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


  const handleRemoveAddress = (index) => {
    const updatedAddresses = addresses.filter((_, i) => i !== index);
    setAddresses(updatedAddresses);
  };
    const handleAddClicks = () => {
    setShowForm(true);
  };
 const handleAddClick = () => {
  if (key === "staff") setShowStaffModal(true);
  else if (key === "customers") setShowCustomerModal(true);
  else if (key === "vendors") setShowVendorModal(true);
};
 const [gstDetails, setGstDetails] = useState([]);

const handleAddGst = () => {
  setGstDetails([...gstDetails, { gstNo: '', placeOfSupply: '' }]);
};

const handleRemoveGst = (index) => {
  const newGstDetails = [...gstDetails];
  newGstDetails.splice(index, 1);
  setGstDetails(newGstDetails);
};

const handleInputChange = (index, field, value) => {
  const newGstDetails = [...gstDetails];
  newGstDetails[index][field] = value;
  setGstDetails(newGstDetails);
  setNewAddress({
      ...newAddress,
      [field]: value
    });
};

  return (
    <Container
      fluid
      style={{
        padding: '2rem',
        backgroundColor: '#f8f9fa',
        minHeight: '100vh',
      }}
    >
      {/* Header */}
      <Row className="align-items-center mb-4">
        <Col>
          <h2 style={{ fontWeight: '700', marginBottom: '0.3rem' }}>People</h2>
          <p style={{ color: '#6c757d', marginBottom: 0 }}>
            Manage all your staff, customers, and vendors in one place.
          </p>
        </Col>
            <Col className="text-end">
                                    <Button
                    style={{
                        backgroundColor: '#5c6ac4',
                        border: 'none',
                        padding: '0.5rem 1.2rem',
                        borderRadius: '10px',
                        fontWeight: '600',
                        fontSize: '15px',
                        boxShadow: '0 3px 6px rgba(0,0,0,0.1)',
                    }}
                    onClick={handleAddClick}
                    >
                    <i className="bi bi-plus-lg me-2"></i>
                    {key === 'staff'
                        ? 'Add New Staff'
                        : key === 'customers'
                        ? 'Add New Customer'
                        : key === 'vendors'
                        ? 'Add New Vendor'
                        : 'Add New'}
                    </Button>


                    </Col>
      </Row>

      {/* Tabs */}
      <div
  style={{
    background: "#fff",
    borderRadius: "12px",
    padding: "1rem",
    
    
  }}
>
  <Tabs
    id="people-tabs"
    activeKey={key}
    onSelect={(k) => setKey(k)}
    className="mb-3 custom-tabs"
    justify
  >
    <Tab
      eventKey="staff"
      title={
        <span className="tab-label">
          <FaUsers className="tab-icon" /> Staff
        </span>
      }
    >
       <Dashboard/>
       <StaffTable/>
    </Tab>

    <Tab
      eventKey="customers"
      title={
        <span className="tab-label">
          <FaUserFriends className="tab-icon" /> Customers
        </span>
      }
    >
      {/* Customers Tab Content */}
      <CustomerCards/>
      <CustomerTable/>
    </Tab>

    <Tab
      eventKey="vendors"
      title={
        <span className="tab-label">
          <FaUserTie className="tab-icon" /> Vendors
        </span>
      }
    >
      {/* Vendors Tab Content */}
      <VendorCards/>
      <VendorTable/>
    </Tab>
  </Tabs>
</div>
     


   {/* Staff Modal */}
      <Modal show={showStaffModal} onHide={() => setShowStaffModal(false)} size="lg" centered scrollable>
        <Modal.Header closeButton>
          <Modal.Title className="fw-bold">Add New Staff</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Login toggle and organization */}
          <div className="d-flex justify-content-between align-items-center mb-4 bg-light rounded p-3">
            <div>
              <span className="fw-semibold">Login is enable</span>
              <Form.Check
                type="switch"
                id="login-switch"
                checked={loginEnabled}
                onChange={(e) => setLoginEnabled(e.target.checked)}
                className="ms-3 d-inline-block"
              />
            </div>
            <div style={{ width: '50%' }}>
              <Form.Label className="fw-semibold">Organization <span className="text-danger">*</span></Form.Label>
              <Form.Select
                value={organization}
                onChange={(e) => setOrganization(e.target.value)}
              >
                <option value="">Select Organization</option>
                <option value="org1">Organization 1</option>
                <option value="org2">Organization 2</option>
              </Form.Select>
            </div>
          </div>

          {/* Accordion Sections */}
                <Accordion alwaysOpen>
            <Accordion.Item eventKey="0">
        <CustomAccordionToggle eventKey="0" icon={<FaUser />}>Staff Details</CustomAccordionToggle>
        <Accordion.Body className="pb-4 ps-4 pe-4">
            <StaffDetails />
        </Accordion.Body>
        </Accordion.Item>


            <Accordion.Item eventKey="1">
        <CustomAccordionToggle eventKey="1" icon={<FaPhone />}>Contact Information</CustomAccordionToggle>
        <Accordion.Body className="pb-4 ps-4 pe-4">
            <ContactForm />
        </Accordion.Body>
        </Accordion.Item>

                <Accordion.Item eventKey="2">
            <CustomAccordionToggle eventKey="2" icon={<FaDollarSign />}>Financial & HR Details</CustomAccordionToggle>
            <Accordion.Body className="pb-4 ps-4 pe-4">
                <FinancialHR />
            </Accordion.Body>
            </Accordion.Item>


      <Accordion.Item eventKey="3">
        <CustomAccordionToggle eventKey="3" icon={<FaCertificate />}>Skills</CustomAccordionToggle>
        <Accordion.Body className="pb-4 ps-4 pe-4"> <Skills/> </Accordion.Body>
      </Accordion.Item>

     <Accordion.Item eventKey="4">
  <CustomAccordionToggle eventKey="4" icon={<FaFileAlt />}>Documents</CustomAccordionToggle>
<Accordion.Body className="pb-4 ps-4">
  <div className="row">
    {[
      { id: "cv-upload", label: "CV" },
      { id: "padhar-front-upload", label: "Padhar Card (Front)" },
      { id: "dl-front-upload", label: "Driving License (Front)" },
      { id: "photo-upload", label: "Photo" },
      { id: "padhar-back-upload", label: "Padhar Card (Back)" },
      { id: "dl-back-upload", label: "Driving License (Back)" },
      { id: "passport-photo-upload", label: "Passport Size Photo" },
      { id: "pan-upload", label: "PAN Card" },
      { id: "passport-front-upload", label: "Passport (Front)" },
      { id: "passport-back-upload", label: "Passport (Back)" },
      { id: "pf-upload", label: "PF Document" },
      { id: "contract-upload", label: "Employee Contract" },
      { id: "esi-upload", label: "ESI Document" },
    ].map(({ id, label }) => (
      <div key={id} className="col-md-4 mb-4">
  <label className="form-label">{label}</label>
  <div className="file-upload-box">
    <input type="file" className="d-none" id={id} />
    <label htmlFor={id} className="file-upload-label text-center">
      <i className="fas fa-upload upload-icon mb-2"></i>
      <div className="upload-text">
        <strong>Click to upload</strong> or drag and drop
      </div>
    </label>
  </div>
</div>


    ))}
  </div>
</Accordion.Body>

</Accordion.Item>

      <Accordion.Item eventKey="5">
  <CustomAccordionToggle eventKey="5" icon={<FaBuilding />}>Bank Details</CustomAccordionToggle>
  <Accordion.Body className="pb-4 ps-4">
    <div className="row">
      {/* Date and Title */}
      <div className="col-md-6 mb-3">
        <label className="form-label">Date</label>
        <input type="date" className="form-control" />
      </div>
      <div className="col-md-6 mb-3">
        <label className="form-label">Title</label>
        <input type="text" className="form-control" placeholder="Enter title" />
      </div>

      {/* Description */}
      <div className="col-md-12 mb-3">
        <label className="form-label">Description</label>
        <textarea className="form-control" rows="3" placeholder="Enter description" />
      </div>

      {/* Bank Document Upload */}
      <div className="col-md-6 mb-3">
        <label className="form-label">Bank Document</label>
       <div className="file-uploads-box">

          <input type="file" className="d-none" id="bank-doc-upload" />
          <label htmlFor="bank-doc-upload" className="file-uploads-label text-center">
            <i className="fas fa-upload uploads-icon mb-2"></i>
            <div className="uploads-text">
              <strong>Click to upload</strong> or drag and drop
            </div>
          </label>
        </div>
      </div>
    </div>
  </Accordion.Body>
</Accordion.Item>

    </Accordion>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="outline-secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            style={{
              backgroundColor: '#5c6ac4',
              border: 'none',
              padding: '0.45rem 1.2rem',
              borderRadius: '8px',
              fontWeight: '600',
              fontSize: '15px',
            }}
          >
            Save Staff
          </Button>
        </Modal.Footer>
      </Modal>

   {/* Customer Modal */}

   <Modal show={showCustomerModal} onHide={() => setShowCustomerModal(false)} size="lg" centered scrollable>
    <Modal.Header closeButton>
          <Modal.Title className="fw-bold">Add New Customer</Modal.Title>
        </Modal.Header>
        <div className="d-flex justify-content-between align-items-center mb-4 bg-light rounded p-3">
            <div>
              <span className="fw-semibold">Login is enable</span>
              <Form.Check
                type="switch"
                id="login-switch"
                checked={loginEnabled}
                onChange={(e) => setLoginEnabled(e.target.checked)}
                className="ms-3 d-inline-block"
              />
            </div>
            <div style={{ width: '50%' }}>
              <Form.Label className="fw-semibold">Organization <span className="text-danger">*</span></Form.Label>
              <Form.Select
                value={organization}
                onChange={(e) => setOrganization(e.target.value)}
              >
                <option value="">Select Organization</option>
                <option value="org1">Organization 1</option>
                <option value="org2">Organization 2</option>
              </Form.Select>
            </div>
          </div>
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

      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShowCustomerModal(false)}>
          Cancel
        </Button>
        <Button variant="primary">
          Save Customer
        </Button>
      </Modal.Footer>
  
   </Modal>





   {/* Vendor Modal */}

   <Modal show={showVendorModal} onHide={() => setShowVendorModal(false)} size="lg" centered scrollable>
      <Modal.Header closeButton style={{ backgroundColor: '#f8f9fa' }}>
        <Modal.Title className="fw-semibold">Add New Vendor</Modal.Title>
      </Modal.Header>

      {/* Login & Org Selection Section */}
      <div className="d-flex justify-content-between align-items-center mb-4 bg-light rounded px-4 py-3">
        <div className="d-flex align-items-center">
          <span className="fw-semibold me-3">Login is enabled</span>
          <Form.Check
            type="switch"
            id="login-switch"
            checked={loginEnabled}
            onChange={(e) => setLoginEnabled(e.target.checked)}
          />
        </div>
        <div style={{ width: '50%' }}>
          <Form.Group controlId="organization">
            <Form.Label className="fw-semibold">
              Organization <span className="text-danger">*</span>
            </Form.Label>
            <Form.Select
              value={organization}
              onChange={(e) => setOrganization(e.target.value)}
            >
              <option value="">Select Organization</option>
              <option value="org1">Organization 1</option>
              <option value="org2">Organization 2</option>
            </Form.Select>
          </Form.Group>
        </div>
      </div>

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

      {/* Footer */}
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShowVendorModal(false)}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSaveVendor}>
          Save Vendor
        </Button>
      </Modal.Footer>
    </Modal>
    </Container>
  );
}

export default PeoplePage;
