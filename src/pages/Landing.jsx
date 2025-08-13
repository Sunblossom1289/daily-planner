import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaCalendarAlt, FaClock, FaChartBar, FaGoogle } from 'react-icons/fa';

export default function Landing() {
  return (
    <div className="landing-page">
      {/* Hero Section */}
      <section className="hero-section bg-gradient-primary text-white py-5">
        <Container>
          <Row className="align-items-center py-5">
            <Col md={6} className="mb-4 mb-md-0">
              <h1 className="display-4 fw-bold mb-3">Organize Your Day, Master Your Life</h1>
              <p className="lead mb-4">
                The ultimate daily planner that helps you schedule tasks, track time, 
                and boost productivity with intelligent insights.
              </p>
              <div className="d-flex gap-3">
                <Button 
                  as={Link} 
                  to="/signup" 
                  size="lg" 
                  className="rounded-pill px-4 bg-white text-primary border-0 fw-bold"
                >
                  Get Started
                </Button>
                <Button 
                  as={Link} 
                  to="/signin" 
                  variant="outline-light" 
                  size="lg" 
                  className="rounded-pill px-4 fw-bold"
                >
                  Sign In
                </Button>
              </div>
            </Col>
            <Col md={6} className="text-center">
              <div className="dashboard-preview p-3 bg-white rounded-xl shadow-lg">
                <div className="bg-light rounded-lg p-2">
                  <div className="d-flex justify-content-between mb-3">
                    <div className="bg-primary rounded-lg p-3 w-25"></div>
                    <div className="bg-success rounded-lg p-3 w-60"></div>
                  </div>
                  <div className="bg-light rounded-lg p-4 mb-3"></div>
                  <div className="d-flex">
                    <div className="bg-warning rounded-lg p-3 w-30 me-2"></div>
                    <div className="bg-danger rounded-lg p-3 w-70"></div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Features Section */}
      <section className="py-5">
        <Container>
          <h2 className="text-center mb-5">Powerful Features for Better Productivity</h2>
          <Row>
            <Col md={4} className="text-center mb-5">
              <div className="feature-icon mx-auto bg-primary text-white rounded-circle d-flex align-items-center justify-content-center mb-3">
                <FaCalendarAlt size={30} />
              </div>
              <h3>Smart Scheduling</h3>
              <p>
                Organize your tasks, meetings, and appointments in a beautifully designed calendar interface.
              </p>
            </Col>
            <Col md={4} className="text-center mb-5">
              <div className="feature-icon mx-auto bg-success text-white rounded-circle d-flex align-items-center justify-content-center mb-3">
                <FaClock size={30} />
              </div>
              <h3>Focus Timer</h3>
              <p>
                Built-in Pomodoro timer to help you maintain focus and track time spent on tasks.
              </p>
            </Col>
            <Col md={4} className="text-center mb-5">
              <div className="feature-icon mx-auto bg-info text-white rounded-circle d-flex align-items-center justify-content-center mb-3">
                <FaChartBar size={30} />
              </div>
              <h3>Productivity Insights</h3>
              <p>
                Daily reports and analytics to help you understand your productivity patterns.
              </p>
            </Col>
          </Row>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-5 bg-light">
        <Container className="text-center py-5">
          <h2 className="mb-4">Ready to Transform Your Productivity?</h2>
          <p className="lead mb-4">
            Join thousands of professionals who are already mastering their schedules with our daily planner.
          </p>
          <Button 
            as={Link} 
            to="/signup" 
            size="lg" 
            className="rounded-pill px-5 bg-gradient-primary border-0 fw-bold"
          >
            Start Free Today
          </Button>
        </Container>
      </section>

      {/* Footer */}
      <footer className="bg-dark text-white py-4">
        <Container>
          <Row>
            <Col md={6}>
              <h5>Daily Planner Pro</h5>
              <p className="text-muted">
                The ultimate tool for organizing your day and boosting productivity.
              </p>
            </Col>
            <Col md={6} className="text-md-end">
              <p className="text-muted mb-0">&copy; {new Date().getFullYear()} Daily Planner Pro. All rights reserved.</p>
            </Col>
          </Row>
        </Container>
      </footer>
    </div>
  );
}