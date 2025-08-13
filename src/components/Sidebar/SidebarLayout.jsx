import { Button } from 'react-bootstrap';
import Categories from './Categories';
import DailyReport from './DailyReport';
import QuickAdd from './QuickAdd';
import TaskList from './TaskList';
import { useState } from 'react';

export default function SidebarLayout({ 
  events, 
  onCategorySelect, 
  onAddEvent,
  onTaskClick,
  onDeleteTask,
  onCompleteTask  // Add this prop
}) {
  const [showReport, setShowReport] = useState(false);

  return (
    <div className="sidebar">
      <QuickAdd onAdd={onAddEvent} />
      
      <Categories 
        events={events} 
        onCategorySelect={onCategorySelect} 
      />
      
      <TaskList 
        events={events} 
        onTaskClick={onTaskClick}
        onDeleteTask={onDeleteTask}
        onCompleteTask={onCompleteTask}  // Pass to TaskList
      />
      
      <Button 
        variant="info" 
        className="mt-3 w-100"
        onClick={() => setShowReport(true)}
      >
        View Daily Report
      </Button>

      <DailyReport
        show={showReport}
        onHide={() => setShowReport(false)}
        events={events}
      />
    </div>
  );
}