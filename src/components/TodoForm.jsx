// src/components/TodoForm.jsx
import React, { useState } from "react";

const TodoForm = ({ onAddTodo }) => {
  const [title, setTitle] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title) return; // Avoid empty todos

    const newTodo = {
      userId: Math.floor(Math.random() * 100),  // Adding ID
      todo: title,
      status: "pending", // New todos will be "pending" by default
    };

    onAddTodo(newTodo);

    setTitle("");
  };

  return (
    <form onSubmit={handleSubmit} className="todo-form">
      <input
        type="text"
        className="input-field"
        placeholder="Todo Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <button type="submit" className="button button-add">Add Todo</button>
    </form>
  );
};

export default TodoForm;
