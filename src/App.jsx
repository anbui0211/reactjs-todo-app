import { useMemo, useRef, useState } from "react";
import "./App.css";
import FilterPanel from "./components/FilterPanel";
import SideBar from "./components/SideBar";
import TodoItem from "./components/TodoItem";

function App() {
  const [todoList, setTodoList] = useState([
    {
      id: 1,
      name: "Đi học",
      isImportant: true,
      isCompleted: true,
      isDeleted: false,
    },
    {
      id: 2,
      name: "Đi chơi",
      isImportant: false,
      isCompleted: false,
      isDeleted: true,
    },
    {
      id: 3,
      name: "Đi ngủ",
      isImportant: true,
      isCompleted: false,
      isDeleted: false,
    },
  ]);

  const [showSidebar, setShowSidebar] = useState(false);
  const [activeTodoItemId, setActiveTodoItemId] = useState();
  // Filter Panel
  const [selectedFilterId, setSelectedFilterId] = useState("all");
  const activeTodoItem = todoList.find((todo) => todo.id === activeTodoItemId);
  const [searchText, setSearchText] = useState("");

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

  // Change values todo in sidebar
  const handleTodoItemChange = (newTodo) => {
    const newTodoList = todoList.map((todo) => {
      if (todo.id === newTodo.id) {
        return newTodo;
      }
      return todo;
    });
    setTodoList(newTodoList);
  };

  const filterTodos = useMemo(() => {
    return todoList.filter((todo) => {
      if (!todo.name.includes(searchText)) {
        return false;
      }

      switch (selectedFilterId) {
        case "all":
          return true;
        case "important":
          return todo.isImportant;
        case "completed":
          return todo.isCompleted;
        case "deleted":
          return todo.isDeleted;
        default:
          return true;
      }
    });
  }, [todoList, selectedFilterId, searchText]);

  // Reset value input
  const inputRef = useRef();

  return (
    <div className="container">
      <FilterPanel
        selectedFilterId={selectedFilterId}
        setSelectedFilterId={setSelectedFilterId}
        todoList={todoList}
        searchText={searchText}
        setSearchText={setSearchText}
      />
      <div className="main-container">
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
                {
                  id: crypto.randomUUID(),
                  name: value,
                  isCompleted: false,
                  isImportant: false,
                  isDelete: false,
                },
              ]);
              // Xóa giá trị của thẻ input
              inputRef.current.value = "";
            }
          }}
        />
        <div>
          {filterTodos.map((todo) => {
            return (
              <TodoItem
                id={todo.id}
                name={todo.name}
                key={todo.id}
                isImportant={todo.isImportant}
                isCompleted={todo.isCompleted}
                handleCompleteCheckboxChange={handleCompleteCheckboxChange}
                handleShowSidebar={handleShowSidebar}
              />
            );
          })}
        </div>
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
    </div>
  );
}

export default App;
