const initial = {
  mnemonic: null,
  id: null
};

export default (state = initial, action) => {
  switch (action.type) {
    case "WALLET_LOADED":
    case "WALLET_CREATED":
      return {
        ...state,
        mnemonic: action.payload.mnemonic,
        id: action.payload.id
      };

    default:
      return state;
  }
};
