import { createSelector } from "reselect";

const account = state => state.account;
const wallet = state => state.wallet;
const wizard = state => state.wizard;
const loading = state => state.loading;
const identity = state => state.identity;

const selectors = [account, wallet, wizard, loading, identity];

export default createSelector(selectors, (...args) => {
  const [account, wallet, wizard, loading, identity] = args;

  if (wizard.isHidden || loading.wallet) return "HIDDEN";

  // if (typeof account.selected !== "number") return "SELECT_ACCOUNT";

  if (!wizard.mnemonicConfirmed && !wizard.type) return "SELECT_WIZARD_TYPE";

  if (wizard.type === "CREATE" && !wizard.mnemonicConfirmed) {
    return "CONFIRM_MNEMONIC";
  }

  if (loading.account) return "HIDDEN";

  if (account.balance.total === 0) return "FUNDS_REQUIRED";

  // if (account.current.username) return "HIDDEN";

  // if (!account.current.from) {
  //   if (Object.keys(account.available).length === 0) {
  //     return "SELECT_NEW_ACCOUNT_FROM";
  //   } else {
  //     return "SELECT_ACCOUNT";
  //   }
  // }

  // if (account.current.from === "CREATE" && !account.current.confirmed) {
  //   return "NEW_WALLET";
  // }

  // if (!account.isReady) return "LOADING";

  // if (account.current.id && account.current.balance === 0) {
  //   return "FUNDS_REQUIRED";
  // }

  // if (account.current.id && !account.current.username) {
  //   return "USERNAME_REQUIRED";
  // }

  return "HIDDEN";
});
