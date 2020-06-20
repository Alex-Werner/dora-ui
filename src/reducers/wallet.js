import { Map, List } from "immutable";

const initial = Map({
  mnemonic: null,
  id: null,
  from: "DEFAULT",
  selectedAccount: null,
  accounts: Map()
});

const initialAccount = Map({
  balance: Map({
    confirmed: null,
    unconfirmed: null,
    total: null
  }),
  address: null,
  identities: Map(),
  identityIdByName: Map(),
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
    case "WALLET_IMPORT_COMPLETED":
      return state.set("mnemonic", a.mnemonic).set("id", a.id);

    case "SELECT_ACCOUNT":
      return state.set("selectedAccount", a);

    case "ACCOUNT_CREATED":
      return state.set("selected", a).setIn(["accounts", a], initialAccount);

    case "ACCOUNT_BALANCE_UPDATED":
      return state.setIn([...acc(), "balance"], a.balance);

    case "ACCOUNT_ADDRESS_UPDATED":
      return state.setIn([...acc(), "address"], a.address);

    case "IDENTITY_FOUND":
    case "IDENTITY_CREATED":
      return state.setIn(id(), initialIdentity);

    case "USERNAME_CREATED":
      return state
        .updateIn([...id(), "names"], names => names.push(a.username))
        .setIn([...acc(), "identityByName", a.username], a.identityId);

    case "IDENTITY_BALANCES_UPDATED":
      return state.setIn([...id(), "balance"], a);

    case "SELECT_USERNAME":
      return state
        .setIn([...acc(), "selectedName"], a)
        .setIn(
          [...acc(), "selectedIdentityId"],
          state.getIn([...acc(), "identityIdByName", a])
        );

    default:
      return state;
  }
};
