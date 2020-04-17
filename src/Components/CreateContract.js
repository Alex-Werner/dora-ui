import React from "react";
import { connect } from "react-redux";
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-json";
import "prismjs/themes/prism-solarizedlight.css";

function CreateContract({ createContract, savedContract }) {
  const [contract, setContract] = React.useState(savedContract);

  const onSubmit = e => {
    e.preventDefault();
    createContract(contract);
  };

  return (
    <form className="create-contract" onSubmit={onSubmit}>
      <h2>Define a Contract</h2>
      <p>Use the editor below to setup the contract for your application.</p>
      <p>
        Contracts are schemas for your application's data structure. You can{" "}
        <a href="https://dashplatform.readme.io/docs/reference-data-contracts">
          read more about contracts here.
        </a>
      </p>
      <div className="json-editor">
        <Editor
          value={contract}
          onValueChange={setContract}
          highlight={value => highlight(value, languages.json)}
          preClassName="language-json"
          padding={10}
          style={{ background: "#fdf6e3", fontSize: 12, fontFamily: "mono" }}
        />
      </div>
      <button type="submit">Create Contract</button>
    </form>
  );
}

const stateToProps = state => {
  return {
    savedContract: state.create.contract.contract
  };
};

const dispatchToProps = dispatch => {
  return {
    createContract(contract) {
      dispatch({ type: "DO_CREATE_CONTRACT", payload: contract });
    }
  };
};

export default connect(
  stateToProps,
  dispatchToProps
)(React.memo(CreateContract));
