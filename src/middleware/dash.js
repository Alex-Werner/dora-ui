import Dash from "dash";
import SecureLS from "secure-ls";

import { DASH_NETWORK } from "../dora.config";

const ls = new SecureLS();
let client;

const fns = {
  INIT,
  CREATE_ACCOUNT,
  ACCOUNTS_LOADED,
  SELECT_ACCOUNT
};

export default store => next => action => {
  next(action);

  if (fns[action.type]) {
    fns[action.type](action.payload, store.dispatch, store.getState());
  }
};

export async function INIT(payload, dispatch) {
  const available = lsGet("saved_accounts", {});
  const selectedId = lsGet("selected_account_id", null);

  dispatch({ type: "ACCOUNTS_LOADED", payload: { available, selectedId } });
}

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

  await client.isReady();

  const account = getAccount();
  dispatch({ type: "ACCOUNT_CREATED", payload: account });
}

export async function SELECT_ACCOUNT(payload, dispatch, state) {
  lsSet("selected_account_id", payload);

  const { mnemonic, username, id } = state.account.available[payload];
  client = new Dash.Client({
    network: DASH_NETWORK,
    mnemonic
  });

  await client.isReady();

  const account = {
    ...getAccount(),
    username,
    mnemonic,
    id
  };

  dispatch({ type: "ACCOUNT_SELECTED", payload: account });
}

/*
 * Utility functions
 */

export function getAccount() {
  const mnemonic = client.wallet.exportWallet();
  const address = client.account.getUnusedAddress().address;
  const confirmedBalance = client.account.getConfirmedBalance();
  const unconfirmedBalance = client.account.getUnconfirmedBalance();
  const balance = confirmedBalance + unconfirmedBalance;

  return { address, mnemonic, balance, confirmedBalance, unconfirmedBalance };
}

export function lsGet(key, defaultValue) {
  const result = ls.get(key);
  if (!result || !result.length) return defaultValue;

  const firstChar = result[0];
  return firstChar === "{" || firstChar === "[" ? JSON.parse(result) : result;
}

export function lsSet(key, value) {
  const valueToSave =
    !!value && typeof value === "object" ? JSON.stringify(value) : `${value}`;
  ls.set(key, valueToSave);
}
