import React, { createContext, useReducer, useEffect } from "react";
import { bookReducer } from "../reducers/bookReducer";

export const StoreContext = createContext();

const initialStore = {
  theme: localStorage.getItem("theme")
    ? localStorage.getItem("theme")
    : "#4c2a4c"
};

const StoreContextProvider = props => {
  const [state, dispatch] = useReducer(bookReducer, initialStore);
  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
