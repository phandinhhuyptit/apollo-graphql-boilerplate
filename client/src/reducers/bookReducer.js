export const storeReducer = (state, action) => {
  switch (action.type) {
    case "OPEN_MODAL":
      Object.assign(state, {
        isModal: true
      });
    case "CLOSE_MODAL":
      Object.assign(state, {
        isModal: false
      });
      return state;
    default:
      return state;
  }
};
