import React, { useState, useEffect } from "react";
import "./todo.css";

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    const storageTodos = JSON.parse(localStorage.getItem("todos"));
    if (storageTodos) {
      setTodos(storageTodos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = (e) => {
    e.preventDefault();
    if (newTodo.trim() === "") return;
    setTodos([...todos, { id: Date.now(), title: newTodo, completed: false }]);
    setNewTodo("");
  };

  const toggleCompleted = (id) => {
    const newTodos = [...todos];
    const todo = newTodos.find((todo) => todo.id === id);
    todo.completed = !todo.completed;
    setTodos(newTodos);
  };

  const editTodo = (id, title) => {
    const newTodos = [...todos];
    const todo = newTodos.find((todo) => todo.id === id);
    todo.title = title;
    setTodos(newTodos);
  };

  const removeCompleted = () => {
    const newTodos = todos.filter((todo) => !todo.completed);
    setTodos(newTodos);
  };

  return (
    <div className="todo-list-container">
      <form onSubmit={addTodo}>
        <input
          type="text"
          placeholder="Add Todo"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />{" "}
        <button type="submit"> Add </button>{" "}
      </form>{" "}
      <div className="todo-list">
        {" "}
        {todos.map((todo) => (
          <div
            key={todo.id}
            className={todo.completed ? "todo-item completed" : "todo-item"}
          >
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleCompleted(todo.id)}
            />{" "}
            <div
              className="todo-title"
              onDoubleClick={() => {
                if (!todo.completed) document.getElementById(todo.id).focus();
              }}
            >
              {" "}
              {todo.completed ? <del> {todo.title} </del> : todo.title}{" "}
            </div>{" "}
            <input
              type="text"
              id={todo.id}
              className="edit-todo"
              defaultValue={todo.title}
              onBlur={(e) => editTodo(todo.id, e.target.value)}
            />{" "}
          </div>
        ))}{" "}
      </div>{" "}
      <button className="clear-btn" onClick={removeCompleted}>
        {" "}
        Clear Completed{" "}
      </button>{" "}
    </div>
  );
}

export default TodoList;
