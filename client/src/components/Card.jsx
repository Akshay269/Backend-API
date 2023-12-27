import React, { useState } from 'react';
import TodoForm from './TodoForm';
import TodoList from './TodoList';

const Card = () => {
  const [todos, setTodos] = useState([]);

  const addTodo = (newTodo) => {
    setTodos([...todos, newTodo]);
  };

  const editTodo = (index, updatedTodo) => {
    const updatedTodos = [...todos];
    updatedTodos[index] = updatedTodo;
    setTodos(updatedTodos);
  };

  const deleteTodo = (index) => {
    const updatedTodos = [...todos];
    updatedTodos.splice(index, 1);
    setTodos(updatedTodos);
  };

  const reorderTodos = (startIndex, endIndex) => {
    const updatedTodos = [...todos];
    const [reorderedItem] = updatedTodos.splice(startIndex, 1);
    updatedTodos.splice(endIndex, 0, reorderedItem);
    setTodos(updatedTodos);
  };

  return (
    <div className="card-container">
    <h1>Todo App</h1>
    <TodoForm addTodo={addTodo} />
    <TodoList
      todos={todos}
      editTodo={editTodo}
      deleteTodo={deleteTodo}
      reorderTodos={reorderTodos}
    />
  </div>
  );
};

export default Card;
