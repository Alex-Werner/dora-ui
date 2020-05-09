const initial = {
  isHidden: false,
  type: null,
  mnemonicConfirmed: false
};

export default (state = initial, action) => {
  switch (action.type) {
    case "SHOW_WIZARD":
      return {
        ...state,
        isHidden: false
      };

    case "WALLET_LOADED":
    case "CONFIRM_MNEMONIC":
      return {
        ...state,
        mnemonicConfirmed: true
      };

    case "HIDE_WIZARD":
      return {
        ...state,
        isHidden: true
      };

    case "SELECT_WIZARD_TYPE":
      return {
        ...state,
        type: action.payload
      };

    default:
      return state;
  }
};
