import React from "react";
import { Card, Button } from "react-bootstrap";
import { FaSitemap, FaProjectDiagram } from "react-icons/fa";
import "./Sidebar.css"; // <- CSS for styling and connectors

export default function Sidebar() {
  return (
    <Card className="org-card">
      <Card.Body className="org-body">
        <Header />
        <CEO name="Robert Chen" />
        <Departments />
        <FullOrgChartButton />
      </Card.Body>
    </Card>
  );
}

// Header Component
const Header = () => (
  <div className="org-header">
    <FaSitemap className="org-icon" />
    <Card.Title className="org-title">Organization Structure</Card.Title>
  </div>
);

// CEO Component
const CEO = ({ name }) => <div className="org-ceo">CEO: {name}</div>;

// Departments Section
const Departments = () => (
  <div className="org-tree">
    <Department name="Technology" teams={["Engineering", "Product", "IT Operations"]} />
    <Department name="Sales & Marketing" teams={["Sales", "Marketing", "Customer Success"]} />
    <Department name="Operations" teams={["HR & Admin", "Finance", "Facilities"]} />
  </div>
);

// Department Block
const Department = ({ name, teams }) => (
  <div className="org-department-wrapper">
    <div className={`org-department dept-${name.replace(/\s+/g, '-').toLowerCase()}`}>
      {name}
    </div>
    <div className="org-teams">
      {teams.map((team, index) => (
        <div className="org-team" key={index}>
          {team}
        </div>
      ))}
    </div>
  </div>
);


// Button
const FullOrgChartButton = () => (
  <Button variant="outline-primary" className="org-btn">
    <FaProjectDiagram style={{ marginRight: "5px" }} />
    Full Organization Chart
  </Button>
);
