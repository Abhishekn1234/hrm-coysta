import { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function CustomerTable() {
  const navigate = useNavigate();
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/customers');
      setCustomers(response.data);
    } catch (error) {
      console.error('Failed to fetch customers:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
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
          {!loading && customers.length === 0 ? (
            <tr>
              <td colSpan="6" className="text-center text-muted py-4">
                No records found.
              </td>
            </tr>
          ) : (
            customers.map((customer, index) => (
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
                  <div className="fw-semibold">{customer.display_name || customer.company_name}</div>
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
  );
}
