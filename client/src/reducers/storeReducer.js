import uuid from "uuid/v4";

export const storeReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE_THEME":
      Object.assign(state, {
        theme: action.theme
      });
      localStorage.setItem("theme", action.theme);
      return state;
    // case "REMOVE_BOOK":
    //   return state.filter(book => book.id !== action.id);
    default:
      return state;
  }
};
