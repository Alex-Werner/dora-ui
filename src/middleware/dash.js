import { DASH_CONFIG } from "../dora.config";
const Dash = window.Dash;
let client;

export default store => next => async action => {
  next(action);

  const args = [action.payload, store.dispatch, store.getState()];
  switch (action.type) {
    case "INIT":
      await initialiseWallet(...args);
      break;

    case "CREATE_WALLET":
      await createWallet(...args);
      break;

    case "ACCOUNT_IDENTITIES_FOUND":
      await updateIdentityBalances(...args);
      break;

    case "SELECT_ACCOUNT":
    case "ACCOUNT_CREATED":
      await selectAccount(...args);
      break;

    case "SELECT_WIZARD_TYPE":
      await selectWizardType(...args);
      break;

    case "WALLET_IMPORT_COMPLETED":
      await initialiseAccountOnImportedWallet(0, store.dispatch);
      break;

    case "ACCOUNT_LOADED":
      updateAccountBalances(...args);
      updateAddress(...args);
      break;

    case "CREATE_ACCOUNT":
      createAccount(...args);
      break;

    case "CREATE_USERNAME":
      createUsername(...args);
      break;

    case "IMPORT_WALLET":
      importWallet(...args);
      break;

    case "UPDATE_ACCOUNT_BALANCES":
      updateAccountBalances(...args);
      break;

    default:
      return;
  }
};

export async function updateAccountBalances(payload, dispatch) {
  dispatch({ type: "UPDATING_ACCOUNT_BALANCES" });
  const balances = client.wallet.accounts
    .sort((a, b) => a.index - b.index)
    .map(account => ({
      total: account.getTotalBalance(),
      unconfirmed: account.getUnconfirmedBalance(),
      confirmed: account.getConfirmedBalance()
    }));

  dispatch({ type: "ACCOUNT_BALANCE_UPDATED", payload: balances });
}

export async function updateAddress(payload, dispatch) {
  const address = client.account.getUnusedAddress().address;
  dispatch({ type: "ACCOUNT_ADDRESS_UPDATED", payload: address });
}

export async function initialiseWallet(payload, dispatch, state) {
  const mnemonic = state.wallet.mnemonic;
  if (!mnemonic) {
    dispatch({ type: "NO_INITIAL_WALLET_FOUND" });
    if (state.wizard.type === "CREATE") dispatch({ type: "CREATE_WALLET" });
    return;
  }

  client = new Dash.Client({
    ...DASH_CONFIG,
    wallet: { mnemonic }
  });

  dispatch({ type: "WALLET_LOADED", payload: state.wallet });

  const selectedAccount = state.account.selected || 0;
  selectAccount(selectedAccount, dispatch);
}

export async function createWallet(payload, dispatch, state) {
  dispatch({ type: "CREATING_WALLET" });
  client = new Dash.Client({
    ...DASH_CONFIG,
    wallet: { mnemonic: null }
  });

  await selectAccount(0, dispatch);

  const id = `${new Date().getTime()}`;
  const mnemonic = client.wallet.exportWallet();

  dispatch({ type: "WALLET_CREATED", payload: { id, mnemonic } });
}

export async function importWallet(payload, dispatch) {
  dispatch({ type: "WALLET_IMPORT_STARTED" });
  try {
    client = new Dash.Client({
      network: "testnet",
      wallet: {
        mnemonic: payload
      }
    });

    await client.wallet.getAccount({ index: 0 });

    const id = `${new Date().getTime()}`;
    const newWallet = {
      id,
      mnemonic: payload
    };

    dispatch({ type: "WALLET_IMPORT_COMPLETED", payload: newWallet });
  } catch (e) {
    dispatch({ type: "WALLET_IMPORT_FAILED", payload: e.message });
  }
}

export async function initialiseAccountOnImportedWallet(payload, dispatch) {
  dispatch({ type: "ACCOUNT_SELECTED_ON_IMPORTED_WALLET", payload: 0 });
  await selectAccount(0, dispatch);
}

export async function selectAccount(payload, dispatch) {
  dispatch({ type: "LOADING_ACCOUNT" });

  const account = await client.wallet.getAccount({ index: payload });
  client.account = account;

  const identities = account.getIdentityIds();
  dispatch({ type: "ACCOUNT_IDENTITIES_FOUND", payload: identities });

  dispatch({ type: "ACCOUNT_LOADED", payload });
}

export async function getUsernamesFromIdentityId(identityId) {
  const names = await client.platform.documents.get("dpns.domain", {
    where: [["records.dashIdentity", "==", identityId]]
  });

  return names.map(n => n.data.label);
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
      state.identity.id || (await createIdentity(payload, dispatch));

    const identity = await client.platform.identities.get(identityId);
    const name = await client.platform.names.register(payload, identity);
    const username = name.data.label;

    dispatch({ type: "USERNAME_CREATED", payload: { username, identityId } });
    dispatch({ type: "SELECT_USERNAME", payload: username });
  } catch (e) {
    console.error(e);
    dispatch({ type: "CREATE_USERNAME_FAILED", payload: e.message });
  }
}

export async function createAccount(payload, dispatch) {
  const index = client.wallet.accounts.length;
  dispatch({ type: "CREATING_ACCOUNT", payload: index });

  const account = await client.wallet.createAccount({ index });
  client.wallet.accounts[index] = account;

  dispatch({ type: "ACCOUNT_CREATED", payload: index });
}

export async function updateIdentityBalances(payload, dispatch, state) {
  dispatch({ type: "IDENTITY_BALANCES_UPDATING" });

  const balances = {};
  for (const id of payload) {
    const identity = await client.platform.identities.get(id);
    balances[id] = identity.balance;
  }

  dispatch({ type: "IDENTITY_BALANCES_UPDATED", payload: balances });
}

export async function selectWizardType(payload, dispatch) {
  if (payload === "CREATE") {
    dispatch({ type: "CREATE_WALLET" });
  }
}
