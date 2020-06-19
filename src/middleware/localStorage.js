import SecureLS from "secure-ls";
import get from "lodash/get";
import set from "lodash/set";
import update from "lodash/update";

const ls = new SecureLS();

const ROOT_KEY = "lsv1";

export default store => next => action => {
  next(action);

  const { dispatch, getState } = store;
  const { payload } = action;
  const selected = getState().account.selected || 0;

  switch (action.type) {
    case "INIT":
      const wallet = lsGet("wallet");
      if (wallet) {
        dispatch({ type: "WALLET_FOUND_IN_LOCAL_STORAGE", payload: wallet });
      } else {
        dispatch({ type: "WALLET_NOT_FOUND_IN_LOCAL_STORAGE" });
      }
      break;

    case "CONFIRM_MNEMONIC":
      lsUpdate("wallet.mnemonicConfirmed", v => true);
      lsSet("wallet", getState().wallet);
      break;

    case "WALLET_IMPORT_COMPLETED":
      lsSet("wallet", getState().wallet);
      break;

    case "WALLET_LOADED":
      const lastSelected = lsGet("selectedAccount");

      dispatch({
        type: "SELECTED_ACCOUNT_FOUND_IN_LOCAL_STORAGE",
        payload: lastSelected
      });
      break;

    case "ACCOUNT_CREATED_ON_NEW_WALLET":
      lsSet("selectedAccount", payload);
      lsSet("selectedAccount", payload);
      lsSet(`accounts.${payload}`, {
        names: [],
        selectedName: null,
        identity: null
      });
      break;

    case "SELECT_ACCOUNT":
    case "ACCOUNT_SELECTED_ON_IMPORTED_WALLET":
      lsSet("selectedAccount", payload);
      break;

    case "ACCOUNT_CREATED":
      lsSet("selectedAccount", payload);
      lsSet(`accounts.${payload}`, {
        names: [],
        selectedName: null,
        identity: null
      });
      break;

    case "ACCOUNT_LOADED":
      const names = lsGet(`accounts.${payload}.names`, []);
      const selectedName = lsGet(`accounts.${payload}.selectedName`);

      const nameLoadType = names.length
        ? "ACCOUNT_NAMES_FOUND_IN_LOCAL_STORAGE"
        : "ACCOUNT_NAMES_NOT_FOUND_IN_LOCAL_STORAGE";

      dispatch({ type: nameLoadType, payload: { names, selectedName } });
      break;

    case "ACCOUNT_NAMES_NOT_FOUND_IN_LOCAL_STORAGE":
      // If user has already created an identity but not username, unlikely
      // occurrance. In this case, the created identity will be available for use.
      const createdIdentity = lsGet(`accounts.${selected}.identity`);
      const createdIdentityLoadType = createdIdentity
        ? "CREATED_IDENTITY_FOUND_IN_LOCAL_STORAGE"
        : "CREATED_IDENTITY_NOT_FOUND_IN_LOCAL_STORAGE";

      dispatch({ type: createdIdentityLoadType, payload: createdIdentity });
      break;

    case "CREATED_IDENTITY":
      lsSet(`accounts.${selected}.identity`, action.payload);
      break;

    case "USERNAME_CREATED":
      lsUpdate(`accounts.${selected}.names`, names => {
        const original = names || [];
        return [...original, payload];
      });
      break;

    case "SELECT_USERNAME":
      lsSet(`accounts.${selected}.selectedName`, payload);
      break;

    case "PLATFORM_DATA_IMPORTED":
      lsSet("wallet.requiresPlatformImport", false);
      payload.forEach((accountNames, i) => {
        lsSet(`accounts.${i}`, {
          names: accountNames,
          identity: accountNames[0] ? accountNames[0].identityId : null,
          selectedName: accountNames[0] ? accountNames[0].username : null
        });
      });
      break;

    default:
      return;
  }
};

export function lsGet(key, defaultValue = null) {
  const root = JSON.parse(ls.get(ROOT_KEY) || "{}");
  return get(root, key, defaultValue);
}

export function lsSet(key, value) {
  const root = JSON.parse(ls.get(ROOT_KEY) || "{}");
  const updated = set(root, key, value);
  ls.set(ROOT_KEY, JSON.stringify(updated));
}

export function lsUpdate(key, updater) {
  const root = JSON.parse(ls.get(ROOT_KEY) || "{}");
  const updated = update(root, key, updater);
  ls.set(ROOT_KEY, JSON.stringify(updated));
}
