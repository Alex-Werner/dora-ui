import Dash from "dash";
import SecureLS from 'secure-ls';

const ls = new SecureLS();
let client;

export default store => next => action => {
  next(action);

  switch (action.type) {
    case "INIT":
      client = new Dash.Client({ network: "testnet", mnemonic: null });
      const loadedWallets = JSON.parse(ls.get('saved_wallets') || '[]');
      store.dispatch({type: 'WALLETS_LOADED', payload: loadedWallets});
    break;

    case 'WALLET_REQUESTED':
      const newWallet = {
        mnemonic: client.wallet.exportWallet(),
        address: client.account.getUnusedAddress().address
      };

      store.dispatch({type: 'WALLET_CREATED', payload: newWallet});
    break;

    case 'WALLET_SAVE_REQUESTED':
      const alreadySaved = JSON.parse(ls.get('saved_wallets') || '[]');
      const toSave = store.getState().wallet.selected;
      ls.set('saved_wallets', JSON.stringify([...alreadySaved, toSave]));

      store.dispatch({type: 'WALLET_SAVED', payload: toSave});
    break;

    default:
      return;
  }
};
