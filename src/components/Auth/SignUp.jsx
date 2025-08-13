import React, { useState } from 'react';
import { Button, Form, Container, Row, Col, Card } from 'react-bootstrap';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setError('');
      setLoading(true);
      await signup(email);
      navigate('/dashboard');
    } catch (err) {
      setError('Failed to create account: ' + err.message);
      setLoading(false);
    }
  };

  return (
    <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
      <Row className="w-100" style={{ maxWidth: '400px' }}>
        <Col>
          <Card className="shadow-lg rounded-xl border-0 overflow-hidden">
            <div className="bg-primary p-4 text-center text-white">
              <h2 className="mb-0">Create Account</h2>
              <p className="mb-0">Get started with us today</p>
            </div>
            <Card.Body className="p-4">
              {error && <div className="alert alert-danger">{error}</div>}
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-4">
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
                  Sign Up
                </Button>
              </Form>
              
              <div className="text-center mt-4">
                <p className="mb-0">
                  Already have an account? <a href="/signin" className="text-decoration-none">Sign In</a>
                </p>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}