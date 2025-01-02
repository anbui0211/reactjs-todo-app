import { createContext, useState } from "react";

import PropTypes from "prop-types";

export const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [selectedCategoryId, setSelectedCategoryId] = useState();
  const [todoList, setTodoList] = useState([
    {
      id: 1,
      name: "Đi học",
      isImportant: true,
      isCompleted: true,
      isDeleted: false,
      category: "personal",
    },
    {
      id: 2,
      name: "Đi chơi",
      isImportant: false,
      isCompleted: false,
      isDeleted: true,
      category: "personal",
    },
    {
      id: 3,
      name: "Đi ngủ",
      isImportant: true,
      isCompleted: false,
      isDeleted: false,
      category: "travel",
    },
  ]);

  const [selectedFilterId, setSelectedFilterId] = useState("all"); // Filter Panel
  const [searchText, setSearchText] = useState("");
  const [showSidebar, setShowSidebar] = useState(false);
  const [activeTodoItemId, setActiveTodoItemId] = useState();

  const handleCompleteCheckboxChange = (todoId) => {
    const newTodoList = todoList.map((todo) => {
      if (todo.id === todoId) {
        return { ...todo, isCompleted: !todo.isCompleted };
      }
      return todo;
    });

    setTodoList(newTodoList);
  };

  const handleTodoItemClick = (todoId) => {
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

  return (
    <AppContext.Provider
      value={{
        selectedCategoryId,
        setSelectedCategoryId,
        todoList,
        setTodoList,
        selectedFilterId,
        setSelectedFilterId,
        searchText,
        setSearchText,
        showSidebar,
        setShowSidebar,
        activeTodoItemId,
        setActiveTodoItemId,
        handleCompleteCheckboxChange,
        handleTodoItemClick,
        handleTodoItemChange,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

AppProvider.propTypes = {
  children: PropTypes.element,
};

export default AppProvider;
