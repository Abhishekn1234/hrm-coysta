import { useEffect, useState } from 'react';
import { Table, Row, Col, Card, InputGroup, Form } from 'react-bootstrap';
import { FaSearch, FaFilter, FaUndo } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import dayjs from 'dayjs';

export default function CustomerTable() {
  const navigate = useNavigate();
  const [customers, setCustomers] = useState([]);
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [filters, setFilters] = useState({
    search: '',
    organization: '',
    date: '',
  });

  useEffect(() => {
    fetchCustomers();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [filters, customers]);

  const handleReset = () => {
    setFilters({ search: '', organization: '', date: '' });
  };

  const fetchCustomers = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/customer/customers');
      setCustomers(response.data);
    } catch (error) {
      console.error('Failed to fetch customers:', error);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...customers];

    // 🔍 Search
    if (filters.search) {
      filtered = filtered.filter((customer) => {
        const searchTerm = filters.search.toLowerCase();
        return (
          customer.display_name?.toLowerCase().includes(searchTerm) ||
          customer.company_name?.toLowerCase().includes(searchTerm) ||
          customer.email?.toLowerCase().includes(searchTerm) ||
          customer.primary_contact_phone?.toLowerCase().includes(searchTerm)
        );
      });
    }

    // 🏢 Organization
       if (filters.organization) {
          filtered = filtered.filter(
            (customer) =>
              customer.organization &&
              customer.organization.toLowerCase() === filters.organization.toLowerCase()
          );
        }



    // 🗓 Date filter
    const today = dayjs();
    if (filters.date) {
      filtered = filtered.filter((customer) => {
        const created = dayjs(customer.created_at || customer.updated_at);

        if (filters.date === 'today') {
          return created.isSame(today, 'day');
        } else if (filters.date === 'week') {
          return created.isSame(today, 'week');
        } else if (filters.date === 'month') {
          return created.isSame(today, 'month');
        }
        return true; // For 'till date' or unrecognized value
      });
    }

    setFilteredCustomers(filtered);
  };

  return (
    <>
      <Card className="shadow-sm border-0 rounded-4 mb-3">
        <Card.Body>
          <Row className="g-3 align-items-center">
            {/* Search */}
            <Col md={4}>
              <InputGroup>
                <InputGroup.Text className="bg-light border-end-0">
                  <FaSearch className="text-muted" />
                </InputGroup.Text>
                <Form.Control
                  placeholder="Keyword search..."
                  className="border-start-0"
                  value={filters.search}
                  onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                />
              </InputGroup>
            </Col>

            {/* Organization Filter */}
            <Col md={4}>
              <InputGroup>
                <InputGroup.Text className="bg-light border-end-0">
                  <FaFilter className="text-muted" />
                </InputGroup.Text>
                <Form.Select
                  className="border-start-0"
                  value={filters.organization}
                  onChange={(e) => setFilters({ ...filters, organization: e.target.value })}
                >
                  <option value="">All Organizations</option>
                  <option>Calicut Organization</option>
                   <option>Kozhikode Organization</option>
                  <option >Bangalore Organization</option>
                  <option>Kochi Organization</option>
                  <option>Trivandrum Organization</option>
                </Form.Select>
              </InputGroup>
            </Col>

            {/* Date Filter */}
            <Col md={4}>
              <Form.Select
                value={filters.date}
                onChange={(e) => setFilters({ ...filters, date: e.target.value })}
              >
                <option value="">Till Date</option>
                <option value="today">Today</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
              </Form.Select>
            </Col>
          </Row>

          {/* Reset Filters */}
          <div className="d-flex justify-content-end mt-3">
            <span
              className="text-primary fw-semibold d-flex align-items-center"
              style={{ cursor: 'pointer' }}
              onClick={handleReset}
            >
              <FaUndo className="me-1" /> Reset Filters
            </span>
          </div>
        </Card.Body>
      </Card>

      <div className="border rounded-3 overflow-hidden">
        <Table hover responsive className="mb-0">
          <thead className="bg-light">
            <tr>
              <th>COMPANY NAME</th>
              <th>CONTACT</th>
              <th className="text-center">PROJECTS</th>
              <th className="text-center">QUOTATIONS</th>
              <th className="text-center">TOTAL VALUE</th>
              <th className="text-center">LOGIN</th>
            </tr>
          </thead>
          <tbody>
            {!loading && filteredCustomers.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center text-muted py-4">
                  No records found.
                </td>
              </tr>
            ) : (
              filteredCustomers.map((customer) => (
                <tr
                  key={customer.id}
                  onClick={() =>
                    navigate(`/admin/people/customers/${customer.id}`, {
                      state: { customer },
                    })
                  }
                  style={{ cursor: 'pointer' }}
                >
                  <td>
                    <div className="fw-semibold">
                      {customer.display_name || customer.company_name}
                    </div>
                    <div className="text-muted small">{customer.organization || '—'}</div>
                  </td>
                  <td>
                    <div className="mb-1">{customer.primary_contact_phone}</div>
                    <div className="small">{customer.email}</div>
                  </td>
                  <td className="text-center fw-semibold">{customer.projects ?? 0}</td>
                  <td className="text-center fw-semibold">{customer.quotations ?? 0}</td>
                  <td className="text-center fw-semibold">{customer.total_value ?? '₹0'}</td>
                  <td className="text-center align-middle">
                    <div
                      style={{
                        width: '10px',
                        height: '10px',
                        backgroundColor: 'red',
                        borderRadius: '50%',
                        display: 'inline-block',
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
