import { useMemo, useRef } from "react";
import "./App.css";
import FilterPanel from "./components/FilterPanel";
import SideBar from "./components/SideBar";
import TodoItem from "./components/TodoItem";
import { useAppContext } from "./hooks/useAppContext";

function App() {
  const {
    selectedCategoryId,
    todoList,
    setTodoList,
    selectedFilterId,
    searchText,
    showSidebar,
    setShowSidebar,
    activeTodoItemId,
    handleCompleteCheckboxChange,
    handleTodoItemClick,
    handleTodoItemChange,
  } = useAppContext();
  const activeTodoItem = todoList.find((todo) => todo.id === activeTodoItemId);

  const filterTodos = useMemo(() => {
    return todoList.filter((todo) => {
      // Search text
      if (!todo.name.includes(searchText)) {
        return false;
      }

      //  Select by category
      if (selectedCategoryId && todo.category !== selectedCategoryId) {
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
  }, [todoList, selectedFilterId, searchText, selectedCategoryId]);

  // Reset value input
  const inputRef = useRef();

  return (
    <div className="container">
      <FilterPanel />
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
                  category: "personal",
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
                handleShowSidebar={handleTodoItemClick}
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
