import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Table,
  Container,
  Card,
  Row,
  Col,
  Form,
  Button,
} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export default function StaffTable() {
  const navigate = useNavigate();

  const [staffData, setStaffData] = useState([]);
  const [filteredStaff, setFilteredStaff] = useState([]);

  const [userTypes, setUserTypes] = useState([]);

  const [filters, setFilters] = useState({
    search: '',
    designation: '',
    userType: '',
    skill: '',
    organization: '',
  });

  const allDesignations = [
    'Software Engineer',
    'Frontend Developer',
    'Backend Developer',
    'Full Stack Developer',
    'DevOps Engineer',
    'QA Engineer',
    'UI/UX Designer',
    'IT Support Specialist',
    'Mobile App Developer',
    'Data Analyst',
    'Data Scientist',
    'Machine Learning Engineer',
    'HR Manager',
    'Recruiter',
    'HR Executive',
    'Talent Acquisition Specialist',
    'HR Assistant',
    'Sales Executive',
    'Sales Manager',
    'Business Development Executive',
  ];

  const skillOptions = [
    'Client Service',
    'Sales',
    'Video Design',
    'Transportation',
    'Asst.Technician',
  ];

  const orgOptions = [
    'kochi organization',
    'calicut organization',
    'kozhikode organization',
    'bangalore organization',
  ];

  useEffect(() => {
    fetchStaffData();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [filters, staffData]);

  const fetchStaffData = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/v1/staff');
      const data = response.data;
      setStaffData(data);
      setFilteredStaff(data);

      const uniqueUserTypes = Array.from(
        new Map(data.map((s) => [s.user_type, s.user_type])).values()
      );
      setUserTypes(uniqueUserTypes);
    } catch (error) {
      console.error('Error fetching staff data:', error);
    }
  };

  const applyFilters = () => {
    let results = [...staffData];

    results = results.filter((staff) => {
      const fullName = `${staff.first_name ?? ''} ${staff.last_name ?? ''} ${staff.name ?? ''}`.toLowerCase();
      const searchMatch = fullName.includes(filters.search.toLowerCase());

      const designationMatch =
        !filters.designation ||
        (staff.designation &&
          staff.designation.toLowerCase() === filters.designation.toLowerCase());

      const userTypeMatch =
        !filters.userType || staff.user_type === filters.userType;

      const skillMatch =
        !filters.skill ||
        (Array.isArray(staff.skills) &&
          staff.skills.some(
            (skill) =>
              skill.name &&
              skill.name.toLowerCase() === filters.skill.toLowerCase()
          ));

      const organizationMatch =
        !filters.organization ||
        (staff.organization &&
          staff.organization.toLowerCase() === filters.organization.toLowerCase());

      return (
        searchMatch &&
        designationMatch &&
        userTypeMatch &&
        skillMatch &&
        organizationMatch
      );
    });

    setFilteredStaff(results);
  };

  const resetFilters = () => {
    setFilters({
      search: '',
      designation: '',
      userType: '',
      skill: '',
      organization: '',
    });
  };

  return (
    <>
      <Card className="mb-3">
        <Card.Body>
          <Row className="mb-3 g-3">
            <Col md={6}>
              <Form.Control
                type="search"
                placeholder="Search by first / last / full name"
                value={filters.search}
                onChange={(e) => setFilters({ ...filters, search: e.target.value })}
              />
            </Col>
            <Col md={6}>
              <Form.Select
                value={filters.organization}
                onChange={(e) =>
                  setFilters({ ...filters, organization: e.target.value })
                }
              >
                <option value="">All Organizations</option>
                {orgOptions.map((org, i) => (
                  <option key={i} value={org}>
                    {org.charAt(0).toUpperCase() + org.slice(1)}
                  </option>
                ))}
              </Form.Select>
            </Col>
          </Row>

          <Row className="mb-3 g-3">
            <Col md={6}>
              <Form.Select
                value={filters.userType}
                onChange={(e) =>
                  setFilters({ ...filters, userType: e.target.value })
                }
              >
                <option value="">All User Types</option>
                {userTypes.map((type, i) => (
                  <option key={i} value={type}>
                    {type}
                  </option>
                ))}
              </Form.Select>
            </Col>
            <Col md={6}>
              <Form.Select
                value={filters.designation}
                onChange={(e) =>
                  setFilters({ ...filters, designation: e.target.value })
                }
              >
                <option value="">All Designations</option>
                {allDesignations.map((d, i) => (
                  <option key={i} value={d}>
                    {d}
                  </option>
                ))}
              </Form.Select>
            </Col>
          </Row>

          <Row className="align-items-center g-3">
            <Col md={10}>
              <Form.Select
                value={filters.skill}
                onChange={(e) => setFilters({ ...filters, skill: e.target.value })}
              >
                <option value="">All Skills</option>
                {skillOptions.map((s, i) => (
                  <option key={i} value={s}>
                    {s}
                  </option>
                ))}
              </Form.Select>
            </Col>
            <Col md={2} className="text-md-end text-start">
              <Button variant="link" className="text-primary fw-semibold p-0" onClick={resetFilters}>
                Reset Filters
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>

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
            {filteredStaff.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center text-muted py-4">
                  No staff found.
                </td>
              </tr>
            ) : (
              filteredStaff.map((staff) => (
                <tr
                  key={staff.id}
                  onClick={() =>
                    navigate(`/staff/${staff.id}`, { state: { staff } })
                  }
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
                        {`${staff.first_name?.[0] || ''}${staff.last_name?.[0] || ''}`.toUpperCase()}
                      </div>
                      <div>
                        <div>{`${staff.first_name || ''} ${staff.last_name || ''}`.trim()}</div>
                        <div className="text-muted small">{staff.organization || '—'}</div>
                      </div>
                    </div>
                  </td>
                  <td>{staff.designation || 'N/A'}</td>
                  <td>{staff.base_salary || staff.daily_remuneration || '₹0'}</td>
                  <td>{staff.other_allowances || staff.rent_allowance_percent || '₹0'}</td>
                  <td>{staff.housing_allowance || staff.daily_remuneration || '₹0'}</td>
                  <td>{staff.balance || staff.daily_remuneration || '₹0'}</td>
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
              ))
            )}
          </tbody>
        </Table>
      </Container>
    </>
  );
}
