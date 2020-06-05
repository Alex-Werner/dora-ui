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
    case "CREATED_IDENTITY":
      return {
        ...state,
        createdIdentity: action.payload
      };

    case "SELECT_ACCOUNT":
      return initial;

    case "USERNAME_CREATED":
      return {
        ...state,
        names: [...state.names, action.payload]
      };

    case "SELECT_USERNAME":
      return {
        ...state,
        selectedName: state.names.find(n => n.username === action.payload)
      };

    default:
      return state;
  }
};
