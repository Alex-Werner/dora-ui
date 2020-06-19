const initial = {
  selected: null,
  address: null,
  available: [],
  balances: []
};

export default (state = initial, action) => {
  switch (action.type) {
    case "SELECT_ACCOUNT":
      return {
        ...state,
        selected: action.payload
      };

    case "ACCOUNT_CREATED":
    case "ACCOUNT_CREATED_ON_NEW_WALLET":
      return {
        ...state,
        selected: action.payload,
        available: [...state.available, action.payload]
      };

    case "ACCOUNT_BALANCE_UPDATED":
      return {
        ...state,
        balances: action.payload
      };

    case "ACCOUNT_ADDRESS_UPDATED":
      return {
        ...state,
        address: action.payload
      };

    case "WALLET_ACCOUNTS_LOADED":
      return {
        ...state,
        available: action.payload
      };

    case "WALLET_IMPORT_COMPLETED":
      return initial;

    default:
      return state;
  }
};
