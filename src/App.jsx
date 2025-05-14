import React, { useEffect, useState } from "react";

// API calls imported here from /services/api file
import { fetchTodos, updateTodo } from "./services/api";
import TodoForm from "./components/TodoForm";
import TodoCard from ".//components/TodoCard";
import "./App.css";

const App = () => {
  const [todos, setTodos] = useState([]);

  // Load todos initially
  useEffect(() => {
    const loadTodos = async () => {
      const fetchedTodos = await fetchTodos();
      setTodos(fetchedTodos);
    };
    loadTodos();
  }, []);

  // Handle adding a new todo
  const handleAddTodo = (todoData) => {
    const newTodo = {
      id: Math.floor(Math.random() * 100), // Random ID for new todo // We can use UUID() or Date.now() also but I think the api supports numbers
      todo: todoData.todo,
      status: "pending", // New todos will be "pending" by default
    };
    // Adding new todo to the existing todo list
    setTodos((prev) => [...prev, newTodo]);
  };

  // Handle moving a todo to a different lane (status)
  const handleStatusChange = (id, newStatus) => {
    const todo = todos.find((t) => t.id === id);
    // If todo is not found or if we are moving todo to its own lane then don't move the todo
    if (!todo || todo.status === newStatus) return;

    // If todo is found then update the status of that todo
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...todo, status: newStatus } : t))
    );
  };

  // Handle deleting a todo
  const handleDeleteTodo = (id) => {
    // Updating todo list
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  // Handle editing a todo using API
  const handleEditTodo = async (id, updatedData) => {
    try {
      // Finding the todo which needs to be edited
      const existingTodo = todos.find((t) => t.id === id);
      // If todo not found then return
      if (!existingTodo) return;

      // passing the updatedData i.e { todo: 'New text' } in this format to the api along with the id
      const updatedTodo = await updateTodo(id, updatedData);

      // Preserve status from the existing todo
      // updatedTodo is the response from the api
      const newTodo = { ...updatedTodo, status: existingTodo.status };

      // Updating todo list
      setTodos((prev) => prev.map((todo) => (todo.id === id ? newTodo : todo)));
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  return (
    <div className="app">
      <h1 className="app-title">Trello Todo Board</h1>

      {/* Add new Todo Form */}
      <TodoForm onAddTodo={handleAddTodo} />

      <div className="lane-container">
        {/* Displaying lanes/columns for each status */}
        {["pending", "in progress", "completed"].map((status) => (
          <div
            key={status}
            className="lane"

            // Allows the drop to happen.
            onDragOver={(e) => e.preventDefault()}

            // This handles what happens when a todo is dropped into a lane.
            onDrop={(e) => {
              const id = e.dataTransfer.getData("id");

              // Passing the id of the dragged todo and the status of the lane where the todo is being dropped
              handleStatusChange(parseInt(id), status);
            }}

          >
            <h2 className="lane-title">{status}</h2>

            {/* Mapping todos to the current status */}
            {todos
              .filter((todo) => todo.status === status)
              .map((todo) => (
                <TodoCard
                  key={todo.id}
                  todo={todo}
                  onDeleteTodo={handleDeleteTodo}
                  onEditTodo={handleEditTodo}
                />
              ))}
              
          </div>
        ))}
      </div>
    </div>
  );

};

export default App;
