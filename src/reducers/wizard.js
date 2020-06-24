import { Map } from "immutable";

const initial = Map({
  isHidden: false,
  type: null,
  mnemonicConfirmed: false,
  showAccountManagement: false,
  requiresMnemonic: false,
  showCreateUsername: false,
  showIdentityManagement: false,
  viewMnemonic: false
});

export default (state = initial, action) => {
  switch (action.type) {
    case "SHOW_WIZARD":
      return state.set("isHidden", false);

    case "CONFIRM_MNEMONIC":
      return state.set("mnemonicConfirmed", true);

    case "HIDE_WIZARD":
      return state.merge({
        isHidden: true,
        showAccountManagement: false,
        showSend: false,
        showReceive: false,
        showIdentityManagement: false,
        showCreateUsername: false,
        viewMnemonic: false
      });

    case "IMPORT_WALLET":
      return state.set("requiresMnemonic", true);

    case "WALLET_IMPORT_COMPLETED":
      return state.set("requiresMnemonic", false);

    case "SELECT_WIZARD_TYPE":
      return state.set("type", action.payload);

    case "OPEN_ACCOUNT_MANAGEMENT":
      return state.set("showAccountManagement", true);

    case "CLOSE_ACCOUNT_MANAGEMENT":
      return state.set("showAccountManagement", false);

    case "OPEN_SEND":
      return state.set("showSend", true);

    case "CLOSE_SEND":
      return state.set("showSend", false);

    case "OPEN_RECEIVE":
      return state.set("showReceive", true);

    case "CLOSE_RECEIVE":
      return state.set("showReceive", false);

    case "SHOW_CREATE_USERNAME":
      return state.set("showCreateUsername", true);

    case "HIDE_CREATE_USERNAME":
    case "USERNAME_CREATED":
      return state.set("showCreateUsername", false);

    case "SHOW_IDENTITY_MANAGEMENT":
      return state.set("showIdentityManagement", true);

    case "HIDE_IDENTITY_MANAGEMENT":
      return state.set("showIdentityManagement", false);

    case "VIEW_MNEMONIC":
      return state.set("viewMnemonic", true);

    case "HIDE_MNEMONIC":
      return state.set("viewMnemonic", false);

    case "DISCARD_WALLET":
      return initial;

    default:
      return state;
  }
};
