import { useState, useEffect } from 'react';
import { Button, ProgressBar, Card } from 'react-bootstrap';

export default function FloatingTimer({ task, onClose, onTimeTrack }) {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [workSessions, setWorkSessions] = useState(0);
  const [timeSpent, setTimeSpent] = useState(0);

  useEffect(() => {
    let interval;
    if (isActive) {
      interval = setInterval(() => {
        if (seconds === 0) {
          if (minutes === 0) {
            clearInterval(interval);
            setIsActive(false);
            setWorkSessions(prev => prev + 1);
            setTimeSpent(prev => prev + 25);
            onTimeTrack(25);
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
  }, [isActive, minutes, seconds, onTimeTrack]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setMinutes(25);
    setSeconds(0);
  };

  const completeTask = () => {
    onTimeTrack(timeSpent);
    onClose();
  };

  return (
    <Card className="floating-timer shadow-lg">
      <Card.Header className="d-flex justify-content-between align-items-center">
        <div>
          <span className="badge me-2" style={{ 
            backgroundColor: task.bgColor,
            color: task.color === 'warning' ? '#000' : '#fff'
          }}>
            {task.category}
          </span>
          <strong>{task.title}</strong>
        </div>
        <Button variant="link" onClick={onClose} className="p-0">
          ×
        </Button>
      </Card.Header>
      <Card.Body>
        <div className="d-flex align-items-center mb-3">
          <div className="time-display me-3">
            {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
          </div>
          <div className="flex-grow-1">
            <ProgressBar 
              now={(minutes * 60 + seconds) / (25 * 60) * 100} 
              variant={isActive ? "success" : "secondary"}
            />
          </div>
        </div>
        
        <div className="d-flex gap-2 mb-3">
          <Button 
            variant={isActive ? "outline-danger" : "outline-success"} 
            onClick={toggleTimer}
            className="flex-grow-1"
          >
            {isActive ? 'Pause' : 'Start'}
          </Button>
          <Button variant="outline-secondary" onClick={resetTimer} className="flex-grow-1">
            Reset
          </Button>
        </div>
        
        <div className="d-flex justify-content-between">
          <span>Sessions: {workSessions}</span>
          <span>Time Spent: {timeSpent} min</span>
        </div>
      </Card.Body>
      <Card.Footer className="d-flex justify-content-end">
        <Button 
          variant="success" 
          onClick={completeTask}
          disabled={!task.completed && timeSpent === 0}
        >
          {task.completed ? 'Task Completed' : 'Mark Complete'}
        </Button>
      </Card.Footer>
    </Card>
  );
}