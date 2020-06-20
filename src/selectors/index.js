import { createSelector } from "reselect";
import { Map } from "immutable";

export const wizard = state => state.get("wizard");
export const wallet = state => state.get("wallet");
export const account = state =>
  wallet(state).getIn(
    ["accounts", state.getIn(["wallet", "selectedAccount"])],
    Map()
  );

export const username = state => account(state).get("selectedName");
export const identityId = state => account(state).get("selectedIdentityId");
export const balance = state => account(state).get("balance", Map());
export const identity = state =>
  account(state).getIn(["identities", identityId(state)], Map());
export const identityBalance = state => identity(state).get("balance", 0);

const accountStatusSelectors = [wizard, wallet, identityId, account, balance];
export const accountStatus = createSelector(accountStatusSelectors, (...r) => {
  const [wizard, wallet, identityId, account, balance] = r;

  if (wizard.get("showAccountManagement")) return "ACCOUNT_MANAGEMENT";
  if (wizard.get("showSend")) return "SEND";
  if (wizard.get("showReceive")) return "RECEIVE";
  if (wizard.get("isHidden")) return "HIDDEN";

  // if (typeof account.selected !== "number") return "SELECT_ACCOUNT";

  if (!wizard.get("mnemonicConfirmed") && !wizard.get("type")) {
    return "SELECT_WIZARD_TYPE";
  }

  if (wizard.get("type") === "IMPORT" && !wallet.get("mnemonic")) {
    return "IMPORT_FROM_MNEMONIC";
  }

  if (wizard.get("type") === "CREATE" && !wizard.get("mnemonicConfirmed")) {
    return "CONFIRM_MNEMONIC";
  }

  const total = balance.get("total");
  if (total === 0 || (wizard.get("type") === "CREATE" && !total)) {
    return "FUNDS_REQUIRED";
  }
  if (!identityId && total > 0) {
    return "CREATE_USERNAME";
  }

  return "HIDDEN";
});
