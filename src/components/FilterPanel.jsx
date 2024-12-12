import PropTypes from "prop-types";
import { useMemo } from "react";
import "./FilterPanel.css";
import CategoryList from "./CategoryList";

const FILTERS_ITEM = [
  { id: "all", label: "All", iconPath: "/inbox.png" },
  { id: "important", label: "Important", iconPath: "/flag.png" },
  { id: "completed", label: "Completed", iconPath: "/check.png" },
  { id: "deleted", label: "Deteled", iconPath: "/delete.png" },
];

const FilterPanel = ({
  selectedFilterId,
  setSelectedFilterId,
  todoList,
  searchText,
  setSearchText,
}) => {
  const countByFilterType = useMemo(() => {
    return todoList.reduce(
      (acc, cur) => {
        let newAcc = { ...acc };
        if (cur.isCompleted) {
          newAcc = { ...newAcc, completed: newAcc.completed + 1 };
        }
        if (cur.isImportant) {
          newAcc = { ...newAcc, important: newAcc.important + 1 };
        }
        if (cur.isDeleted) {
          newAcc = { ...newAcc, deleted: newAcc.deleted + 1 };
        }
        return newAcc;
      },
      {
        all: todoList.length,
        important: 0,
        completed: 0,
        deleted: 0,
      }
    );
  }, [todoList]);

  return (
    <div className="filter-panel">
      <div>FilterPanel</div>
      <input
        name="search-text"
        placeholder="search"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
      <div className="filter-container">
        {FILTERS_ITEM.map((filterItem) => (
          <div
            className={`filter-item ${
              filterItem.id === selectedFilterId ? "selected" : ""
            }`}
            onClick={() => {
              setSelectedFilterId(filterItem.id);
            }}
            key={filterItem.id}
          >
            <div className="filter-name">
              <img src={filterItem.iconPath} />
              <p>{filterItem.label}</p>
            </div>
            <p>{countByFilterType[filterItem.id]}</p>
          </div>
        ))}
      </div>
      <CategoryList />
    </div>
  );
};

FilterPanel.propTypes = {
  selectedFilterId: PropTypes.string,
  setSelectedFilterId: PropTypes.func,
  searchText: PropTypes.string,
  setSearchText: PropTypes.func,
  todoList: PropTypes.array,
};

export default FilterPanel;
