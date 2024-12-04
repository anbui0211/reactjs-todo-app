import React, { useState } from "react";
import "./SideBar.css";
const SideBar = (props) => {
  const data = props.todoItem;
  const [name, setName] = useState(data.name);
  const [isImportant, setIsImportant] = useState(data.isImportant);
  const [isCompleted, setIsCompleted] = useState(data.isCompleted);

  const handleSave = () => {
    const newTodo = { ...data, name, isImportant, isCompleted };
    props.handleTodoItemChange(newTodo);
    props.setShowSidebar(false);
  };

  return (
    <div className="sidebar">
      <form className="sb-form">
        <div className="sb-form-field">
          <label htmlFor="sb-name">TodoName</label>
          <input
            id="sb-name"
            name="name"
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              // props.handleTodoChangeName(data.id, e.target.value);
            }}
          />
        </div>
        <div className="sb-form-field">
          <label htmlFor="sb-important">Is Important?</label>
          <input
            id="sb-important"
            name="isImportant"
            type="checkbox"
            checked={isImportant}
            onChange={() => {
              setIsImportant(!isImportant);
            }}
          />
        </div>
        <div className="sb-form-field">
          <label htmlFor="sb-completed">Completed</label>
          <input
            id="sb-completed"
            name="isCompleted"
            type="checkbox"
            checked={isCompleted}
            onChange={() => {
              setIsCompleted(!isCompleted);
            }}
          />
        </div>
      </form>
      <div className="sb-footer">
        <button onClick={handleSave}>Save</button>
        <button
          onAbort={() => {
            props.setShowSidebar(false);
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default SideBar;
