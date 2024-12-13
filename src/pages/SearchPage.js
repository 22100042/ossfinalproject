import React, { useState } from 'react';
import { Container, Form, Button, Row, Col, Card } from 'react-bootstrap';

const SearchPage = () => {
  const [hospitals, setHospitals] = useState([]);
  const [query, setQuery] = useState('');
  const [department, setDepartment] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        'https://675bf7eb9ce247eb19380b43.mockapi.io/Hospital'
      );
      if (!response.ok) {
        throw new Error('Failed to fetch hospital data.');
      }

      const data = await response.json();

      // 필터링 로직
      const filteredHospitals = data.filter((hospital) => {
        const normalizedQuery = query.trim().toLowerCase();

        // 빈칸이면 전체 데이터 반환
        if (!normalizedQuery && !department) {
          return true; // 필터링 없이 전체 반환
        }

        // 검색 조건
        const nameMatch = normalizedQuery
          ? hospital.name.toLowerCase().includes(normalizedQuery)
          : true; // 검색어가 없으면 조건 무효화
        const addressMatch = normalizedQuery
          ? hospital.address.toLowerCase().includes(normalizedQuery)
          : true; // 검색어가 없으면 조건 무효화
        const departmentMatch = department
          ? hospital.department.toLowerCase() === department.toLowerCase()
          : true; // 진료과가 선택되지 않으면 조건 무효화

        return (nameMatch || addressMatch) && departmentMatch;
      });

      setHospitals(filteredHospitals);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <h1 className="my-4">Search Hospitals</h1>
      <Form className="mb-4" onSubmit={(e) => e.preventDefault()}>
        <Row>
          <Col md={6}>
            <Form.Control
              placeholder="Search by name or location"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </Col>
          <Col md={4}>
            <Form.Select
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
            >
              <option value="">All Departments</option>
              <option value="Cardiology">Cardiology</option>
              <option value="Dermatology">Dermatology</option>
            </Form.Select>
          </Col>
          <Col md={2}>
            <Button variant="primary" block onClick={handleSearch}>
              Search
            </Button>
          </Col>
        </Row>
      </Form>

      {loading && <p>Loading...</p>}
      {error && <p className="text-danger">Error: {error}</p>}
      {!loading && hospitals.length === 0 && !error && (
        <p className="text-muted">No hospitals found matching your criteria.</p>
      )}

      <Row>
        {hospitals.map((hospital) => (
          <Col key={hospital.id} md={4} className="mb-4">
            <Card>
              <Card.Body>
                <Card.Title>{hospital.name}</Card.Title>
                <Card.Text>{hospital.address}</Card.Text>
                <Card.Text>Department: {hospital.department}</Card.Text>
                <Card.Text>Rating: {hospital.rating.toFixed(1)}</Card.Text>
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
