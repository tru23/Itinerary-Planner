import React, { useState } from 'react';
import TaskInput from './components/TaskInput';
import TaskList from './components/TaskList';
import TravelInfoInput from './components/TravelInfoInput';
import './App.css';

const App = () => {
  const [beforeTravelTasks, setBeforeTravelTasks] = useState([]);
  const [duringTravelTasks, setDuringTravelTasks] = useState([]);
  const [travelInfo, setTravelInfo] = useState(null);
  const [currentPage, setCurrentPage] = useState('home');

  // Function to add a new task
  const addTask = (task, taskType) => {
    if (taskType === 'before') {
      setBeforeTravelTasks([...beforeTravelTasks, { ...task, id: Date.now() }]);
    } else if (taskType === 'during') {
      setDuringTravelTasks([...duringTravelTasks, { ...task, id: Date.now() }]);
    }
  };

  // Function to update an existing task
  const updateTask = (id, updatedTask, taskType) => {
    if (taskType === 'before') {
      setBeforeTravelTasks(
        beforeTravelTasks.map(task => (task.id === id ? { ...task, ...updatedTask } : task))
      );
    } else if (taskType === 'during') {
      setDuringTravelTasks(
        duringTravelTasks.map(task => (task.id === id ? { ...task, ...updatedTask } : task))
      );
    }
  };

  // Function to delete a task
  const deleteTask = (id, taskType) => {
    if (taskType === 'before') {
      setBeforeTravelTasks(beforeTravelTasks.filter(task => task.id !== id));
    } else if (taskType === 'during') {
      setDuringTravelTasks(duringTravelTasks.filter(task => task.id !== id));
    }
  };

  // Function to handle setting travel information
  const handleSetTravelInfo = info => {
    setTravelInfo(info);
    setCurrentPage('planner');
  };

  // Function to handle navigating back to home page
  const handleGoHome = () => {
    setCurrentPage('home');
  };

  // Function to format date to "date, month (ex - May)"
  const formatDate = dateStr => {
    const date = new Date(dateStr);
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    const month = monthNames[date.getMonth()];
    const formattedDate = `${date.getDate()} ${month}`;
    return formattedDate;
  };

  return (
    <div className="App">
      <nav>
        <span className="brand">My Trip Mates</span>
      </nav>
      <div className="content">
        {currentPage === 'home' && (
          <div className="home-page">
            <h1>Welcome to Itinerary Planner</h1>
            <TravelInfoInput setTravelInfo={handleSetTravelInfo} />
          </div>
        )}
        {currentPage === 'planner' && (
          <div className="planner-page">
            <div className="planner-content">
              <div className="left-column transparent-box">
                <h1>Itinerary Planner</h1>
                {travelInfo && (
                  <>
                    <h2>Destination: {travelInfo.destination}</h2>
                    <h3>Travel Dates: {formatDate(travelInfo.startDate)} to {formatDate(travelInfo.endDate)}</h3>

                    <h3>Before Traveling</h3>
                    <TaskInput addTask={addTask} startDate={null} endDate={travelInfo.startDate} taskType="before" />
                    <div className="task-list">
                      <TaskList tasks={beforeTravelTasks} updateTask={updateTask} deleteTask={deleteTask} taskType="before" />
                    </div>

                    <h3>During Travel</h3>
                    <TaskInput addTask={addTask} startDate={travelInfo.startDate} endDate={travelInfo.endDate} taskType="during" />
                    <div className="task-list">
                      <TaskList tasks={duringTravelTasks} updateTask={updateTask} deleteTask={deleteTask} taskType="during" />
                    </div>
                  </>
                )}
                <button onClick={handleGoHome}>Back to Home</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
