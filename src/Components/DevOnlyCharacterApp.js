import React from "react";
import { connect } from "react-redux";

function DevOnlyCharacterApp({ runQuery }) {
  React.useEffect(() => {
    runQuery({});
  }, []);

  return (
    <div id="character-app">
      <h2>Timeline App</h2>
    </div>
  );
}

const stateToProps = state => {
  return {};
};

const dispatchToProps = dispatch => {
  return {
    runQuery(query) {
      dispatch({
        type: "DO_QUERY",
        payload: { id: "CHARAPP", payload: query }
      });
    }
  };
};

export default connect(
  stateToProps,
  dispatchToProps
)(React.memo(DevOnlyCharacterApp));
