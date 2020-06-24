import { Map } from "immutable";

const initial = Map();

export default (state = initial, action) => {
  switch (action.type) {
    case "INIT":
      return state.set("wallet", true);

    case "WALLET_LOADED":
    case "WALLET_CREATED":
      return state.set("wallet", false);

    case "LOADING_ACCOUNT":
    case "CREATING_ACCOUNT":
      return state.set("account", true);

    case "ACCOUNT_LOADED":
    case "ACCOUNT_CREATED":
      return state.set("account", false);

    case "WALLET_IMPORT_STARTED":
      return state.set("walletImport", true);

    case "WALLET_IMPORT_COMPLETED":
    case "WALLET_IMPORT_FAILED":
      return state.set("walletImport", false);

    case "IMPORTING_PLATFORM_DATA":
      return state.set("platformImport", true);

    case "PLATFORM_DATA_IMPORTED":
      return state.set("platformImport", false);

    case "CREATE_USERNAME":
      return state.set("createUsername", true);

    case "CREATE_USERNAME_FAILED":
    case "USERNAME_CREATED":
      return state.set("createUsername", false);

    case "IDENTITY_BALANCES_UPDATING":
      return state.set("identityBalances", true);

    case "IDENTITY_BALANCES_UPDATED":
      return state.set("identityBalances", false);

    default:
      return state;
  }
};
