import React from 'react';
import { Table, Container } from 'react-bootstrap';

export default function StaffTable() {
  const staffData = [
    {
      initials: 'AK',
      name: 'Arun Kumar',
      location: 'Bangalore Branch',
      designation: 'SOUND ENGINEER',
      salary: '₹75,000',
      totalPayable: '₹9,00,000',
      totalPaid: '₹8,25,000',
      balance: '₹75,000',
      login: ''
    },
    {
      initials: 'PS',
      name: 'Priya Sharma',
      location: 'Mumbai Office',
      designation: 'PROJECT MANAGER / TECHNICIAN',
      salary: '₹95,000',
      totalPayable: '₹11,40,000',
      totalPaid: '₹11,40,000',
      balance: '₹0',
      login: ''
    },
    {
      initials: 'RV',
      name: 'Raj Verma',
      location: 'Delhi Branch',
      designation: 'Videographer',
      salary: '₹0',
      totalPayable: '₹1,50,000',
      totalPaid: '₹1,20,000',
      balance: '₹30,000',
      login: ''
    },
    {
      initials: 'AN',
      name: 'Anand Nair',
      location: 'Kochi Head Office',
      designation: 'Store Executive',
      salary: '₹50,000',
      totalPayable: '₹12,00,000',
      totalPaid: '₹12,00,000',
      balance: '₹0',
      login: ''
    },
    {
      initials: 'SM',
      name: 'Sunita Menon',
      location: 'Kochi Head Office',
      designation: 'HR',
      salary: '₹80,000',
      totalPayable: '₹9,60,000',
      totalPaid: '₹9,60,000',
      balance: '₹0',
      login: ''
    },
    {
      initials: 'VS',
      name: 'Vijay Singh',
      location: 'Bangalore Branch',
      designation: 'LIGHT ENGINEER',
      salary: '₹60,000',
      totalPayable: '₹7,20,000',
      totalPaid: '₹6,60,000',
      balance: '₹60,000',
      login: ''
    }
  ];

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
          {staffData.map((staff, index) => (
            <tr key={index}>
              <td>
                <div className="d-flex align-items-center">
                  <div className="rounded-circle  text-white d-flex align-items-center justify-content-center me-2" 
                       style={{ width: '36px', height: '36px',"backgroundColor":"skyblue" }}>
                    {staff.initials}
                  </div>
                  <div>
                    <div>{staff.name}</div>
                    <div className="text-muted small">{staff.location}</div>
                  </div>
                </div>
              </td>
              <td>{staff.designation}</td>
              <td>{staff.salary}</td>
              <td>{staff.totalPayable}</td>
              <td>{staff.totalPaid}</td>
              <td>{staff.balance}</td>
             <td className="text-center align-middle">
                    <div
                        style={{
                        width: '10px',
                        height: '10px',
                        backgroundColor: 'red',
                        borderRadius: '50%',
                        display: 'inline-block'
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