const initial = {};

export default (state = initial, action) => {
  switch (action.type) {
    case "INIT":
      return {
        ...state,
        wallet: true
      };

    case "WALLET_LOADED":
    case "WALLET_CREATED":
      return {
        ...state,
        wallet: false
      };

    case "LOADING_ACCOUNT":
      return {
        ...state,
        account: true
      };

    case "ACCOUNT_LOADED":
      return {
        ...state,
        account: false
      };

    default:
      return state;
  }
};
