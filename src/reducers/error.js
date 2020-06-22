import { Map } from "immutable";
const initial = Map();

export default (state = initial, action) => {
  switch (action.type) {
    case "WALLET_IMPORT_FAILED":
      return state.set("walletImport", true);

    case "WALLET_IMPORT_STARTED":
      return state.set("walletImport", false);

    case "CREATE_USERNAME":
      return state.set("createUsername", false);

    case "CREATE_USERNAME_FAILED":
      return state.set("createUsername", action.payload);

    default:
      return state;
  }
};
