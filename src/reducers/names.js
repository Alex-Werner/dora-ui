const initial = {
  byIdentityId: {},
  available: [],
  username: null
};

export default (state = initial, action) => {
  switch (action.type) {
    case "CREATED_IDENTITY":
      return {
        ...state,
        byIdentityId: {
          ...state.byIdentityId,
          [action.payload]: []
        }
      };

    case "USERNAME_CREATED":
      return {
        ...state,
        available: [...state.available, action.payload.username],
        byIdentityId: {
          ...state.byIdentityId,
          [action.payload.identityId]: [
            ...state.byIdentityId[action.payload.identityId],
            action.payload.username
          ]
        }
      };

    case "SELECT_USERNAME":
      return {
        ...state,
        username: action.payload
      };

    case "SELECT_ACCOUNT":
      return initial;

    default:
      return state;
  }
};