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
  {/* Filter Card */}
  <div
    className="mb-4"
    style={{
      backgroundColor: '#fff',
      borderRadius: '16px',
      boxShadow: '0 4px 16px rgba(0,0,0,0.05)',
      padding: '24px',
    }}
  >
    <Row className="g-3 align-items-center">
      {/* Search */}
      <Col md={4}>
        <Form.Control
          type="text"
          placeholder="🔍 Keyword search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            borderRadius: '12px',
            padding: '10px 16px',
            border: '1px solid #e2e8f0',
          }}
        />
      </Col>

      {/* Organization */}
      <Col md={4}>
        <Form.Select
          value={organization}
          onChange={(e) => setOrganization(e.target.value)}
          style={{
            borderRadius: '12px',
            padding: '10px 16px',
            color: organization ? '#0f172a' : '#64748b',
            border: '1px solid #e2e8f0',
          }}
        >
          {organizationList.map((org, idx) => (
            <option key={idx} value={org}>
              {org || 'All Organizations'}
            </option>
          ))}
        </Form.Select>
      </Col>

      {/* Till Date */}
      <Col md={4}>
        <Form.Control
          type="date"
          value={tillDate}
          onChange={(e) => setTillDate(e.target.value)}
          style={{
            borderRadius: '12px',
            padding: '10px 16px',
            border: '1px solid #e2e8f0',
          }}
        />
      </Col>
    </Row>

    {/* Reset Filters */}
    <div className="text-end mt-3">
      <Button
        variant="link"
        onClick={resetFilters}
        style={{
          fontWeight: 500,
          color: '#4f46e5',
          padding: 0,
          fontSize: '14px',
        }}
      >
        Reset Filters
      </Button>
    </div>
  </div>

  {/* Table Container */}
  <div
    className="bg-white rounded-4 overflow-hidden"
    style={{ boxShadow: '0 4px 16px rgba(0, 0, 0, 0.05)' }}
  >
    <Table hover responsive className="mb-0 align-middle">
      <thead
        style={{
          backgroundColor: '#f8fafc',
          textTransform: 'uppercase',
          fontSize: '13px',
          color: '#475569',
        }}
      >
        <tr>
          <th style={{ padding: '12px 16px' }}>Name</th>
          <th style={{ padding: '12px 16px' }}>Contact</th>
          <th style={{ padding: '12px 16px' }}>Type</th>
          <th style={{ padding: '12px 16px' }}>Total Billed</th>
          <th style={{ padding: '12px 16px' }}>Paid</th>
          <th style={{ padding: '12px 16px' }}>Balance</th>
          <th style={{ padding: '12px 16px' }}>Created Date</th>
          <th style={{ padding: '12px 16px' }}>Login</th>
        </tr>
      </thead>
      <tbody>
        {loading ? (
          <tr>
            <td colSpan="8" className="text-center py-4 text-muted">
              Loading...
            </td>
          </tr>
        ) : filteredVendors.length === 0 ? (
          <tr>
            <td colSpan="8" className="text-center py-4 text-muted">
              No data found
            </td>
          </tr>
        ) : (
          filteredVendors.map((vendor) => (
            <tr
              key={vendor.id}
              onClick={() =>
                navigate(`/admin/people/vendors/${vendor.id}`, {
                  state: { vendor },
                })
              }
              style={{ cursor: 'pointer', transition: 'background 0.2s' }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = '#f9fafb')
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = 'transparent')
              }
            >
              {/* Name & Branch */}
              <td style={{ padding: '12px 16px' }}>
                <div style={{ fontWeight: 600 }}>{vendor.name}</div>
                <div className="text-muted small">{vendor.branch}</div>
              </td>

              {/* Contact */}
              <td style={{ padding: '12px 16px' }}>
                <div>{vendor.phone || vendor.contact}</div>
                <div className="text-muted small">{vendor.email}</div>
              </td>

              {/* Type Badge */}
              <td style={{ padding: '12px 16px' }}>
                <span
                  style={{
                    backgroundColor:
                      vendor.type === 'Material' ? '#dbeafe' : '#fef3c7',
                    color: '#1e40af',
                    borderRadius: '999px',
                    padding: '4px 12px',
                    fontSize: '13px',
                    fontWeight: 500,
                    display: 'inline-block',
                  }}
                >
                  {vendor.type}
                </span>
              </td>

              {/* Billing */}
              <td style={{ padding: '12px 16px' }}>{vendor.totalBilled || '₹0'}</td>
              <td style={{ padding: '12px 16px' }}>{vendor.paid || '₹0'}</td>
              <td style={{ padding: '12px 16px', color: '#dc2626', fontWeight: 'bold' }}>
                {vendor.balance || '₹0'}
              </td>

              {/* Created Date */}
              <td style={{ padding: '12px 16px' }}>
                {vendor.created_at?.substring(0, 10) || vendor.createdDate}
              </td>

              {/* Login Indicator */}
              <td className="text-center" style={{ padding: '12px 16px' }}>
                <div
                  style={{
                    width: '10px',
                    height: '10px',
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
  </div>
</>

  );
}
