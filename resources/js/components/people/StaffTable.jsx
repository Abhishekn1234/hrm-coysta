import React,{useState,useEffect} from 'react';
import axios from 'axios';
import { Table, Container, Tabs, Tab, Card, Row, Col } from 'react-bootstrap';
import {
  FaEdit,
  FaTrash,
  FaCalendarCheck,
  FaPlane,
  FaFileInvoice,
  FaTasks,
} from 'react-icons/fa';
import Staffdetail from './Staffdetail';
import { useNavigate } from 'react-router-dom';

export default function StaffTable() {
const navigate = useNavigate();
  const [staffData, setStaffData] = useState([]);
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [tabKey, setTabKey] = useState('general');

  useEffect(() => {
    // Fetch staff data from Laravel API
    axios
      .get('http://127.0.0.1:8000/api/v1/staff')
      .then((response) => {
        setStaffData(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error('Error fetching staff data:', error);
      });
  }, []);

  return (
    <Container className="py-4">
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>NAME</th>
            <th>DESIGNATION</th>
            <th>SALARY</th>
            <th>TOTAL PAYABLE</th>
            <th>TOTAL PAID</th>
            <th>BALANCE</th>
            <th>LOGIN</th>
          </tr>
        </thead>
       <tbody>
  {staffData.map((staff) => (
    <tr
      key={staff.id}
      onClick={() => navigate(`/staff/${staff.id}`, { state: { staff } })}
      style={{ cursor: 'pointer' }}
    >
      <td>
        <div className="d-flex align-items-center">
          <div
            className="rounded-circle text-white d-flex align-items-center justify-content-center me-2"
            style={{
              width: '36px',
              height: '36px',
              backgroundColor: 'skyblue',
            }}
          >
            {staff.name
              ?.split(' ')
              .map((n) => n[0])
              .join('')
              .toUpperCase()}
          </div>
          <div>
            <div>{staff.name}</div>
            <div className="text-muted small">{staff.place}</div>
          </div>
        </div>
      </td>
      <td>{staff.designation}</td>
      <td>{staff.base_salary || staff.daily_remuneration}</td>
      <td>{staff.other_allowances|| staff.rent_allowance_percent || '₹0'}</td>
      
      <td>{staff.housing_allowance|| staff.daily_remuneration || '₹0'}</td>
      <td>{staff.balance || staff.daily_remuneration|| '₹0'}</td>
      <td className="text-center align-middle">
        <div
          style={{
            width: '10px',
            height: '10px',
            backgroundColor: staff.status === 1 ? 'green' : 'red',
            borderRadius: '50%',
            display: 'inline-block',
          }}
        ></div>
      </td>
    </tr>
  ))}
</tbody>

      </Table>
      
    </Container>
  );
}