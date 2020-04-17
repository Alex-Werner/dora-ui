const initial = {
  contracts: [],
  selected: null
};

export default (state = initial, action) => {
  switch (action.type) {
    case "WALLET_READY":
      return {
        ...state,
        contracts: action.payload.apps
      };

    default:
      return state;
  }
};
