import React from "react";
import { connect } from "react-redux";

function SelectApplicationName({ register }) {
  const [name, setName] = React.useState("");

  return (
    <form onSubmit={e => e.preventDefault() || register(name)}>
      <p>
        Choose a name for your application. Users will be able to view your
        application at <strong>{name || "<appname>"}.dora</strong>
      </p>
      <label htmlFor="name">Application Name</label>
      <input
        type="text"
        value={name}
        onChange={e => setName(e.target.value)}
        id="name"
        name="name"
      />
      <button type="submit">Register Application Name</button>
    </form>
  );
}

const stateToProps = state => {
  return {};
};

const dispatchToProps = dispatch => {
  return {
    register(name) {
      dispatch({ type: "DO_REGISTER_APP_NAME", payload: name });
    }
  };
};

export default connect(
  stateToProps,
  dispatchToProps
)(React.memo(SelectApplicationName));
