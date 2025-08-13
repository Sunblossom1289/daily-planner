import { Modal, Button, Table, ProgressBar } from 'react-bootstrap';

export default function DailyReport({ show, onHide, events, onTaskClick }) {
  const completedTasks = events.filter(e => e.completed).length;
  const totalTasks = events.length;
  const completionRate = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;
  
  const totalTimeSpent = events.reduce((sum, e) => sum + (e.timeSpent || 0), 0);

  return (
    <Modal show={show} onHide={onHide} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Daily Performance Report</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="summary mb-4">
          <h5>Summary</h5>
          <ProgressBar 
            now={completionRate} 
            label={`${Math.round(completionRate)}%`} 
            className="mb-3"
          />
          <p>Tasks Completed: {completedTasks}/{totalTasks}</p>
          <p>Total Focus Time: {totalTimeSpent} minutes</p>
        </div>

        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Task</th>
              <th>Category</th>
              <th>Time Spent</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {events.map(event => (
              <tr 
                key={event.id} 
                onClick={() => onTaskClick(event)}
                className={event.completed ? 'table-success' : 'table-light'}
                style={{ cursor: 'pointer' }}
              >
                <td>{event.title}</td>
                <td>
                  <span className="badge" style={{ 
                    backgroundColor: event.bgColor,
                    color: event.color === 'warning' ? '#000' : '#fff'
                  }}>
                    {event.category}
                  </span>
                </td>
                <td>{event.timeSpent || 0} mins</td>
                <td>
                  {event.completed ? 
                    <span className="text-success">✓ Completed</span> : 
                    <span className="text-danger">✗ Pending</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}