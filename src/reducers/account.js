const initial = {
  selected: null,
  address: null,
  balance: {
    total: 0,
    confirmed: 0,
    unconfirmed: 0
  }
};

export default (state = initial, action) => {
  switch (action.type) {
    case "SELECT_ACCOUNT":
    case "SELECTED_ACCOUNT_FOUND_IN_LOCAL_STORAGE":
    case "ACCOUNT_CREATED":
    case "ACCOUNT_CREATED_ON_NEW_WALLET":
      return {
        ...state,
        selected: action.payload
      };

    case "ACCOUNT_BALANCE_UPDATED":
      return {
        ...state,
        balance: action.payload
      };

    case "ACCOUNT_ADDRESS_UPDATED":
      return {
        ...state,
        address: action.payload
      };

    case "WALLET_IMPORT_COMPLETED":
      return initial;

    default:
      return state;
  }
};
