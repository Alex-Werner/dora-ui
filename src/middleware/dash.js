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

      const storedWalletIdentity = ls.get(`identity:${selectedWalletId}`);
      const storedWalletApps = ls.get(`apps:${selectedWalletId}`) || "{}";
      const walletIdentity = storedWalletIdentity
        ? storedWalletIdentity
        : await client.platform.identities.register("user");

      ls.set(`identity:${selectedWalletId}`, walletIdentity);
      store.dispatch({
        type: "WALLET_READY",
        payload: {
          account: walletAccount,
          identityId: walletIdentity,
          apps: JSON.parse(storedWalletApps)
        }
      });
      break;

    case "DO_FIND_IDENTITY":
      const createdIdentity = await client.platform.identities.register("user");
      ls.set(`identity:${action.payload}`, createdIdentity);
      break;

    case "DO_CREATE_CONTRACT":
      const storedContractIdentity = store.getState().create.contract.identity;
      const contractIdentityId = storedContractIdentity
        ? storedContractIdentity
        : await client.platform.identities.register("application");

      store.dispatch({
        type: "CONTRACT_IDENTITY_CREATED",
        payload: contractIdentityId
      });

      const contractIdentity = await client.platform.identities.get(
        contractIdentityId
      );
      const contractJSON = JSON.parse(action.payload);
      const createdContract = await client.platform.contracts.create(
        contractJSON,
        contractIdentity
      );

      await client.platform.contracts.broadcast(
        createdContract,
        contractIdentity
      );

      store.dispatch({ type: "CONTRACT_CREATED" });
      break;

    case "DO_REGISTER_APP_NAME":
      const appIdentityIdToRegister = store.getState().create.contract.identity;
      const nameRegIdentity = await client.platform.identities.get(
        appIdentityIdToRegister,
        "application"
      );

      await client.platform.names.register(action.payload, nameRegIdentity);

      const appWallet = store.getState().wallet.currentWalletId;
      const currentStoredApps = JSON.parse(ls.get(`apps:${appWallet}`) || "{}");
      const newStoredApps = JSON.stringify({
        ...currentStoredApps,
        [action.payload]: appIdentityIdToRegister
      });

      ls.set(`apps:${appWallet}`, newStoredApps);
      break;

    default:
      return;
  }
};
