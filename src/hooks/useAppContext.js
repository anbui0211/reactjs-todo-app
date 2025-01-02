import { useContext } from "react";
import { AppContext } from "../context/AppProvider";

// Custom hook
export const useAppContext = () => {
  return useContext(AppContext);
};
