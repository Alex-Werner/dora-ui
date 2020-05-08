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
        available: action.payload.available,
        selectedId: action.payload.selectedId
      };

    case "UPDATE_ACCOUNTS_FROM_LOCAL_STORAGE":
      return {
        ...state,
        available: action.payload.available,
        selectedId: action.payload.selectedId
      };

    case "SELECT_ACCOUNT":
      return {
        ...state,
        isReady: false,
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
        isReady: true,
        current: {
          ...state.current,
          ...action.payload
        }
      };

    case "ACCOUNT_UPDATED":
      return {
        ...state,
        current: {
          ...state.current,
          ...action.payload
        }
      };

    case "SELECT_NEW_ACCOUNT_FROM":
      return {
        ...state,
        current: {
          ...state.current,
          from: action.payload
        }
      };

    case "CONFIRM_NEW_WALLET":
      return {
        ...state,
        current: {
          ...state.current,
          confirmed: true
        }
      };

    case "CREATE_USERNAME":
      return {
        ...state,
        isCreatingUsername: true,
        usernameCreationError: null
      };

    case "IDENTITY_CREATED":
      return {
        ...state,
        current: {
          ...state.current,
          identity: action.payload
        }
      };

    case "USERNAME_CREATED":
      return {
        ...state,
        isCreatingUsername: false,
        current: {
          ...state.current,
          username: action.payload
        }
      };

    case "USERNAME_CREATION_FAILED":
      return {
        ...state,
        isCreatingUsername: false,
        usernameCreationError: action.payload
      };
    case "HIDE_WIZARD":
      return {
        ...state,
        showWizard: false
      };

    case "SHOW_WIZARD":
      return {
        ...state,
        showWizard: true
      };

    default:
      return state;
  }
};
