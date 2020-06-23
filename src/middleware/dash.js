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

    case "SELECT_ACCOUNT":
      await selectAccount(...args);
      break;

    case "ACCOUNT_LOADED":
    case "ACCOUNT_CREATED":
      updateAccountBalances(...args);
      updateAddress(...args);
      updateIdentityBalances(...args);
      break;

    case "WALLET_IMPORT_COMPLETED":
      updateAccountBalances(...args);
      break;

    case "IDENTITY_CREATED":
      updateIdentityBalances(...args);
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

    case "SELECT_WIZARD_TYPE":
      selectWizardType(...args);
      break;

    default:
      return;
  }
};

export async function updateAccountBalances(payload, dispatch) {
  dispatch({ type: "UPDATING_ACCOUNT_BALANCES" });

  const balances = client.wallet.accounts.forEach(account => {
    const index = account.index;
    const balance = {
      total: account.getTotalBalance(),
      unconfirmed: account.getUnconfirmedBalance(),
      confirmed: account.getConfirmedBalance()
    };

    dispatch({ type: "ACCOUNT_BALANCE_UPDATED", payload: { index, balance } });
  });
}

export async function updateAddress(payload, dispatch) {
  const address = client.account.getUnusedAddress().address;
  const index = client.account.index;

  dispatch({ type: "ACCOUNT_ADDRESS_UPDATED", payload: { address, index } });
}

export async function initialiseWallet(payload, dispatch, state) {
  const mnemonic = state.getIn(["wallet", "mnemonic"]);
  if (!mnemonic) {
    dispatch({ type: "NO_INITIAL_WALLET_FOUND" });
    return;
  }

  client = new Dash.Client({
    ...DASH_CONFIG,
    wallet: { mnemonic }
  });

  const selectedAccount = state.getIn(["wallet", "selectedAccount"], 0);
  dispatch({ type: "WALLET_LOADED" });
  dispatch({ type: "SELECT_ACCOUNT", payload: selectedAccount });
}

export async function createWallet(payload, dispatch, state) {
  dispatch({ type: "CREATING_WALLET" });
  client = new Dash.Client({
    ...DASH_CONFIG,
    wallet: { mnemonic: null }
  });

  const id = `${new Date().getTime()}`;
  const mnemonic = client.wallet.exportWallet();

  dispatch({ type: "WALLET_CREATED", payload: { id, mnemonic } });
  dispatch({ type: "CREATE_ACCOUNT" });
}

export async function importWallet(payload, dispatch) {
  dispatch({ type: "WALLET_IMPORT_STARTED" });
  try {
    client = new Dash.Client({
      ...DASH_CONFIG,
      wallet: {
        mnemonic: payload
      }
    });

    const accounts = [];
    let allDone = false;
    let index = 0;
    let prev = "";
    while (!allDone) {
      const account = await client.wallet.getAccount({ index });
      const transactions = JSON.stringify(account.store.transactions);
      if (transactions === prev) {
        allDone = true;
      } else {
        accounts.push(account);
        index++;
        prev = transactions;
      }
    }

    const identitiesByAccount = await importPlatformData(accounts, dispatch);

    const id = `${new Date().getTime()}`;
    const wallet = {
      id,
      mnemonic: payload
    };

    const importData = {
      wallet,
      accounts: accounts.map(a => a.index).sort(),
      identitiesByAccount
    };

    client.wallet.accounts = accounts;
    dispatch({ type: "WALLET_IMPORT_COMPLETED", payload: importData });

    if (accounts.length === 1) {
      dispatch({ type: "SELECT_ACCOUNT", payload: 0 });
    }
  } catch (e) {
    dispatch({ type: "WALLET_IMPORT_FAILED", payload: e.message });
  }
}

export async function importPlatformData(accounts, dispatch) {
  const identitiesByAccount = {};
  for (const account of accounts) {
    const identityIds = account.getIdentityIds();
    const index = account.index;
    identitiesByAccount[index] = {};

    for (const identityId of identityIds) {
      const names = await getUsernamesFromIdentityId(identityId);
      const identity = await client.platform.identities.get(identityId);
      identitiesByAccount[index][identityId] = names;
    }
  }

  return identitiesByAccount;
}

export async function selectAccount(payload, dispatch) {
  dispatch({ type: "LOADING_ACCOUNT" });

  const account = await client.wallet.getAccount({ index: payload });
  client.account = account;

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
  dispatch({
    type: "IDENTITY_CREATED",
    payload: { index: payload, identityId: identity.id }
  });

  return identity.id;
}

export async function createUsername(payload, dispatch, state) {
  const index = state.getIn(["wallet", "selectedAccount"]);
  const account = state.getIn(["wallet", "accounts", index]);

  try {
    const storedId = account.get("selectedIdentityId");
    const identityId = storedId || (await createIdentity(index, dispatch));

    const identity = await client.platform.identities.get(identityId);
    const name = await client.platform.names.register(payload, identity);
    const username = name.data.label;

    dispatch({
      type: "USERNAME_CREATED",
      payload: { index, username, identityId }
    });
    dispatch({ type: "SELECT_USERNAME", payload: { index, username } });
  } catch (e) {
    console.error(e);
    dispatch({ type: "CREATE_USERNAME_FAILED", payload: e.message });
  }
}

export async function createAccount(payload, dispatch) {
  const index = client.wallet.accounts.length;
  dispatch({ type: "CREATING_ACCOUNT", payload: index });

  const account = await client.wallet.createAccount({ index });
  client.account = account;
  client.wallet.accounts[index] = account;

  dispatch({ type: "ACCOUNT_CREATED", payload: index });
}

export async function updateIdentityBalances(payload, dispatch, state) {
  dispatch({ type: "IDENTITY_BALANCES_UPDATING" });

  const identityIds = state
    .getIn(["wallet", "accounts", payload, "identities"])
    .keys();
  const balances = {};
  for (const id of identityIds) {
    const identity = await client.platform.identities.get(id);
    balances[id] = identity.balance;
  }

  dispatch({
    type: "IDENTITY_BALANCES_UPDATED",
    payload: { balances, index: payload }
  });
}

export async function selectWizardType(payload, dispatch) {
  if (payload === "CREATE") {
    dispatch({ type: "CREATE_WALLET" });
  }
}
