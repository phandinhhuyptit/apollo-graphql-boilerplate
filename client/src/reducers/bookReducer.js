export const bookReducer = (state, action) => {
  switch (action.type) {
    case "OPEN_MODAL":
      const newState = Object.assign({}, { isModal: true });
      state = newState;
      return state;
    case "CLOSE_MODAL":
      const newState2 = Object.assign({}, { isModal: true });
      state = newState2;
      return state;
    default:
      return state;
  }
};
