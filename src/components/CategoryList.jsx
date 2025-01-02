import { useMemo } from "react";
import { CATEGORY_ITEMS } from "../constant";
import { useAppContext } from "../hooks/useAppContext";
import "./CategoryList.css";

const CategoryList = () => {
  const { selectedCategoryId, setSelectedCategoryId, todoList } =
    useAppContext();

  /**
   * {
   *  personal: 3.
   *  company: 2
   * }
   */
  const countByCategory = useMemo(() => {
    return todoList.reduce(
      (acc, cur) => ({ ...acc, [cur.category]: acc[cur.category] + 1 }),
      {
        personal: 0,
        company: 1,
        travel: 0,
        ideal: 0,
      }
    );
  }, [todoList]);

  return (
    <div>
      <p>Categories</p>
      <div>
        {CATEGORY_ITEMS.map((category) => (
          <div
            key={category.id}
            className={`category-item ${
              category.id === selectedCategoryId ? "selected" : ""
            }`}
            onClick={() => {
              setSelectedCategoryId(category.id);
            }}
          >
            <p className="category-name">{category.label}</p>
            <p>{countByCategory[category.id]}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

CategoryList.propTypes = {};

export default CategoryList;
