import React, { createContext, useReducer, useEffect } from "react";
import { bookReducer } from "../reducers/bookReducer";

export const BookContext = createContext();

const initialStore = false;
const BookContextProvider = props => {
  const [state, dispatch] = useReducer(bookReducer, initialStore);
  return (
    <BookContext.Provider value={{ state, dispatch }}>
      {props.children}
    </BookContext.Provider>
  );
};

export default BookContextProvider;
