import { useState, useEffect } from 'react';
import { Button, ProgressBar } from 'react-bootstrap';

export default function PomodoroTimer({ onComplete }) {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [workSessions, setWorkSessions] = useState(0);
  const [totalTime, setTotalTime] = useState(0);

  useEffect(() => {
    let interval;
    if (isActive) {
      interval = setInterval(() => {
        if (seconds === 0) {
          if (minutes === 0) {
            clearInterval(interval);
            setIsActive(false);
            setWorkSessions(prev => prev + 1);
            setTotalTime(prev => prev + 25);
            onComplete(25);
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
  }, [isActive, minutes, seconds, onComplete]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setMinutes(25);
    setSeconds(0);
  };

  return (
    <div className="pomodoro-timer mt-4">
      <h5>Pomodoro Timer</h5>
      <div className="time-display mb-3">
        {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
      </div>
      <ProgressBar 
        now={(minutes * 60 + seconds) / (25 * 60) * 100} 
        className="mb-3"
      />
      <div className="timer-controls">
        <Button variant="success" onClick={toggleTimer} className="me-2">
          {isActive ? 'Pause' : 'Start'}
        </Button>
        <Button variant="danger" onClick={resetTimer}>
          Reset
        </Button>
      </div>
      <div className="stats mt-3">
        <p>Sessions Completed: {workSessions}</p>
        <p>Total Focus Time: {totalTime} minutes</p>
      </div>
    </div>
  );
}