import { Table } from 'react-bootstrap';

export default function VendorTable() {
  const vendors = [
    {
      name: 'AV Pro Rentals',
      branch: 'Delhi Branch',
      contact: '7654321098',
      email: 'vikram@avpro.com',
      type: 'Material',
      totalBilled: '₹1,20,000',
      paid: '₹1,00,000',
      balance: '₹20,000',
      createdDate: '2024-06-25',
      login: true
    },
    {
      name: 'Creative Catering Co.',
      branch: 'Kochi Head Office',
      contact: '7654321097',
      email: 'deepa.jver@creativecatering.com',
      type: 'Service',
      totalBilled: '₹75,000',
      paid: '₹75,000',
      balance: '₹0',
      createdDate: '2023-11-20',
      login: true
    },
    {
      name: 'Bangalore Transport',
      branch: 'Bangalore Branch',
      contact: '7654321096',
      email: 'contact@bngtransport.com',
      type: 'Service',
      totalBilled: '₹90,000',
      paid: '₹75,000',
      balance: '₹15,000',
      createdDate: '2024-01-18',
      login: false
    },
    {
      name: 'Mumbai Florists',
      branch: 'Mumbai Office',
      contact: '7654321095',
      email: 'sales@mumbaiflorist.com',
      type: 'Material',
      totalBilled: '₹50,000',
      paid: '₹50,000',
      balance: '₹0',
      createdDate: '2024-09-05',
      login: true
    }
  ];

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
        {vendors.map((vendor, index) => (
          <tr key={index}>
            {/* Name, Branch, Email */}
            <td>
              <div>{vendor.name}</div>
              <div className="text-muted small">{vendor.branch}</div>
            </td>

            {/* Contact and Email in same td */}
            <td>
              <div>{vendor.contact}</div>
              <div className="text-muted small">{vendor.email}</div>
            </td>

            {/* Type with background and border radius */}
            <td>
              <span
                style={{
                  backgroundColor:
                    vendor.type === 'Material' ? '#d9efff' : '#fff8cc',
                  borderRadius: '12px',
                  padding: '4px 12px',
                  display: 'inline-block',
                  fontWeight: 500
                }}
              >
                {vendor.type}
              </span>
            </td>

            {/* Billing columns */}
            <td>{vendor.totalBilled}</td>
            <td>{vendor.paid}</td>

            {/* Balance in red color */}
            <td style={{ color: 'red', fontWeight: 'bold' }}>
              {vendor.balance}
            </td>

            {/* Created Date */}
            <td>{vendor.createdDate}</td>

            {/* Login Status with Red/Green Dot */}
            <td>
              <div
                style={{
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  backgroundColor: vendor.login ? 'green' : 'red',
                  margin: 'auto'
                }}
              ></div>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
