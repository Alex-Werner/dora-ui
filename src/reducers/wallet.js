export default (state = {}, action) => {
  switch(action.type){
    case 'WALLETS_LOADED':
      return{
        ...state,
        availableWallets: action.payload,
        isLoading: false
      };

    case 'WALLET_REQUESTED':
      return{
        ...state,
        isCreating: true,
      };

    case 'WALLET_CREATED':
      return{
        ...state,
        selected: action.payload
      };

    case 'WALLET_SAVE_REQUESTED':
      return{
        ...state,
        selected:{
          ...state.selected,
          name: action.payload
        }
      };

    case 'WALLET_SAVED':
      return{
        ...state,
        isCreating: false,
        availableWallets:[
          ...state.availableWallets,
          action.payload
        ]
      };

    case 'WALLET_SELECTED':
      return{
        ...state,
        selected: state.availableWallets.find(w => w.mnemonic === action.payload)
      };

    default:
      return state;
  };
}
