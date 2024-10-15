import React, { useState } from 'react';
import './App.css';

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editedTaskText, setEditedTaskText] = useState('');

  // Add new task
  const addTask = () => {
    if (newTask.trim()) {
      const newTaskObj = {
        id: tasks.length + 1,
        text: newTask,
        completed: false,
      };
      setTasks([...tasks, newTaskObj]);
      setNewTask('');
    }
  };

  // Delete task
  const deleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  // Start editing task
  const startEditing = (task) => {
    setEditingTaskId(task.id);
    setEditedTaskText(task.text);
  };

  // Update task
  const updateTask = () => {
    if (editedTaskText.trim()) {
      const updatedTasks = tasks.map((task) =>
        task.id === editingTaskId ? { ...task, text: editedTaskText } : task
      );
      setTasks(updatedTasks);
      setEditingTaskId(null); // Reset editing state
      setEditedTaskText(''); // Clear edited text
    }
  };

  // Cancel editing
  const cancelEditing = () => {
    setEditingTaskId(null);
    setEditedTaskText('');
  };

  // Toggle task completion
  const toggleComplete = (taskId) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  return (
    <div className="app-wrapper">
      {/* Navigation bar */}
      <header>
        <nav className="navbar">
          <h1 className="nav-title">To Do Web</h1>
        </nav>
      </header>

      {/* Centered Todo Box */}
      <div className="todo-wrapper">
        <h2 className='heading'>
          My Todo-s
        </h2>
        {/* Add New Task */}
        <div className="add-task">
          <input
            type="text"
            placeholder="Add new..."
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
          />
          <button onClick={addTask}>ADD</button>
        </div>

        {/* Task List */}
        <ul className="task-list">
          {tasks.map((task) => (
            <li key={task.id} className="task-item">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleComplete(task.id)}
              />

              {editingTaskId === task.id ? (
                <input
                  type="text"
                  value={editedTaskText}
                  onChange={(e) => setEditedTaskText(e.target.value)}
                  onBlur={updateTask} // Automatically save on blur
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') updateTask(); // Save on Enter
                  }}
                />
              ) : (
                <span className={task.completed ? 'task-completed' : ''}>
                  {task.text}
                </span>
              )}

              {/* Edit and Delete Buttons */}
              <div className="task-icons">
                {editingTaskId === task.id ? (
                  <span
                    className="cancel-icon"
                    onClick={cancelEditing}
                    role="button"
                    tabIndex={0}
                  >
                    &#10006; {/* Cancel Icon */}
                  </span>
                ) : (
                  <span
                    className="edit-icon"
                    onClick={() => startEditing(task)}
                    role="button"
                    tabIndex={0}
                  >
                    &#9998; {/* Edit Icon */}
                  </span>
                )}

                <span
                  className="delete-icon"
                  onClick={() => deleteTask(task.id)}
                  role="button"
                  tabIndex={0}
                >
                  &#10060; {/* Delete Icon */}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TodoList;