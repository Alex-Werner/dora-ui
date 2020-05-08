import React from "react";
import { connect } from "react-redux";

const options = [
  {
    value: "NEW",
    label: "Create a new contract"
  },
  {
    value: "IMPORT",
    label: "Import existing contract"
  }
];

function SelectContractFrom({ value, onChange }) {
  return (
    <fieldset>
      {options.map(o => (
        <label htmlFor={o.value} key={o.value}>
          <input
            onChange={e => onChange(e.target.value)}
            checked={value === o.value}
            type="radio"
            id={o.value}
            name={o.value}
            value={o.value}
          />
          {o.label}
        </label>
      ))}
    </fieldset>
  );
}

const stateToProps = state => {
  return {
    value: state.create.contract.from
  };
};

const dispatchToProps = dispatch => {
  return {
    onChange(value) {
      dispatch({ type: "SET_CONTRACT_FROM", payload: value });
    }
  };
};

export default connect(
  stateToProps,
  dispatchToProps
)(React.memo(SelectContractFrom));
