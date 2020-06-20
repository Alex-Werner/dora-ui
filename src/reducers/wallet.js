const initial = {
  mnemonic: null,
  id: null,
  from: "DEFAULT"
};

export default (state = initial, action) => {
  switch (action.type) {
    case "WALLET_LOADED":
    case "WALLET_CREATED":
    case "WALLET_IMPORT_COMPLETED":
      return {
        ...state,
        mnemonic: action.payload.mnemonic,
        id: action.payload.id
      };

    default:
      return state;
  }
};
