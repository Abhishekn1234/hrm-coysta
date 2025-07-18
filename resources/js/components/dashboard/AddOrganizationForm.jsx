import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AddOrganizationForm({ onClose }) {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post("http://127.0.0.1:8000/api/v1/admin/organizations", {
        name,
      });
      toast.success("Organization created successfully.");
      setName("");
      onClose();
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to create organization.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="orgName">
          <Form.Label>Organization Name</Form.Label>
          <Form.Control
            type="text"
            value={name}
            required
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter organization name"
          />
        </Form.Group>
        <Button type="submit" className="mt-3" disabled={loading}>
          {loading ? "Saving..." : "Save"}
        </Button>
      </Form>
    </>
  );
}
