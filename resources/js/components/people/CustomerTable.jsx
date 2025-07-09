import { Table } from 'react-bootstrap';

export default function CustomerTable() {
  // Sample data - replace with your actual data
  const customers = [
    {
      company: 'Global Event Planners',
      branch: 'Bangalore Branch',
      phone: '8765432109',
      email: 'sunita@globalevents.com',
      projects: 5,
      quotations: 12,
      totalValue: '₹5,50,000'
    },
    {
      company: 'Anjali & Rohan Wedding',
      branch: 'Mumbai Office',
      phone: '8765432108',
      email: 'anjali.mehta@gmail.com',
      projects: 1,
      quotations: 3,
      totalValue: '₹120,000'
    },
    {
      company: 'Innovate Tech Conf.',
      branch: 'Delhi Branch',
      phone: '8765432107',
      email: 'karan@innovateconf.com',
      projects: 2,
      quotations: 8,
      totalValue: '₹8,50,000'
    },
    {
      company: "Nisha's 50th Birthday",
      branch: 'Kochi Head Office',
      phone: '8765432106',
      email: 'nisha.k@email.com',
      projects: 1,
      quotations: 2,
      totalValue: '₹75,000'
    }
  ];

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
          {customers.map((customer, index) => (
            <tr key={index}>
              <td>
                <div className="fw-semibold">{customer.company}</div>
                <div className="text-muted small">{customer.branch}</div>
              </td>
              <td>
                <div className="mb-1">{customer.phone}</div>
                <div className="small">{customer.email}</div>
              </td>
              <td className="text-center fw-semibold">{customer.projects}</td>
              <td className="text-center fw-semibold">{customer.quotations}</td>
              <td className="text-center fw-semibold">{customer.totalValue}</td>
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
    </div>
  );
}