import Dash from "dash";
import { PrivateKey, Transaction } from "@dashevo/dashcore-lib";
import { utils } from "@dashevo/wallet-lib";
import worker from "workerize-loader!../workers"; // eslint-disable-line import/no-webpack-loader-syntax

import { Buffer } from "buffer";
import { DASH_CONFIG } from "../dora.config";
window.Buffer = Buffer;
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
    case "ACCOUNT_CREATED":
      await selectAccount(...args);
      break;

    case "WALLET_CREATED":
      await initialiseAccountOnNewWallet(0, store.dispatch);
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

    case "IMPORT_PLATFORM_DATA":
      importPlatformData(...args);
      break;

    case "UPDATE_ACCOUNT_BALANCES":
      updateAccountBalances(...args);
      break;

    default:
      return;
  }
};

export async function updateAccountBalances(payload, dispatch) {
  const balances = client.wallet.accounts.map(account => ({
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

export async function initialiseWallet(payload, dispatch) {
  client = new Dash.Client({
    ...DASH_CONFIG,
    wallet: {
      mnemonic: payload.mnemonic || null
    }
  });

  dispatch({ type: "WALLET_LOADED", payload });
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
      mnemonic: payload,
      requiresPlatformImport: true
    };

    dispatch({ type: "WALLET_IMPORT_COMPLETED", payload: newWallet });
  } catch (e) {
    dispatch({ type: "WALLET_IMPORT_FAILED", payload: e.message });
  }
}

export async function createWallet(payload, dispatch) {
  const wallet = {
    mnemonic: null
  };

  console.log(wallet);
  client = new Dash.Client({ wallet });

  console.log(client);
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

  client.account = await client.wallet.getAccount({ index: payload });

  dispatch({ type: "ACCOUNT_LOADED", payload });
}

export async function importPlatformData(payload, dispatch, state) {
  dispatch({ type: "IMPORTING_PLATFORM_DATA" });

  const debugAcc = client.wallet.accounts[0];
  const accounts = client.wallet.accounts.map(a => ({
    transactions: a.getTransactions(),
    index: a.index
  }));
  const workerInstance = worker();
  const identities = await workerInstance.getWalletIdentities(accounts);
  console.log(identities);

  const identitiesByAccount = [];
  for (const accountIdentities of identities) {
    const names = [];
    for (const identityId of accountIdentities) {
      const usernames = await getUsernamesFromIdentityId(identityId);
      names.push(...usernames.map(username => ({ username, identityId })));
    }

    identitiesByAccount.push(names);
  }

  dispatch({ type: "PLATFORM_DATA_IMPORTED", payload: identitiesByAccount });

  const accountIdentity = identitiesByAccount[state.account.selected] || [];
  dispatch({ type: "ACCOUNT_IDENTITY_FOUND", payload: accountIdentity });
}

export async function getUsernamesFromIdentityId(identityId) {
  const identity = await client.platform.identities.get(identityId);
  const names = await client.platform.documents.get("dpns.domain", {
    where: [["records.dashIdentity", "==", identityId]]
  });

  return names.map(n => n.data.label);
}

export async function createIdentity(payload, dispatch) {
  dispatch({ type: "CREATING_IDENTITY" });
  console.log(client.platform.client);
  const account = await client.platform.client.getWalletAccount();
  const identityAddressInfo = account.getUnusedAddress();
  const [identityHDPrivateKey] = account.getPrivateKeys([
    identityAddressInfo.address
  ]);

  const assetLockPrivateKey = identityHDPrivateKey.privateKey;
  const assetLockPublicKey = assetLockPrivateKey.toPublicKey();

  const identityAddress = assetLockPublicKey
    .toAddress(client.network)
    .toString();
  const changeAddress = account.getUnusedAddress("internal").address;
  const lockTransaction = new Transaction(undefined);
  const fundingAmount = 10000;
  const output = {
    satoshis: fundingAmount,
    address: identityAddress
  };

  const outputToMarkItUsed = {
    satoshis: 10000,
    address: identityAddress
  };

  const utxos = account.getUTXOS();
  const balance = account.getTotalBalance();

  const selection = utils.coinSelection(utxos, [output, outputToMarkItUsed]);

  // FIXME : Usage with a single utxo had estimated fee of 205.
  // But network failed us with 66: min relay fee not met.
  // Over-writing the value for now.
  selection.estimatedFee = 680;

  lockTransaction
    .from(selection.utxos)
    // @ts-ignore
    .addBurnOutput(output.satoshis, assetLockPublicKey._getID())
    // @ts-ignore
    .to(identityAddressInfo.address, 10000)
    // @ts-ignore
    .change(changeAddress)
    .fee(selection.estimatedFee);

  const utxoAddresses = selection.utxos.map((utxo: any) =>
    utxo.address.toString()
  );

  // @ts-ignore
  const utxoHDPrivateKey = account.getPrivateKeys(utxoAddresses);

  // @ts-ignore
  const signingKeys = utxoHDPrivateKey.map(
    hdprivateKey => hdprivateKey.privateKey
  );

  if (balance < output.satoshis) {
    throw new Error(
      `Not enough balance (${balance}) to cover burn amount of ${fundingAmount}`
    );
  }
  console.log(identityAddressInfo.address, assetLockPublicKey._getID());
  console.log(
    selection.estimatedFee,
    changeAddress,
    selection.utxos,
    typeof Buffer
  );
  const transaction = lockTransaction.sign(signingKeys);
  console.log(transaction);

  const identity = await client.platform.identities.register(1000000);
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
    console.error(e);
    dispatch({ type: "CREATE_USERNAME_FAILED", payload: e.message });
  }
}

export async function createAccount(payload, dispatch) {
  const index = client.wallet.accounts.length;
  const account = await client.wallet.createAccount({ index });
  client.wallet.accounts[index] = account;
  dispatch({ type: "ACCOUNT_CREATED", payload: index });
}
