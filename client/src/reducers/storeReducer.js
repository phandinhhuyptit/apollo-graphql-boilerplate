export const storeReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE_THEME":
      const newChangeTheme = Object.assign({}, { theme: action.theme });
      state = newChangeTheme;
      localStorage.setItem("theme", action.theme);
      return state;
    default:
      return state;
  }
};
