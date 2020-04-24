const initial = {
  isLoading: true,
  availableAccounts: {},
  selectedAccountId: null,
  isCreating: false,
  newWallet: null,
  apps: {}
};

export default (state = initial, action) => {
  switch (action.type) {
    case "AVAILABLE_ACCOUNTS_LOADED":
      return {
        ...state,
        availableAccounts: action.payload,
        isLoading: false
      };

    case "DO_CREATE_ACCOUNT":
      return {
        ...state,
        isCreating: true
      };

    case "ACCOUNT_CREATED":
      return {
        ...state,
        isLoading: false,
        newWallet: {
          id: new Date().getTime(),
          mnemonic: action.payload
        }
      };

    case "DO_START_ACCOUNT_IMPORT":
      return {
        ...state,
        isImporting: true
      };

    // All possible resets
    case "DO_CLOSE_ACCOUNT_MODAL":
      return {
        ...state,
        isCreating: false,
        isImporting: false,
        newWallet: null
      };

    case "DO_SAVE_NEW_ACCOUNT":
      return {
        ...state,
        newWallet: null,
        lastAdded: state.newWallet.id,
        availableAccounts: {
          ...state.availableAccounts,
          [state.newWallet.id]: {
            mnemonic: state.newWallet.mnemonic,
            username: null
          }
        }
      };

    case "DO_SELECT_ACCOUNT":
      return {
        ...state,
        isLoading: true,
        selectedAccountId: action.payload || state.lastAdded,
        account: null
      };

    case "ACCOUNT_READY":
      return {
        ...state,
        isLoading: false,
        account: action.payload.account,
        username: action.payload.username
      };

    default:
      return state;
  }
};
