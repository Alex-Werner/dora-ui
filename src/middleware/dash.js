import Dash from "dash";
import SecureLS from "secure-ls";

const ls = new SecureLS();
let client;

const fns = {
  INIT,
  DO_WALLET_CREATE
};

export default store => next => action => {
  next(action);

  if (fns[action.type]) {
    fns[action.type](action.payload, store.dispatch, store.getState());
  }
};

export async function INIT(payload, dispatch) {
  const loadedWallets = lsGet("saved_wallets", {});
  const currentWalletId = lsGet("selected_wallet");

  dispatch({ type: "WALLETS_LOADED", payload: loadedWallets });

  if (currentWalletId) {
    dispatch({ type: "DO_WALLET_SELECT", payload: currentWalletId });
  }
}

export async function DO_WALLET_CREATE(payload, dispatch) {
  client = new Dash.Client({
    network: "testnet",
    mnemonic: null
  });

  await client.isReady();

  const newWalletMnemonic = client.wallet.exportWallet();
  dispatch({ type: "WALLET_CREATED", payload: newWalletMnemonic });
}

export async function DO_WALLET_SAVE(payload, dispatch, state) {
  const walletToSelect = state.wallet.lastAdded;
  dispatch({ type: "DO_WALLET_SELECT", payload: walletToSelect });

  lsSet("saved_wallets", state.wallet.availableWallets);
}

// async function DO_WALLET_SELECT(payload, dispatch, state){
//       const selectedWalletId = state.wallet.currentWalletId;
//       const wallet = state.wallet.availableWallets[selectedWalletId];
//       lsSet("selected_wallet", selectedWalletId);

//       client = new Dash.Client({
//         network: "testnet",
//         mnemonic: wallet.mnemonic
//       });

//       await client.isReady();

//       const walletAccount = {
//         address: client.account.getUnusedAddress().address,
//         confirmedBalance: client.account.getConfirmedBalance(),
//         unconfirmedBalance: client.account.getUnconfirmedBalance()
//       };

//       const storedWalletIdentity = lsGet(`identity:${selectedWalletId}`);
//       const storedWalletApps = lsGet(`apps:${selectedWalletId}`, {});
//       const walletIdentity = storedWalletIdentity
//         ? storedWalletIdentity
//         : await client.platform.identities.register("user");

//       ls.set(`identity:${selectedWalletId}`, walletIdentity);
//       store.dispatch({
//         type: "WALLET_READY",
//         payload: {
//           account: walletAccount,
//           identityId: walletIdentity,
//           apps: JSON.parse(storedWalletApps)
//         }
//       });
// }

/*
 * Utility functions
 */
function lsGet(key, defaultValue) {
  const result = ls.get(key);
  if (!result || !result.length) return defaultValue;

  const firstChar = result[0];
  return firstChar === "{" || firstChar === "[" ? JSON.parse(result) : result;
}

function lsSet(key, value) {
  const valueToSave =
    !!value && typeof value === "object" ? JSON.stringify(value) : value;
  ls.set(key, value);
}
