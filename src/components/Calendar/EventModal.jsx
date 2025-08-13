import { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { FaCalendarAlt, FaUserMd, FaMusic } from 'react-icons/fa';

export default function EventModal({ show, handleClose, handleSave }) {
  const [event, setEvent] = useState({
    title: '',
    start: '',
    end: '',
    type: 'meeting'
  });

  const handleChange = (e) => {
    setEvent({...event, [e.target.name]: e.target.value});
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add New Event</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Event Title</Form.Label>
            <Form.Control 
              type="text" 
              name="title"
              value={event.title}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Event Type</Form.Label>
            <Form.Select 
              name="type"
              value={event.type}
              onChange={handleChange}
            >
              <option value="meeting">
                <FaCalendarAlt /> Meeting
              </option>
              <option value="doctor">
                <FaUserMd /> Doctor Appointment
              </option>
              <option value="dance">
                <FaMusic /> Dance Class
              </option>
            </Form.Select>
          </Form.Group>

          {/* Add date/time pickers here */}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={() => handleSave(event)}>
          Save Event
        </Button>
      </Modal.Footer>
    </Modal>
  );
}