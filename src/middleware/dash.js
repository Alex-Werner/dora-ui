import Dash from "dash";

import { DASH_NETWORK } from "../dora.config";

let client;

export default store => next => async action => {
  next(action);

  const args = [action.payload, store.dispatch, store.getState()];
  switch (action.type) {
    case "WALLET_FOUND_IN_LOCAL_STORAGE":
      await initialiseWallet(...args);
      break;

    case "WALLET_NOT_FOUND_IN_LOCAL_STORAGE":
      await createWallet(...args);
      break;

    case "SELECTED_ACCOUNT_FOUND_IN_LOCAL_STORAGE":
    case "SELECT_ACCOUNT":
      await selectAccount(...args);
      break;

    case "WALLET_CREATED":
      await initialiseAccountOnNewWallet(0, store.dispatch);
      break;

    case "IDENTITY_ID_NOT_FOUND_IN_LOCAL_STORAGE":
      await createIdentity(...args);
      break;

    case "ACCOUNT_LOADED":
      updateAccountBalances(...args);
      updateAddress(...args);
      break;

    default:
      return;
  }
};

export async function createIdentity(payload, dispatch) {
  const identity = await client.platform.identities.register();
}

export async function updateAccountBalances(payload, dispatch) {
  const balance = {
    total: client.account.getTotalBalance(),
    unconfirmed: client.account.getUnconfirmedBalance(),
    confirmed: client.account.getConfirmedBalance()
  };

  dispatch({ type: "ACCOUNT_BALANCE_UPDATED", payload: balance });
}

export async function updateAddress(payload, dispatch) {
  const address = client.account.getUnusedAddress().address;
  dispatch({ type: "ACCOUNT_ADDRESS_UPDATED", payload: address });
}

export async function initialiseWallet(payload, dispatch) {
  client = new Dash.Client({
    network: DASH_NETWORK,
    mnemonic: payload.mnemonic || null
  });

  dispatch({ type: "WALLET_LOADED", payload });
}

export async function createWallet(payload, dispatch) {
  client = new Dash.Client({
    network: DASH_NETWORK,
    mnemonic: null
  });

  const id = `${new Date().getTime()}`;
  const mnemonic = client.wallet.exportWallet();

  dispatch({ type: "WALLET_CREATED", payload: { id, mnemonic } });
}

export async function initialiseAccountOnNewWallet(payload, dispatch) {
  dispatch({ type: "ACCOUNT_CREATED_ON_NEW_WALLET", payload: 0 });
  await selectAccount(0, dispatch);
}

export async function selectAccount(payload, dispatch) {
  dispatch({ type: "LOADING_ACCOUNT" });

  client.account = client.wallet.getAccount({ index: payload });
  await client.account.isReady();

  console.log(client.account);
  dispatch({ type: "ACCOUNT_LOADED", payload });
}
