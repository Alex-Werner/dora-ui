const initial = {
  isHidden: false,
  type: null,
  mnemonicConfirmed: false,
  showAccountManagement: false,
  requiresMnemonic: false
};

export default (state = initial, action) => {
  switch (action.type) {
    case "SHOW_WIZARD":
      return {
        ...state,
        isHidden: false
      };

    case "CONFIRM_MNEMONIC":
      return {
        ...state,
        mnemonicConfirmed: true
      };

    case "HIDE_WIZARD":
      return {
        ...state,
        isHidden: true,
        showAccountManagement: false,
        showSend: false,
        showReceive: false
      };

    case "IMPORT_WALLET":
      return {
        ...state,
        requiresMnemonic: true
      };

    case "WALLET_IMPORT_COMPLETED":
      return {
        ...state,
        requiresMnemonic: false
      };

    case "SELECT_WIZARD_TYPE":
      return {
        ...state,
        type: action.payload
      };

    case "OPEN_ACCOUNT_MANAGEMENT":
      return {
        ...state,
        showAccountManagement: true
      };

    case "CLOSE_ACCOUNT_MANAGEMENT":
      return {
        ...state,
        showAccountManagement: false
      };

    case "OPEN_SEND":
      return {
        ...state,
        showSend: true
      };

    case "CLOSE_SEND":
      return {
        ...state,
        showSend: false
      };

    case "OPEN_RECEIVE":
      return {
        ...state,
        showReceive: true
      };

    case "CLOSE_RECEIVE":
      return {
        ...state,
        showReceive: false
      };

    default:
      return state;
  }
};
