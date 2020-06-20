const initial = {
  selected: null,
  address: null,
  available: {},
  balances: []
};

const initialAccount = {
  balance: {
    confirmed: null,
    unconfirmed: null,
    total: null
  },
  address: null,
  identities: {},
  identityIdByName: {},
  selectedName: null,
  selectedIdentity: null
};

const initialIdentity = {
  balance: null,
  names: []
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
        available: {
          ...state.available
        }
      };

    case "ACCOUNT_BALANCE_UPDATED":
      return {
        ...state,
        available: {
          ...state.available,
          [action.payload.index]: {
            ...state.available[action.payload.index],
            balance: action.payload.balance
          }
        }
      };

    case "ACCOUNT_ADDRESS_UPDATED":
      return {
        ...state,
        available: {
          ...state.available,
          [action.payload.index]: {
            ...state.available[action.payload.index],
            address: action.payload.address
          }
        }
      };

    case "IDENTITY_FOUND":
    case "IDENTITY_CREATED":
      return {
        ...state,
        available: {
          ...state.available,
          [action.payload.index]: {
            ...state.available[action.payload.index],
            identities: {
              ...state.available[action.payload.index].identities,
              [action.payload.identityId]: initialIdentity
            }
          }
        }
      };

    case "USERNAME_CREATED":
      return {
        ...state,
        available: {
          ...state.available,
          [action.payload.index]: {
            ...state.available[action.payload.index],
            identities: {
              ...state.available[action.payload.index].identities,
              [action.payload.identityId]: {
                ...state.available[action.payload.index].identities[
                  action.payload.identityId
                ],
                names: [
                  ...state.available[action.payload.index].identities[
                    action.payload.identityId
                  ]
                ]
              }
            }
          }
        }
      };

    default:
      return state;
  }
};
