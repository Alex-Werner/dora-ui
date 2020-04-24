import React from "react";
import { connect } from "react-redux";

function ApplicationEditor({ name, isLoading }) {
  if (!name) return <p>Select an app from the list to edit.</p>;
  if (isLoading) return <p>Loading...</p>;

  return (
    <React.Fragment>
      <h1>Editing "{name}"</h1>
    </React.Fragment>
  );
}

const stateToProps = state => {
  return {
    isLoading: state.apps.isLoading,
    name: state.apps.selected,
    contentType: state.apps.current.contentType,
    content: state.apps.current.content
  };
};

const dispatchToProps = dispatch => {
  return {
    setContentType(value) {
      dispatch({ type: "SET_APPLICATION_CONTENT_TYPE", payload: value });
    },
    setContent(content) {
      dispatch({ type: "SET_APPLICATION_CONTENT", payload: content });
    }
  };
};

export default connect(stateToProps)(React.memo(ApplicationEditor));
