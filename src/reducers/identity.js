const initial = {
  names: [],
  selectedName: null,
  createdIdentity: null
};

export default (state = initial, action) => {
  switch (action.type) {
    case "ACCOUNT_NAMES_FOUND_IN_LOCAL_STORAGE":
      return {
        ...state,
        names: action.payload.names,
        selectedName: action.payload.selectedName
      };

    case "CREATED_IDENTITY_FOUND_IN_LOCAL_STORAGE":
      return {
        ...state,
        createdIdentity: action.payload
      };

    default:
      return state;
  }
};
