import React from 'react';
import { ListGroup, Badge, Button } from 'react-bootstrap';
import { FaTrash, FaCheck } from 'react-icons/fa';

export default function TaskList({ events, onTaskClick, onDeleteTask, onCompleteTask }) {
  const incompleteTasks = events.filter(task => !task.completed);
  
  if (incompleteTasks.length === 0) {
    return (
      <div className="mt-4">
        <h5 className="text-primary mb-3">Tasks</h5>
        <div className="text-center p-4 bg-light rounded-xl">
          <p className="text-muted mb-0">All tasks completed! 🎉</p>
          <p className="text-muted">Add new tasks or enjoy your free time.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-4">
      <h5 className="text-primary mb-3">Tasks ({incompleteTasks.length})</h5>
      <ListGroup>
        {incompleteTasks.map(task => (
          <ListGroup.Item 
            key={task.id} 
            className="d-flex justify-content-between align-items-center position-relative p-3 mb-2 rounded-xl border-0 shadow-sm"
            style={{
              zIndex: 1,
              overflow: 'hidden',
              borderLeft: `4px solid ${task.bgColor}`,
              background: 'white'
            }}
          >
            <div 
              className="d-flex align-items-center flex-grow-1" 
              style={{ cursor: 'pointer' }}
              onClick={() => onTaskClick(task)}
            >
              <span className="badge me-3" style={{ 
                backgroundColor: task.bgColor,
                color: task.color === 'warning' ? '#000' : '#fff',
                minWidth: '80px'
              }}>
                {task.category === 'Miscellaneous' ? '📦 Misc' : task.category}
              </span>
              <span className="task-title fw-medium">{task.title}</span>
            </div>
            
            <div className="d-flex align-items-center">
              {task.timeSpent > 0 && (
                <Badge 
                  bg="info" 
                  className="position-relative me-2 rounded-pill px-3 py-2" 
                  style={{ zIndex: 2 }}
                >
                  {task.timeSpent} min
                </Badge>
              )}
              
              <Button 
                variant="outline-success" 
                className="btn-sm rounded-circle p-1 me-1"
                onClick={(e) => {
                  e.stopPropagation();
                  onCompleteTask(task.id);
                }}
                title="Mark Complete"
              >
                <FaCheck size={12} />
              </Button>
              
              <Button 
                variant="outline-danger" 
                className="btn-sm rounded-circle p-1"
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteTask(task.id);
                }}
                title="Delete Task"
              >
                <FaTrash size={12} />
              </Button>
            </div>
            
            {/* Progress indicator bar */}
            {task.timeSpent > 0 && !task.completed && (
              <div 
                className="position-absolute bottom-0 start-0"
                style={{
                  height: '3px',
                  width: `${Math.min(100, (task.timeSpent / 25) * 100)}%`,
                  backgroundColor: task.bgColor,
                  transition: 'width 0.3s ease',
                  zIndex: 0
                }}
              ></div>
            )}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
    
  );
}