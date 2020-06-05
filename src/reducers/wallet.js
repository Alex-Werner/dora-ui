const initial = {
  mnemonic: null,
  id: null,
  requiresPlatformImport: false,
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
        id: action.payload.id,
        requiresPlatformImport: action.payload.requiresPlatformImport || false
      };

    case "PLATFORM_DATA_IMPORTED":
      return {
        ...state,
        requiresPlatformImport: false
      };

    default:
      return state;
  }
};
