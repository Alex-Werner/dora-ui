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

    case "WALLET_IMPORT_STARTED":
      return {
        ...state,
        walletImport: true
      };

    case "WALLET_IMPORT_COMPLETED":
    case "WALLET_IMPORT_FAILED":
      return {
        ...state,
        walletImport: false
      };

    case "IMPORTING_PLATFORM_DATA":
      return {
        ...state,
        platformImport: true
      };

    case "PLATFORM_DATA_IMPORTED":
      return {
        ...state,
        platformImport: false
      };

    case "CREATE_USERNAME":
      return {
        ...state,
        createUsername: true
      };

    case "CREATE_USERNAME_FAILED":
    case "USERNAME_CREATED":
      return {
        ...state,
        createUsername: false
      };

    case "IDENTITY_BALANCES_UPDATING":
      return {
        ...state,
        identityBalances: true
      };

    case "IDENTITY_BALANCES_UPDATED":
      return {
        ...state,
        identityBalances: false
      };

    default:
      return state;
  }
};
