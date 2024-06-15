import React, { useState } from 'react';

const TaskInput = ({ addTask, startDate, endDate, taskType }) => {
  const [task, setTask] = useState('');
  const [taskDate, setTaskDate] = useState('');

  const handleAddTask = () => {
    if (task && taskDate) {
      // Format task date
      const formattedTaskDate = formatDate(taskDate);

      // Check date range based on taskType
      if (taskType === 'before') {
        const end = new Date(endDate);
        const taskDateObj = new Date(taskDate);
        if (taskDateObj < end) {
          addTask({ text: task, date: formattedTaskDate }, taskType);
          setTask('');
          setTaskDate('');
        } else {
          alert(`Date must be before ${formatDate(endDate)}`);
        }
      } else if (taskType === 'during') {
        const start = new Date(startDate);
        const end = new Date(endDate);
        const taskDateObj = new Date(taskDate);
        if (taskDateObj >= start && taskDateObj <= end) {
          addTask({ text: task, date: formattedTaskDate }, taskType);
          setTask('');
          setTaskDate('');
        } else {
          alert(`Date must be between ${formatDate(startDate)} and ${formatDate(endDate)}`);
        }
      }
    } else {
      alert('Please enter a task and select a date');
    }
  };

  // Function to format date to "date, month (ex - May)"
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const monthNames = ["January", "February", "March", "April", "May", "June",
                        "July", "August", "September", "October", "November", "December"];
    const month = monthNames[date.getMonth()];
    const formattedDate = `${date.getDate()}, ${month}`;
    return formattedDate;
  };

  return (
    <div className="task-inputs transparent-box">
      <input
        type="text"
        placeholder="Add new task"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        className="task-input"
      />
      <input
        type="date"
        value={taskDate}
        onChange={(e) => setTaskDate(e.target.value)}
        className="task-input"
      />
      <button onClick={handleAddTask}>Add Task</button>
    </div>
  );
};

export default TaskInput;
