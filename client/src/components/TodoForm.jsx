import React, { useState } from 'react';
import Colorpicker from './Colorpicker'

const TodoForm = ({ addTodo }) => {
  const [task, setTask] = useState('');
  const [color, setColor] = useState('#ffffff');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (task.trim() === '') return;
    addTodo({
      task,
      color,
      completed: false,
    });
    setTask('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Type a new task..."
      />
      <Colorpicker color={color} setColor={setColor} />
      <button type="submit">Add Task</button>
    </form>
  );
};

export default TodoForm;