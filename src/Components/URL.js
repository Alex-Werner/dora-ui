import React from "react";
import { connect } from "react-redux";

import { Input, URLForm } from "../Styles";

function URL() {
  return (
    <URLForm onSubmit={e => e.preventDefault()}>
      <Input
        type="text"
        onChange={e => {}}
        value="dora.dash"
        variant="lightOnDark"
      />
    </URLForm>
  );
}

const stateToProps = state => {
  return {};
};

const dispatchToProps = dispatch => {
  return {};
};

export default connect(stateToProps, dispatchToProps)(React.memo(URL));
