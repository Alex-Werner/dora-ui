import React from "react";
import { connect } from "react-redux";
import { UserAstronaut } from "@styled-icons/fa-solid/UserAstronaut";

import {
  Form,
  Input,
  Label,
  ActionButton,
  FieldInfo,
  FieldError
} from "../Styles";
import AccountWizardLoading from "./AccountWizardLoading";

const errorText = {
  "Invalid state transition":
    "That username already exists, please try something else."
};

function AccountCreateUsername({ createUsername, isLoading, error }) {
  const [username, setUsername] = React.useState("");

  return !isLoading ? (
    <div className="create-username">
      <h2>Choose a username</h2>
      <p>To get the most out of the Dash Platform, please create a username.</p>
      <p>
        Other users will be able to interract and transact with you through this
        name.
      </p>
      <Form onSubmit={e => e.preventDefault() || createUsername(username)}>
        <Label htmlFor="username">Username</Label>
        <Input
          name="username"
          id="username"
          value={username}
          disabled={isLoading}
          required={true}
          minLength={3}
          maxLength={60}
          pattern="[a-z0-9]+"
          onChange={e => setUsername(e.target.value)}
          placeholder="Choose a username"
        />
        <FieldInfo>Lower-case letters and numbers only</FieldInfo>
        <FieldError isVisible={!!error}>
          {error && (errorText[error] || "Username registration failed")}
        </FieldError>
        <ActionButton type="submit">Confirm Username</ActionButton>
      </Form>
    </div>
  ) : (
    <AccountWizardLoading Icon={UserAstronaut}>
      Registering your username on the Dash Platform...
    </AccountWizardLoading>
  );
}

const stateToProps = state => {
  return {
    isLoading: state.getIn(["loading", "createUsername"]),
    error: state.getIn(["error", "createUsername"])
  };
};

const dispatchToProps = dispatch => {
  return {
    createUsername(username) {
      dispatch({ type: "CREATE_USERNAME", payload: username });
    }
  };
};

export default connect(
  stateToProps,
  dispatchToProps
)(React.memo(AccountCreateUsername));
