import { createSelector } from "reselect";

const account = state => state.account;
const wallet = state => state.wallet;
const wizard = state => state.wizard;
const loading = state => state.loading;
const identity = state => state.identity;

const selectors = [account, wallet, wizard, loading, identity];

export default createSelector(selectors, (...args) => {
  const [account, wallet, wizard, loading, identity] = args;

  if (wizard.showAccountManagement) return "ACCOUNT_MANAGEMENT";
  if (wizard.isHidden || loading.wallet) return "HIDDEN";

  // if (typeof account.selected !== "number") return "SELECT_ACCOUNT";

  if (!wizard.mnemonicConfirmed && !wizard.type) return "SELECT_WIZARD_TYPE";

  if (wallet.requiresPlatformImport) return "IMPORT_PLATFORM_DATA";
  if (wizard.type === "IMPORT" && !wallet.requiresPlatformImport) {
    return "IMPORT_FROM_MNEMONIC";
  }

  if (wizard.type === "CREATE" && !wizard.mnemonicConfirmed) {
    return "CONFIRM_MNEMONIC";
  }

  const balance = account.balances[account.selected] || {};
  if (balance.total === 0 && !loading.account) return "FUNDS_REQUIRED";
  if (identity.names.length === 0 && balance.total > 0) {
    return "CREATE_USERNAME";
  }

  return "HIDDEN";
});
