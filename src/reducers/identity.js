const initial = {
  names: [],
  selectedName: null,
  identity: null,
  balance: null
};

export default (state = initial, action) => {
  switch (action.type) {
    case "ACCOUNT_NAMES_FOUND_IN_LOCAL_STORAGE":
      return {
        ...state,
        names: action.payload.names,
        selectedName: action.payload.names.find(
          n => n.username === action.payload.selectedName
        )
      };

    case "CREATED_IDENTITY_FOUND_IN_LOCAL_STORAGE":
    case "CREATED_IDENTITY":
      return {
        ...state,
        identity: action.payload
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
        selectedName: state.names.find(n => n.username === action.payload),
        balance: null
      };

    case "IDENTITY_BALANCE_UPDATED":
      return {
        ...state,
        balance: action.payload
      };

    case "ACCOUNT_IDENTITY_FOUND":
      return {
        ...state,
        names: action.payload,
        selectedName: action.payload[0] ? action.payload[0] : null
      };

    default:
      return state;
  }
};
