const initial = {
  available: [],
  id: null,
  balanceById: {},
  byName: {}
};

export default (state = initial, action) => {
  switch (action.type) {
    case "ACCOUNT_IDENTITIES_FOUND":
      return {
        ...state,
        available: action.payload
      };

    case "CREATED_IDENTITY":
      return {
        ...state,
        available: [...state.available, action.payload]
      };

    case "USERNAME_CREATED":
      return {
        ...state,
        byName: {
          ...state.byName,
          [action.payload.username]: action.payload.identityId
        }
      };

    case "SELECT_USERNAME":
      return {
        ...state,
        id: state.byName[action.payload]
      };

    case "IDENTITY_BALANCES_UPDATED":
      return {
        ...state,
        balanceById: action.payload
      };

    case "SELECT_ACCOUNT":
      return initial;

    default:
      return state;
  }
};
