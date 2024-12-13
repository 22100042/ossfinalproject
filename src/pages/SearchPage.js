import React, { useState } from 'react';
import { Container, Form, Button, Row, Col, Card } from 'react-bootstrap';

const SearchPage = () => {
  const [hospitals, setHospitals] = useState([
    {
      id: 1,
      name: 'Pohang General Hospital',
      address: 'Pohang, South Korea',
      department: 'Cardiology',
      rating: 4.5,
    },
  ]);

  return (
    <Container>
      <h1 className="my-4">Search Hospitals</h1>
      <Form className="mb-4">
        <Row>
          <Col md={6}>
            <Form.Control placeholder="Search by name or location" />
          </Col>
          <Col md={4}>
            <Form.Select>
              <option value="">All Departments</option>
              <option value="Cardiology">Cardiology</option>
              <option value="Dermatology">Dermatology</option>
            </Form.Select>
          </Col>
          <Col md={2}>
            <Button variant="primary" block>
              Search
            </Button>
          </Col>
        </Row>
      </Form>

      <Row>
        {hospitals.map((hospital) => (
          <Col key={hospital.id} md={4} className="mb-4">
            <Card>
              <Card.Body>
                <Card.Title>{hospital.name}</Card.Title>
                <Card.Text>{hospital.address}</Card.Text>
                <Card.Text>Department: {hospital.department}</Card.Text>
                <Card.Text>Rating: {hospital.rating}</Card.Text>
                <Button variant="secondary" href={`/detail/${hospital.id}`}>
                  View Details
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default SearchPage;
