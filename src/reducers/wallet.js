export default (state = {}, action) => {
  switch (action.type) {
    case "WALLETS_LOADED":
      return {
        ...state,
        availableWallets: action.payload,
        isLoading: false
      };

    case "DO_WALLET_CREATE":
      return {
        ...state,
        isLoading: true
      };

    case "WALLET_CREATED":
      return {
        ...state,
        isLoading: false,
        newWallet: {
          id: new Date().getTime(),
          mnemonic: action.payload
        }
      };

    case "DO_WALLET_SAVE":
      return {
        ...state,
        newWallet: null,
        lastAdded: state.newWallet.id,
        availableWallets: {
          ...state.availableWallets,
          [state.newWallet.id]: {
            mnemonic: state.newWallet.mnemonic,
            name: action.payload
          }
        }
      };

    case "DO_WALLET_SELECT":
      return {
        ...state,
        isLoading: true,
        currentWalletId: action.payload,
        account: null
      };

    case "WALLET_READY":
      return {
        ...state,
        isLoading: false,
        account: action.payload.account,
        identity: action.payload.identity
      };

    default:
      return state;
  }
};
