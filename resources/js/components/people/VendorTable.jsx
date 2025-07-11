import { useEffect, useState } from 'react';
import { Table, Row, Col, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function VendorTable() {
  const navigate = useNavigate();

  const [vendors, setVendors] = useState([]);
  const [filteredVendors, setFilteredVendors] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState('');
  const [organization, setOrganization] = useState('');
  const [tillDate, setTillDate] = useState('');

  const organizationList = [
    '',
    'Kochi Organization',
    'Calicut Organization',
    'Kozhikode Organization',
    'Bangalore Organization',
  ];

  useEffect(() => {
    async function fetchVendors() {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/v1/vendors');
        setVendors(response.data);
        setFilteredVendors(response.data);
      } catch (error) {
        console.error('Failed to fetch vendors:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchVendors();
  }, []);

  useEffect(() => {
    let result = [...vendors];

    // Search by name
    if (search) {
      result = result.filter((v) =>
        v.name?.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Filter by organization
    if (organization) {
      result = result.filter(
        (v) =>
          v.organization &&
          v.organization.toLowerCase() === organization.toLowerCase()
      );
    }

    // Filter by till date
    if (tillDate) {
      result = result.filter(
        (v) =>
          v.created_at &&
          new Date(v.created_at).setHours(0, 0, 0, 0) <=
            new Date(tillDate).setHours(0, 0, 0, 0)
      );
    }

    setFilteredVendors(result);
  }, [search, organization, tillDate, vendors]);

  const resetFilters = () => {
    setSearch('');
    setOrganization('');
    setTillDate('');
  };

  return (
    <>
      {/* Filters */}
      <Row className="align-items-end mb-3">
        <Col md={4}>
          <Form.Group controlId="search">
            <Form.Control
              type="text"
              placeholder="Keyword Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                borderRadius: '12px',
                padding: '0.6rem 1rem',
                border: '1px solid #ced4da',
              }}
            />
          </Form.Group>
        </Col>

        <Col md={4}>
          <Form.Group controlId="organization">
            <Form.Label style={{ fontWeight: 500 }}>Organization</Form.Label>
            <Form.Select
              value={organization}
              onChange={(e) => setOrganization(e.target.value)}
              style={{ borderRadius: '12px', padding: '0.6rem 1rem' }}
            >
              {organizationList.map((org, i) => (
                <option key={i} value={org}>
                  {org || 'All Organizations'}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>

        <Col md={4}>
          <Form.Group controlId="tillDate">
            <Form.Label style={{ fontWeight: 500 }}>Till Date</Form.Label>
            <Form.Control
              type="date"
              value={tillDate}
              onChange={(e) => setTillDate(e.target.value)}
              style={{ borderRadius: '12px', padding: '0.6rem 1rem' }}
            />
          </Form.Group>
        </Col>
      </Row>

      {/* Reset Filters */}
      <Row>
        <Col className="text-end">
          <Button
            variant="link"
            onClick={resetFilters}
            style={{ padding: 0, color: '#0d6efd', fontWeight: 500 }}
          >
            Reset Filters
          </Button>
        </Col>
      </Row>

      {/* Vendor Table */}
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>NAME</th>
            <th>CONTACT / EMAIL</th>
            <th>TYPE</th>
            <th>TOTAL BILLED</th>
            <th>PAID</th>
            <th>BALANCE</th>
            <th>CREATED DATE</th>
            <th>LOGIN</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan="8" className="text-center">
                Loading...
              </td>
            </tr>
          ) : filteredVendors.length === 0 ? (
            <tr>
              <td colSpan="8" className="text-center text-muted">
                No data found
              </td>
            </tr>
          ) : (
            filteredVendors.map((vendor) => (
              <tr
                key={vendor.id}
                style={{ cursor: 'pointer' }}
                onClick={() =>
                  navigate(`/admin/people/vendors/${vendor.id}`, {
                    state: { vendor },
                  })
                }
              >
                <td>
                  <div>{vendor.name}</div>
                  <div className="text-muted small">{vendor.branch}</div>
                </td>
                <td>
                  <div>{vendor.phone || vendor.contact}</div>
                  <div className="text-muted small">{vendor.email}</div>
                </td>
                <td>
                  <span
                    style={{
                      backgroundColor:
                        vendor.type === 'Material' ? '#d9efff' : '#fff8cc',
                      borderRadius: '12px',
                      padding: '4px 12px',
                      display: 'inline-block',
                      fontWeight: 500,
                    }}
                  >
                    {vendor.type}
                  </span>
                </td>
                <td>{vendor.totalBilled || '₹0'}</td>
                <td>{vendor.paid || '₹0'}</td>
                <td style={{ color: 'red', fontWeight: 'bold' }}>
                  {vendor.balance || '₹0'}
                </td>
                <td>{vendor.created_at?.substring(0, 10) || vendor.createdDate}</td>
                <td>
                  <div
                    style={{
                      width: '12px',
                      height: '12px',
                      borderRadius: '50%',
                      backgroundColor: vendor.login ? 'green' : 'red',
                      margin: 'auto',
                    }}
                  ></div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
    </>
  );
}
