import React from "react";
import { connect } from "react-redux";

const CreateContract = React.lazy(() => import("./CreateContract"));
const ImportContract = React.lazy(() => import("./ImportContract"));
const SelectContractFrom = React.lazy(() => import("./SelectContractFrom"));
const SelectApplicationName = React.lazy(() =>
  import("./SelectApplicationName")
);

function PageCreateApplication({ stage, importExisting }) {
  return (
    <div className="page">
      <h1>Create a Dora Application</h1>
      {stage === "DEFINE_CONTRACT" && <SelectContractFrom />}
      {stage === "DEFINE_CONTRACT" && !importExisting && <CreateContract />}
      {stage === "DEFINE_CONTRACT" && !!importExisting && <ImportContract />}
      {stage === "SELECT_NAME" && <SelectApplicationName />}
    </div>
  );
}

const stateToProps = state => {
  return {
    stage: state.create.stage,
    importExisting: state.create.contract.from === "IMPORT"
  };
};

export default connect(stateToProps)(React.memo(PageCreateApplication));
