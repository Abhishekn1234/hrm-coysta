import { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function VendorTable() {
  const navigate = useNavigate();
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true); // optional loading state

  useEffect(() => {
    async function fetchVendors() {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/v1/vendors');
        setVendors(response.data);
      } catch (error) {
        console.error('Failed to fetch vendors:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchVendors();
  }, []);

  return (
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
        ) : vendors.length === 0 ? (
          <tr>
            <td colSpan="8" className="text-center text-muted">
              No data found
            </td>
          </tr>
        ) : (
          vendors.map((vendor) => (
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
  );
}
