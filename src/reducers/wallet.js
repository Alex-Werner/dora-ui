import { OrderedMap, Map, List } from "immutable";

const initial = Map({
  mnemonic: null,
  id: null,
  from: "DEFAULT",
  selectedAccount: null,
  accounts: List()
});

const initialAccount = Map({
  balance: Map({
    confirmed: null,
    unconfirmed: null,
    total: null
  }),
  incomingPayment: null,
  address: null,
  identities: Map(),
  identityIdByName: OrderedMap(),
  selectedName: null,
  selectedIdentityId: null
});

const initialIdentity = Map({
  balance: null,
  names: List()
});

export default (state = initial, action) => {
  const a = action.payload;
  const acc = () => ["accounts", a.index];
  const id = () => [...acc(), "identities", a.identityId];

  switch (action.type) {
    case "WALLET_CREATED":
      return state.set("mnemonic", a.mnemonic).set("id", a.id);

    case "SELECT_ACCOUNT":
      return state
        .set("selectedAccount", a)
        .setIn(["accounts", a, "incomingPayment"], null);

    case "CREATING_ACCOUNT":
      return state
        .set("selectedAccount", a)
        .setIn(["accounts", a], initialAccount);

    case "ACCOUNT_BALANCE_UPDATED":
      return state
        .setIn([...acc(), "balance"], Map(a.balance))
        .setIn([...acc(), "incomingPayment"], null);

    case "ACCOUNT_ADDRESS_UPDATED":
      return state.setIn([...acc(), "address"], a.address);

    case "IDENTITY_CREATED":
      return state.setIn(id(), initialIdentity);

    case "USERNAME_CREATED":
      return state
        .updateIn([...id(), "names"], names => names.push(a.username))
        .setIn([...acc(), "identityIdByName", a.username], a.identityId);

    case "IDENTITY_BALANCES_UPDATED":
      return Object.keys(a.balances).reduce((state, id) => {
        const balance = a.balances[id];
        console.log(state.getIn([...acc(), "identities", id, "balance"]));
        return state.setIn([...acc(), "identities", id, "balance"], balance);
      }, state);

    case "SELECT_USERNAME":
      return state
        .setIn([...acc(), "selectedName"], a.username)
        .setIn(
          [...acc(), "selectedIdentityId"],
          state.getIn([...acc(), "identityIdByName", a.username])
        );

    case "WALLET_IMPORT_COMPLETED":
      const walletUpdate = state
        .set("mnemonic", a.wallet.mnemonic)
        .set("id", a.wallet.id);

      const accountUpdate = a.accounts.reduce((state, index) => {
        return state.setIn(["accounts", index], initialAccount);
      }, walletUpdate);

      const newState = Object.keys(a.identitiesByAccount).reduce((state, i) => {
        const identities = a.identitiesByAccount[i];
        const acc = ["accounts", i];
        return Object.keys(identities).reduce((state, id) => {
          const names = identities[id];
          const withIdentity = state.setIn(
            [...acc, "identities", id],
            initialIdentity.set("names", List(names))
          );

          return identities[id].reduce((state, name) => {
            return state.setIn([...acc, "identityIdByName", name], id);
          }, withIdentity);
        }, state);
      }, accountUpdate);

      return newState;

    case "PAYMENT_RECEIVED":
      return state.setIn(
        [...acc(), "incomingPayment"],
        Map({
          amount: a.amount,
          newBalance: a.newBalance
        })
      );

    case "DISCARD_WALLET":
      return initial;

    default:
      return state;
  }
};
