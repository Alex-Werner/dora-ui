import React from "react";
import { connect } from "react-redux";

function AccountCreateUsername({ createUsername }) {
  const [username, setUsername] = React.useState("");

  return (
    <div className="create-username">
      <h2>Choose a username</h2>
      <p>To get the most out of the Dash Platform, please create a username.</p>
      <p>
        Other users will be able to interract and transact with you through this
        name.
      </p>
      <form onSubmit={e => e.preventDefault() || createUsername(username)}>
        <div className="form-row">
          <label htmlFor="username">Username</label>
          <input
            name="username"
            id="username"
            value={username}
            onChange={e => setUsername(e.target.value)}
            placeholder="Choose a username"
          />
        </div>
        <button type="submit">Confirm Username</button>
      </form>
    </div>
  );
}

const stateToProps = state => {
  return {};
};

const dispatchToProps = dispatch => {
  return {
    createUsername(username) {
      dispatch({ type: "DO_CREATE_USERNAME", payload: username });
    }
  };
};

export default connect(
  stateToProps,
  dispatchToProps
)(React.memo(AccountCreateUsername));
