import { useEffect, useState } from 'react';
import { Modal, Button, ProgressBar, Card, Badge } from 'react-bootstrap';
import { FaTimes } from 'react-icons/fa';

export default function FocusModal({ 
  task, 
  onClose, 
  onTimeTrack, 
  onComplete,
  onNextTask 
}) {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [workSessions, setWorkSessions] = useState(0);
  const [timeSpent, setTimeSpent] = useState(0);
  const [completed, setCompleted] = useState(task.completed);

  useEffect(() => {
    let interval;
    if (isActive) {
      interval = setInterval(() => {
        if (seconds === 0) {
          if (minutes === 0) {
            clearInterval(interval);
            setIsActive(false);
            const newSessions = workSessions + 1;
            const newTime = timeSpent + 25;
            setWorkSessions(newSessions);
            setTimeSpent(newTime);
            onTimeTrack(25);
            
            // Auto-start next session if not completed
            if (!completed) {
              setTimeout(() => {
                setMinutes(5); // Short break
                setSeconds(0);
                setIsActive(true);
              }, 1000);
            }
          } else {
            setMinutes(minutes - 1);
            setSeconds(59);
          }
        } else {
          setSeconds(seconds - 1);
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isActive, minutes, seconds]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setMinutes(25);
    setSeconds(0);
  };

  const handleComplete = () => {
    setCompleted(true);
    onComplete();
    onTimeTrack(timeSpent);
  };

  return (
    <Modal 
      show={true} 
      onHide={onClose}
      centered
      size="lg"
      className="focus-modal"
    >
      <Modal.Header closeButton>
        <Modal.Title>
          <span className="badge me-2" style={{ 
            backgroundColor: task.bgColor,
            color: task.color === 'warning' ? '#000' : '#fff'
          }}>
            {task.category}
          </span>
          {task.title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div className="time-display">
            {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
          </div>
          <div className="session-badge">
            <Badge bg="info">Sessions: {workSessions}</Badge>
            <Badge bg="success" className="ms-2">Time: {timeSpent} min</Badge>
          </div>
        </div>
        
        <ProgressBar 
          now={(minutes * 60 + seconds) / (25 * 60) * 100} 
          variant={isActive ? "success" : "secondary"}
          className="mb-4"
          style={{ height: '10px' }}
        />
        
        <div className="task-details mb-4">
          {task.description && <p>{task.description}</p>}
          {task.doctor && (
            <div className="doctor-info">
              <h6>Doctor Appointment</h6>
              <p><strong>Name:</strong> {task.doctor}</p>
              {task.specialization && <p><strong>Specialization:</strong> {task.specialization}</p>}
            </div>
          )}
        </div>
        
        <div className="d-flex justify-content-center gap-3 mb-3">
          <Button 
            variant={isActive ? "outline-danger" : "outline-success"} 
            onClick={toggleTimer}
            size="lg"
            className="px-4"
          >
            {isActive ? 'PAUSE' : 'START TIMER'}
          </Button>
          <Button 
            variant="outline-secondary" 
            onClick={resetTimer}
            size="lg"
            className="px-4"
          >
            RESET
          </Button>
        </div>
        
        <div className="d-flex justify-content-center gap-2">
          <Button 
            variant="secondary" 
            onClick={onClose}
            size="lg"
          >
            <FaTimes className="me-2" /> Close
          </Button>
          <Button 
            variant={completed ? "success" : "primary"} 
            onClick={handleComplete}
            size="lg"
            disabled={completed}
          >
            {completed ? 'TASK COMPLETED' : 'MARK AS COMPLETE'}
          </Button>
          <Button 
            variant="info" 
            onClick={onNextTask}
            size="lg"
          >
            NEXT TASK
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
}