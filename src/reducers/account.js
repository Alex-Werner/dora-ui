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
          ...state.current,
          id: new Date().getTime(),
          ...action.payload
        }
      };

    case "ACCOUNT_SELECTED":
      return {
        ...state,
        current: action.payload
      };

    case "DO_SELECT_NEW_ACCOUNT_FROM":
      return {
        ...state,
        current: {
          ...state.current,
          from: action.payload
        }
      };

    case "DO_CONFIRM_NEW_WALLET":
      return {
        ...state,
        current: {
          ...state.current,
          confirmed: true
        }
      };

    case "DO_HIDE_WIZARD":
      return {
        ...state,
        showWizard: false
      };

    case "DO_SHOW_WIZARD":
      return {
        ...state,
        showWizard: true
      };

    default:
      return state;
  }
};
