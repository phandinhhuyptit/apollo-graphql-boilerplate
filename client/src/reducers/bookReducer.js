export const bookReducer = (state, action) => {
  switch (action.type) {
    case "OPEN_MODAL":
      Object.assign(state, {
        isModal: true
      });
      console.log(state);
      return state;
    case "CLOSE_MODAL":
      Object.assign(state, {
        isModal: false
      });
      return state;
    default:
      return state;
  }
};
