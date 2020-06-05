const initial = {};

export default (state = {}, action) => {
  switch (action.type) {
    case "WALLET_IMPORT_FAILED":
      return {
        ...state,
        WALLET_IMPORT_FAILED: true
      };

    case "WALLET_IMPORT_STARTED":
      return {
        ...state,
        WALLET_IMPORT_FAILED: false
      };

    case "CREATE_USERNAME":
      return {
        ...state,
        createUsername: false
      };

    case "CREATE_USERNAME_FAILED":
      return {
        ...state,
        createUsername: action.payload || true
      };

    default:
      return state;
  }
};
