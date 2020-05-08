import Dash from "dash";

import { DASH_NETWORK } from "../dora.config";

let client;
let watcher;

const fns = {
  CREATE_ACCOUNT,
  ACCOUNTS_LOADED,
  SELECT_ACCOUNT,
  ACCOUNT_CREATED,
  ACCOUNT_SELECTED,
  WATCH_ACCOUNT,
  CREATE_USERNAME
};

export default store => next => action => {
  next(action);

  if (fns[action.type]) {
    fns[action.type](action.payload, store.dispatch, store.getState());
  }
};

export async function ACCOUNTS_LOADED(payload, dispatch) {
  if (payload.selectedId) {
    dispatch({ type: "SELECT_ACCOUNT", payload: payload.selectedId });
  } else if (Object.keys(payload.available).length === 0) {
    dispatch({ type: "CREATE_ACCOUNT" });
  }
}

export async function CREATE_ACCOUNT(payload, dispatch, state) {
  client = new Dash.Client({
    network: DASH_NETWORK,
    mnemonic: null
  });

  const account = getAccount();
  dispatch({ type: "ACCOUNT_CREATED", payload: account });
}

export async function SELECT_ACCOUNT(payload, dispatch, state) {
  const current = state.account.current;
  client = new Dash.Client({
    network: DASH_NETWORK,
    mnemonic: current.mnemonic
  });

  await client.isReady();

  const account = {
    ...getAccount(),
    ...current
  };

  dispatch({ type: "ACCOUNT_SELECTED", payload: account });
}

export async function ACCOUNT_CREATED(payload, dispatch) {
  dispatch({ type: "WATCH_ACCOUNT" });
}

export async function ACCOUNT_SELECTED(payload, dispatch) {
  dispatch({ type: "WATCH_ACCOUNT" });
}

export async function WATCH_ACCOUNT(payload, dispatch) {
  window.clearTimeout(watcher);
  updateAccount(dispatch);
}

export async function CREATE_USERNAME(payload, dispatch, state) {
  const { current } = state.account;
  if (current.username) return;

  const { platform } = client;
  console.log(client);
  return;
  const identity = current.identity || (await platform.identities.register());
  console.log(identity, client.account.getIdentityHDKey(), client.wallet);
  dispatch({ type: "IDENTITY_CREATED", payload: identity.id });

  let applyAction;
  console.log("creating name");
  try {
    const nameRegistration = await platform.names.register(payload, identity);
    applyAction = () => dispatch({ type: "USERNAME_CREATED", payload });
  } catch (e) {
    applyAction = () =>
      dispatch({ type: "USERNAME_CREATION_FAILED", payload: e.message });
  }
  console.log("name created");

  applyAction();
}

/*
 * Utility functions
 */

export async function updateAccount(dispatch) {
  if (!client) return;
  await client.isReady();
  const updatedAccount = getAccount();
  dispatch({ type: "ACCOUNT_UPDATED", payload: updatedAccount });
  watcher = setTimeout(() => {
    updateAccount(dispatch);
  }, 1000);
}

export function getAccount() {
  const mnemonic = client.wallet.exportWallet();
  const address = client.account.getUnusedAddress().address;
  const confirmedBalance = client.account.getConfirmedBalance();
  const unconfirmedBalance = client.account.getUnconfirmedBalance();
  const balance = client.account.getTotalBalance();

  return { address, mnemonic, balance, confirmedBalance, unconfirmedBalance };
}
