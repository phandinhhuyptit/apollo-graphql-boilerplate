import React, { createContext, useReducer, useEffect } from "react";
import { storeReducer } from "../reducers/storeReducer";

export const StoreContext = createContext();

const initialStore = {
  theme: localStorage.getItem("theme")
    ? localStorage.getItem("theme")
    : "#4c2a4c"
};

const StoreContextProvider = props => {
  const [state, dispatch] = useReducer(storeReducer, initialStore);
  //   useEffect(() => {
  //     localStorage.setItem("books", JSON.stringify(books));
  //   }, [books]);
  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
