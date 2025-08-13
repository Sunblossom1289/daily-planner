import { Button, Form } from 'react-bootstrap';
import { useState } from 'react';

export default function QuickAdd({ onAdd }) {
  const [title, setTitle] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim()) {
      onAdd({
        title,
        start: new Date(),
        allDay: true,
        type: 'personal',
        category: 'Personal',
        color: 'warning',
        bgColor: '#fff8e1',
        completed: false
      });
      setTitle('');
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="mb-3">
      <Form.Group>
        <Form.Label>Quick Add Event</Form.Label>
        <div className="d-flex">
          <Form.Control
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Event title"
            required
          />
          <Button variant="primary" type="submit" className="ms-2">
            Add
          </Button>
        </div>
      </Form.Group>
    </Form>
  );
}