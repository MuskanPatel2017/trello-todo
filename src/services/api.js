// API service for interacting with DummyJSON Todos API

const BASE = "https://dummyjson.com/todos";

// Fetch todos from the API
// We will fetch first 10 todos and maps completed field to a status
export async function fetchTodos() {
  const res = await fetch(`${BASE}`);
  const data = await res.json();
  return data.todos.slice(0, 10).map((todo) => ({
    ...todo,
    // Adding status key in each todo
    // Be defauly if completed is false then pending status will be there
    status: todo.completed ? "completed" : "pending",
  }));
}

// Update a todo with given ID and update data
// Returns the updated todo with correct status
export async function updateTodo(id, updates) {
  const res = await fetch(`${BASE}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    // Converting object into JSON object for API 
    body: JSON.stringify(updates),
  });
  const updated = await res.json();
  return {
    ...updated,
    status: updated.completed ? "completed" : updates.status,
  };
}
