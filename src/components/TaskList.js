import React from 'react';
import Task from './Task'; // Import Task component

const TaskList = ({ tasks, updateTask, deleteTask, taskType }) => {
  const handleUpdateTask = (id, updatedTask) => {
    updateTask(id, updatedTask, taskType);
  };

  return (
    <ul>
      {tasks.map((task) => (
        <Task
          key={task.id}
          task={task}
          updateTask={handleUpdateTask}
          deleteTask={deleteTask}
          taskType={taskType}
        />
      ))}
    </ul>
  );
};

export default TaskList;
