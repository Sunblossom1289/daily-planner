import React, { useState } from 'react';
import { Button, Form, Container, Row, Col, Card } from 'react-bootstrap';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setError('');
      setLoading(true);
      await login(email);
      navigate('/dashboard');
    } catch (err) {
      setError('Failed to sign in: ' + err.message);
      setLoading(false);
    }
  };

  return (
    <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
      <Row className="w-100" style={{ maxWidth: '400px' }}>
        <Col>
          <Card className="shadow-lg rounded-xl border-0 overflow-hidden">
            <div className="bg-primary p-4 text-center text-white">
              <h2 className="mb-0">Sign In</h2>
              <p className="mb-0">Access your daily planner</p>
            </div>
            <Card.Body className="p-4">
              {error && <div className="alert alert-danger">{error}</div>}
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control 
                    type="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    required 
                    className="rounded-lg"
                  />
                </Form.Group>
                <Button 
                  disabled={loading} 
                  className="w-100 mb-3 rounded-lg py-2 bg-primary text-white border-0" 
                  type="submit"
                >
                  Sign In
                </Button>
              </Form>
              
              <div className="text-center mt-4">
                <p className="mb-0">
                  Don't have an account? <a href="/signup" className="text-decoration-none">Sign Up</a>
                </p>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}