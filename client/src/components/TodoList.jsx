import React from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

const TodoList = ({ todos, editTodo, deleteTodo, reorderTodos }) => {
  const handleEdit = (index, updatedTodo) => {
    editTodo(index, updatedTodo);
  };

  const handleDelete = (index) => {
    deleteTodo(index);
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    reorderTodos(result.source.index, result.destination.index);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="todos">
        {(provided) => (
          <ul {...provided.droppableProps} ref={provided.innerRef}>
            {todos.map((todo, index) => (
              <Draggable key={index} draggableId={todo-{index}} index={index}>
                {(provided) => (
                  <li
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <div>
                      <span style={{ color: todos.color }}>{todo.task}</span>
                      <button onClick={() => handleEdit(index, { ...todos, completed: true })}>
                        Mark Complete
                      </button>
                      <button onClick={() => handleEdit(index, { ...todos, completed: false })}>
                        Mark Incomplete
                      </button>
                      <button onClick={() => handleDelete(index)}>Delete</button>
                    </div>
                  </li>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default TodoList;