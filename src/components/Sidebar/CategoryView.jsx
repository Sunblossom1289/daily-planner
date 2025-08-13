import { Modal, Button, Form, Card } from 'react-bootstrap';
import { useState } from 'react';
import PomodoroTimer from './PomodoroTimer';

export default function CategoryView({ category, show, onHide, onSave }) {
  const [event, setEvent] = useState({
    title: '',
    description: '',
    time: '',
    completed: false,
    timeSpent: 0
  });

  const handleSubmit = () => {
    onSave({
      ...event,
      category: category.name,
      color: category.color,
      bgColor: category.bgColor
    });
    setEvent({
      title: '',
      description: '',
      time: '',
      completed: false,
      timeSpent: 0
    });
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide} size="lg">
      <Modal.Header closeButton style={{ backgroundColor: category.bgColor }}>
        <Modal.Title>{category.name} Activity</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {category.name === 'Health' && (
          <Card className="mb-3">
            <Card.Header>Doctor Appointment</Card.Header>
            <Card.Body>
              <Form.Group className="mb-3">
                <Form.Label>Doctor Name</Form.Label>
                <Form.Control 
                  type="text"
                  value={event.doctor || ''}
                  onChange={(e) => setEvent({...event, doctor: e.target.value})}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Specialization</Form.Label>
                <Form.Control 
                  as="select"
                  value={event.specialization || ''}
                  onChange={(e) => setEvent({...event, specialization: e.target.value})}
                >
                  <option value="">Select</option>
                  <option value="General Physician">General Physician</option>
                  <option value="Dentist">Dentist</option>
                  <option value="Cardiologist">Cardiologist</option>
                </Form.Control>
              </Form.Group>
            </Card.Body>
          </Card>
        )}

        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Activity Title</Form.Label>
            <Form.Control 
              type="text" 
              value={event.title}
              onChange={(e) => setEvent({...event, title: e.target.value})}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control 
              as="textarea" 
              rows={3}
              value={event.description}
              onChange={(e) => setEvent({...event, description: e.target.value})}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Estimated Time (minutes)</Form.Label>
            <Form.Control 
              type="number" 
              value={event.time}
              onChange={(e) => setEvent({...event, time: e.target.value})}
            />
          </Form.Group>
        </Form>

        <PomodoroTimer 
          onComplete={(timeSpent) => setEvent({...event, timeSpent})}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
        <Button 
          variant={category.color} 
          onClick={handleSubmit}
          style={{ backgroundColor: category.bgColor, borderColor: category.color }}
        >
          Save Activity
        </Button>
      </Modal.Footer>
    </Modal>
  );
}