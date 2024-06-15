import React, { useState } from 'react';

const Task = ({ task, updateTask, deleteTask, taskType }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState(task.text);
  const [editedDate, setEditedDate] = useState(task.date);

  const handleUpdate = () => {
    updateTask(task.id, { ...task, text: editedTask, date: editedDate }, taskType);
    setIsEditing(false);
  };

  return (
    <li>
      {isEditing ? (
        <>
          <input
            type="text"
            value={editedTask}
            onChange={(e) => setEditedTask(e.target.value)}
          />
          <input
            type="date"
            value={editedDate}
            onChange={(e) => setEditedDate(e.target.value)}
          />
          <button onClick={handleUpdate}>Save</button>
        </>
      ) : (
        <>
          <span>{task.text} - {task.date}</span>
          <button onClick={() => setIsEditing(true)}>Edit</button>
          <button onClick={() => deleteTask(task.id, taskType)}>Delete</button>
        </>
      )}
    </li>
  );
};

export default Task;
