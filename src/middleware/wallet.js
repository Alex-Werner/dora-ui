import Dash from "dash";
import SecureLS from "secure-ls";

const ls = new SecureLS();
let client;

export default store => next => async action => {
  next(action);

  switch (action.type) {
    case "INIT":
      const loadedWallets = JSON.parse(ls.get("saved_wallets") || "{}");
      const currentWalletId = ls.get("selected_wallet");

      store.dispatch({ type: "WALLETS_LOADED", payload: loadedWallets });

      if (currentWalletId) {
        store.dispatch({ type: "DO_WALLET_SELECT", payload: currentWalletId });
      }
      break;

    case "DO_WALLET_CREATE":
      client = new Dash.Client({
        network: "testnet",
        mnemonic: null
      });

      await client.isReady();

      const newWalletMnemonic = client.wallet.exportWallet();
      store.dispatch({ type: "WALLET_CREATED", payload: newWalletMnemonic });
      break;

    case "DO_WALLET_SAVE":
      const walletToSelect = store.getState().wallet.lastAdded;
      const walletsToSave = store.getState().wallet.availableWallets;
      ls.set("saved_wallets", JSON.stringify(walletsToSave));

      store.dispatch({ type: "DO_WALLET_SELECT", payload: walletToSelect });
      break;

    case "DO_WALLET_SELECT":
      const selectedWalletId = store.getState().wallet.currentWalletId;
      const wallet = store.getState().wallet.availableWallets[selectedWalletId];
      ls.set("selected_wallet", selectedWalletId);

      client = new Dash.Client({
        network: "testnet",
        mnemonic: wallet.mnemonic
      });

      await client.isReady();

      const walletAccount = {
        address: client.account.getUnusedAddress().address,
        confirmedBalance: client.account.getConfirmedBalance(),
        unconfirmedBalance: client.account.getUnconfirmedBalance()
      };

      store.dispatch({ type: "WALLET_READY", payload: walletAccount });

      const storedWalletIdentity = ls.get(`identity:${selectedWalletId}`);
      const walletIdentity = storedWalletIdentity
        ? storedWalletIdentity
        : await client.platform.identities.register("user");

      ls.set(`identity:${selectedWalletId}`, walletIdentity);
      store.dispatch({
        type: "WALLET_READY",
        payload: {
          account: walletAccount,
          identityId: walletIdentity
        }
      });

      break;

    case "DO_FIND_IDENTITY":
      const createdIdentity = await client.platform.identities.register("user");
      ls.set(`identity:${action.payload}`, createdIdentity);
      break;

    default:
      return;
  }
};
