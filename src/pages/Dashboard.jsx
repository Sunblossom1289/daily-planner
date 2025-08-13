import React, { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import CalendarView from '../components/Calendar/CalendarView';
import SidebarLayout from '../components/Sidebar/SidebarLayout';
import CategoryView from '../components/Sidebar/CategoryView';
import FocusModal from '../components/Pomodoro/FocusModal';
import { useAuth } from '../context/AuthContext';
import { initialCategories } from '../utils/constants';

export default function Dashboard() {
  const { currentUser } = useAuth();
  const [events, setEvents] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showCategoryView, setShowCategoryView] = useState(false);
  const [activeTask, setActiveTask] = useState(null);
  const [nextTask, setNextTask] = useState(null);

  // Load events from localStorage when user logs in
  useEffect(() => {
    if (currentUser) {
      const userEvents = localStorage.getItem(`plannerEvents_${currentUser.uid}`);
      if (userEvents) {
        setEvents(JSON.parse(userEvents));
      }
    }
  }, [currentUser]);

  // Save events to localStorage whenever they change
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(`plannerEvents_${currentUser.uid}`, JSON.stringify(events));
      
      // Find next incomplete task
      const incomplete = events.filter(e => !e.completed);
      setNextTask(incomplete.length > 0 ? incomplete[0] : null);
    }
  }, [events, currentUser]);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setShowCategoryView(true);
  };

  const handleSaveEvent = (newEvent) => {
    const updatedEvents = [...events, { 
      ...newEvent, 
      id: Date.now(),
      completed: false,
      timeSpent: newEvent.timeSpent || 0
    }];
    setEvents(updatedEvents);
  };

  const handleQuickAdd = (newEvent) => {
    const updatedEvents = [...events, { 
      ...newEvent, 
      id: Date.now(),
      completed: false,
      timeSpent: 0
    }];
    setEvents(updatedEvents);
  };

  const handleTaskClick = (task) => {
    setActiveTask(task);
  };

  const handleTimeTrack = (taskId, minutes) => {
    const updatedEvents = events.map(event => 
      event.id === taskId 
        ? { ...event, timeSpent: (event.timeSpent || 0) + minutes } 
        : event
    );
    setEvents(updatedEvents);
  };

  const handleCompleteTask = (taskId) => {
    const updatedEvents = events.map(event => 
      event.id === taskId 
        ? { ...event, completed: true } 
        : event
    );
    setEvents(updatedEvents);
  };

  const handleDeleteTask = (taskId) => {
    const updatedEvents = events.filter(event => event.id !== taskId);
    setEvents(updatedEvents);
  };

  const markTaskComplete = (taskId) => {
    const updatedEvents = events.map(event => 
      event.id === taskId 
        ? { ...event, completed: true } 
        : event
    );
    setEvents(updatedEvents);
    
    // Find next incomplete task
    const incomplete = updatedEvents.filter(e => !e.completed);
    setNextTask(incomplete.length > 0 ? incomplete[0] : null);
  };

  const handleCloseModal = () => {
    setActiveTask(null);
  };

  return (
    <div className="dashboard-container py-4">
      <Row className="g-4">
        <Col lg={4} className="sidebar-container">
          <SidebarLayout 
            events={events} 
            onCategorySelect={handleCategorySelect}
            onAddEvent={handleQuickAdd}
            onTaskClick={handleTaskClick}
            onDeleteTask={handleDeleteTask}
            onCompleteTask={handleCompleteTask}
          />
        </Col>
        <Col lg={8}>
          <CalendarView 
            events={events} 
            onTaskClick={handleTaskClick} 
            onDeleteTask={handleDeleteTask}
          />
        </Col>
      </Row>

      {selectedCategory && (
        <CategoryView
          category={selectedCategory}
          show={showCategoryView}
          onHide={() => setShowCategoryView(false)}
          onSave={handleSaveEvent}
        />
      )}

      {activeTask && (
        <FocusModal 
          task={activeTask}
          onClose={handleCloseModal}
          onTimeTrack={(minutes) => handleTimeTrack(activeTask.id, minutes)}
          onComplete={() => markTaskComplete(activeTask.id)}
          onNextTask={() => {
            if (nextTask) {
              setActiveTask(nextTask);
            } else {
              handleCloseModal();
            }
          }}
        />
      )}
    </div>
  );
}