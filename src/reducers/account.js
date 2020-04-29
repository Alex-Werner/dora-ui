const initial = {
  loading: {},
  showWizard: true,
  isReady: false,
  current: {},
  available: {},
  selectedId: null,
  account: {}
};

export default (state = initial, action) => {
  switch (action.type) {
    case "ACCOUNTS_LOADED":
      return {
        ...state,
        isReady: true,
        available: action.payload.available,
        selectedId: action.payload.selectedId
      };

    case "SELECT_ACCOUNT":
      return {
        ...state,
        current: {
          ...state.available[action.payload],
          id: action.payload
        }
      };

    case "CREATE_ACCOUNT":
      return {
        ...state,
        loading: {
          ...state.loading,
          createWallet: true
        }
      };

    case "ACCOUNT_CREATED":
      return {
        ...state,
        loading: {
          ...state.loading,
          createWallet: false
        },
        current: {
          id: new Date().getTime(),
          mnemonic: action.payload,
          username: null,
          identity: null
        }
      };

    case "DO_HIDE_WIZARD":
      return {
        ...state,
        showWizard: false
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
        isModalClosed: true,
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
        account: {}
      };

    case "ACCOUNT_READY":
      return {
        ...state,
        isLoading: false,
        isCreating: false,
        isImporting: false,
        account: action.payload.account,
        username: action.payload.username
      };

    default:
      return state;
  }
};
