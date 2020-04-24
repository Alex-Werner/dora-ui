import Dash from "dash";
import SecureLS from "secure-ls";

import { DASH_NETWORK } from "../dora.config";

const ls = new SecureLS();
let client;

const fns = {
  INIT,
  DO_CREATE_ACCOUNT,
  DO_SAVE_NEW_ACCOUNT,
  DO_SELECT_ACCOUNT
};

export default store => next => action => {
  next(action);

  if (fns[action.type]) {
    fns[action.type](action.payload, store.dispatch, store.getState());
  }
};

export async function INIT(payload, dispatch) {
  const availableAccounts = lsGet("saved_accounts", {});
  const selectedAccountId = lsGet("selected_account_id");

  dispatch({ type: "AVAILABLE_ACCOUNTS_LOADED", payload: availableAccounts });

  if (selectedAccountId) {
    dispatch({ type: "DO_SELECT_ACCOUNT", payload: selectedAccountId });
  }
}

export async function DO_CREATE_ACCOUNT(payload, dispatch) {
  client = new Dash.Client({
    network: DASH_NETWORK,
    mnemonic: null
  });

  await client.isReady();

  const newWalletMnemonic = client.wallet.exportWallet();
  dispatch({ type: "ACCOUNT_CREATED", payload: newWalletMnemonic });
}

export async function DO_SAVE_NEW_ACCOUNT(payload, dispatch, state) {
  lsSet("saved_accounts", state.account.availableAccounts);
}

export async function DO_SELECT_ACCOUNT(payload, dispatch, state) {
  const accountId = state.account.selectedAccountId;
  lsSet("selected_account_id", accountId);

  const { mnemonic } = state.account.availableAccounts[accountId];

  client = new Dash.Client({
    network: DASH_NETWORK,
    mnemonic
  });

  await client.isReady();

  const account = {
    address: client.account.getUnusedAddress().address,
    confirmedBalance: client.account.getConfirmedBalance(),
    unconfirmedBalance: client.account.getUnconfirmedBalance()
  };

  dispatch({ type: "ACCOUNT_READY", payload: account });
}

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
