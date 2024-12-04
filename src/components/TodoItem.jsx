import React from "react";

const TodoItem = (props) => {
  return (
    <div
      className="todo-item"
      onClick={() => {
        props.handleShowSidebar(props.id);
      }}
    >
      <div style={{ display: "flex", gap: "4px" }}>
        <input
          type="checkbox"
          checked={props.isCompleted}
          onChange={() => {
            props.handleCompleteCheckboxChange(props.id);
          }}
          onClick={(e) => {
            // lan truyền sự kiện (event propagation)
            // Ngăn chặn việc khi checked checkbox sẽ kick hoạt sidebar
            e.stopPropagation();
          }}
        />
        <p className="todo-item-text">{props.name}</p>
      </div>
      {props.isImportant && <p>⭐️</p>}
    </div>
  );
};

export default TodoItem;
