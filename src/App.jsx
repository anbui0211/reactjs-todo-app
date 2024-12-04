import { useRef, useState } from "react";
import "./App.css";
import SideBar from "./components/SideBar";
import TodoItem from "./components/TodoItem";

function App() {
  const [todoList, setTodoList] = useState([
    { id: 1, name: "Đi học", isImportant: true, isCompleted: true },
    { id: 2, name: "Đi chơi", isImportant: false, isCompleted: false },
    { id: 3, name: "Đi ngủ", isImportant: true, isCompleted: false },
  ]);

  const [showSidebar, setShowSidebar] = useState(false);

  const [activeTodoItemId, setActiveTodoItemId] = useState();

  const activeTodoItem = todoList.find((todo) => todo.id === activeTodoItemId);

  const handleCompleteCheckboxChange = (todoId) => {
    const newTodoList = todoList.map((todo) => {
      if (todo.id === todoId) {
        return { ...todo, isCompleted: !todo.isCompleted };
      }
      return todo;
    });

    setTodoList(newTodoList);
  };

  const handleShowSidebar = (todoId) => {
    // setShowSidebar(!showSidebar);
    setShowSidebar(true);
    setActiveTodoItemId(todoId);
  };

  const handleTodoItemChange = (newTodo) => {
    const newTodoList = todoList.map((todo) => {
      if (todo.id === newTodo.id) {
        return newTodo;
      }
      return todo;
    });
    setTodoList(newTodoList);
  };

  const todos = todoList.map((todo, index) => {
    return (
      { id: 1, name: "Đi học", isImportant: true, isCompleted: true },
      (
        <TodoItem
          id={todo.id}
          name={todo.name}
          key={todo.id}
          isImportant={todo.isImportant}
          isCompleted={todo.isCompleted}
          handleCompleteCheckboxChange={handleCompleteCheckboxChange}
          handleShowSidebar={handleShowSidebar}
        />
      )
    );
  });

  // Reset value input
  const inputRef = useRef();

  return (
    <div className="container">
      <input
        ref={inputRef}
        className="task-input"
        type="text"
        name="add-new-text"
        placeholder="add new task"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            const value = e.target.value;
            setTodoList([
              ...todoList,
              { id: crypto.randomUUID(), name: value },
            ]);
            // Xóa giá trị của thẻ input
            inputRef.current.value = "";
          }
        }}
      />
      <div>{todos}</div>
      {showSidebar && (
        <SideBar
          // Change key để React thấy thay đổi và re-render lại side bar
          key={activeTodoItemId}
          todoItem={activeTodoItem}
          handleTodoItemChange={handleTodoItemChange}
          setShowSidebar={setShowSidebar}
        />
      )}
    </div>
  );
}

export default App;
