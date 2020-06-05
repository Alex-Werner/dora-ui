import Dash from "dash";
import worker from "workerize-loader!../workers"; // eslint-disable-line import/no-webpack-loader-syntax

import { DASH_CONFIG } from "../dora.config";
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

    case "WALLET_IMPORT_COMPLETED":
      await initialiseAccountOnImportedWallet(0, store.dispatch);

    case "IDENTITY_ID_NOT_FOUND_IN_LOCAL_STORAGE":
      await createIdentity(...args);
      break;

    case "ACCOUNT_LOADED":
      updateAccountBalances(...args);
      updateAddress(...args);
      break;

    case "CREATE_USERNAME":
      createUsername(...args);
      break;

    case "IMPORT_WALLET":
      importWallet(...args);
      break;

    case "IMPORT_PLATFORM_DATA":
      importPlatformData(...args);
      break;

    default:
      return;
  }
};

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
    ...DASH_CONFIG,
    mnemonic: payload.mnemonic || null
  });

  dispatch({ type: "WALLET_LOADED", payload });
}

export async function importWallet(payload, dispatch) {
  dispatch({ type: "WALLET_IMPORT_STARTED" });
  try {
    client = new Dash.Client({
      ...DASH_CONFIG,
      mnemonic: payload
    });

    await client.isReady();

    const id = `${new Date().getTime()}`;
    const newWallet = {
      id,
      mnemonic: payload,
      requiresPlatformImport: true
    };

    dispatch({ type: "WALLET_IMPORT_COMPLETED", payload: newWallet });
  } catch (e) {
    dispatch({ type: "WALLET_IMPORT_FAILED", payload: e.message });
  }
}

export async function createWallet(payload, dispatch) {
  client = new Dash.Client({
    ...DASH_CONFIG,
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

export async function initialiseAccountOnImportedWallet(payload, dispatch) {
  dispatch({ type: "ACCOUNT_SELECTED_ON_IMPORTED_WALLET", payload: 0 });
  await selectAccount(0, dispatch);
}

export async function selectAccount(payload, dispatch) {
  dispatch({ type: "LOADING_ACCOUNT" });

  client.account = client.wallet.getAccount({ index: payload });
  await client.account.isReady();

  dispatch({ type: "ACCOUNT_LOADED", payload });
}

export async function importPlatformData(payload, dispatch) {
  dispatch({ type: "IMPORTING_PLATFORM_DATA" });

  const accounts = client.wallet.accounts.map(a => ({
    transactions: a.getTransactions(),
    index: a.index
  }));
  const workerInstance = worker();
  const identityIds = await workerInstance.getWalletIdentities(accounts);

  dispatch({ type: "PLATFORM_DATA_IMPORTED" });
}

export async function createIdentity(payload, dispatch) {
  dispatch({ type: "CREATING_IDENTITY" });
  const identity = await client.platform.identities.register();
  dispatch({ type: "CREATED_IDENTITY", payload: identity.id });

  return identity.id;
}

export async function createUsername(payload, dispatch, state) {
  try {
    const identityId =
      state.identity.createdIdentity ||
      (await createIdentity(payload, dispatch));

    const identity = await client.platform.identities.get(identityId);
    const name = await client.platform.names.register(payload, identity);
    const username = name.data.label;

    dispatch({ type: "USERNAME_CREATED", payload: { username, identityId } });
    dispatch({ type: "SELECT_USERNAME", payload: username });
  } catch (e) {
    dispatch({ type: "CREATE_USERNAME_FAILED", payload: e.message });
  }
}
