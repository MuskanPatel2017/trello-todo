// STEPS TO RUN LOCALLY

1. CLONE THE REPO
2. INSIDE THE REPO RUN THIS COMMAND - npm install
3. AFTER THIS RUN THIS COMMAND - npm run dev




PROJECT APPROACH

The app is a Kanban-style Todo Board with three lanes: pending, in progress, and completed. Here's how the key parts work:

1. State Management
todos are stored in the React state via useState.
Todos are loaded initially using an API call (fetchTodos) inside a useEffect.

2. Add, Edit, Delete Todos
Add: New todos are created on the client-side only (no API call). A random ID is assigned.
Edit: Edit is done using the existing TodoForm. When editing, only the updateTodo API is called, and the updated todo from the API response replaces the old one.
Delete: Done entirely on the client side by filtering out the todo from the state.

3. Drag-and-Drop Functionality
Each TodoCard is draggable.
Each Lane is a drop target. When a card is dropped:
The card's ID is retrieved from the drag event.
handleStatusChange updates the status client-side only (no API call).

4. Component Structure
App.jsx: Manages state and business logic.
TodoForm.jsx: Handles both creation and editing of todos.
Lane.jsx: Represents each status column.
TodoCard.jsx: Represents individual todo items, with options to edit or delete.

5. API Usage
Only used for updating a todo (updateTodo).
Fetching all todos happens on initial load via fetchTodos.

6. Styling & Responsiveness
CSS is used to style the layout and ensure responsiveness for smaller devices.



TRADE-OFFS IN THE CURRENT APPROACH

1. Client-Side Add/Delete Only
Trade-off: These actions are fast and reduce server load.
Risk: On page refresh, added or deleted todos will be lost unless synced with a backend.
Use-case Limitation: Not suitable for multi-user or persistent applications.

2. Only Update Uses API
Trade-off: Reduces network usage.
Issue: Partial sync with backend might cause inconsistency — server doesn't know about new or deleted todos.

3. Drag-and-Drop Without API Sync
Trade-off: It feels fast and smooth.
Risk: Changes in status are not persisted. If the app is reloaded, todos will revert to original statuses.

4. Random ID for New Todos
Trade-off: Easy to implement.
Risk: Potential for ID collisions, especially with a small random range.


POTENTIAL IMPROVEMENTS

1. Persist Add/Delete via API
Implement addTodo and deleteTodo APIs.
Benefit: All data stays consistent and persistent.

2. Persist Status Changes via API
Call updateTodo when a todo is moved between lanes.
Benefit: State changes are not lost on refresh 

3. Better Unique ID Generation
Use a library like uuid instead of Math.random() to avoid collisions.

4. Validation in TodoForm
Prevent empty todo fields, trim input, etc.
Benefit: Avoids junk data.

5. Accessibility & UX Enhancements
Add keyboard support for drag-and-drop.
Add loading indicators, error messages, and success toasts.

6. State Management
All the logic is present in App.jsx which passed to TodoCard.jsx using props.
Add redux to avoid this data passing with props.
