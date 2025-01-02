import PropTypes from "prop-types";
import { useState } from "react";
import "./SideBar.css";
import { CATEGORY_ITEMS } from "../constant";

const SideBar = (props) => {
  const data = props.todoItem;
  const [name, setName] = useState(data.name);
  const [isImportant, setIsImportant] = useState(data.isImportant);
  const [isCompleted, setIsCompleted] = useState(data.isCompleted);
  const [category, setCategory] = useState(data.category);

  const handleSave = () => {
    const newTodo = { ...data, name, isImportant, isCompleted, category };
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
        <div className="sb-form-field">
          <label htmlFor="sb-category">Category</label>
          <select
            id="sb-category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {CATEGORY_ITEMS.map((category) => (
              <option key={category.id} value={category.id}>
                {category.label}
              </option>
            ))}
          </select>
        </div>
      </form>
      <div className="sb-footer">
        <button onClick={handleSave}>Save</button>
        <button
          onClick={() => {
            props.setShowSidebar(false);
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

SideBar.propTypes = {
  setShowSidebar: PropTypes.func,
  handleTodoItemChange: PropTypes.func,
  todoItem: {
    name: PropTypes.string,
    isImportant: PropTypes.bool,
    isCompleted: PropTypes.bool,
    category: PropTypes.string,
  },
};

export default SideBar;
