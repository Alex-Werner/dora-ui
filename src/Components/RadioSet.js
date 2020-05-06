import React from "react";

import Checkbox from "./Checkbox";
import { Fieldset, Label, FieldInfo } from "../Styles";

function RadioSet({ options, value, onChange, name }) {
  return (
    <Fieldset>
      {options.map(o => {
        return (
          <Label checked={value === o.value} key={o.value}>
            <Checkbox
              type="radio"
              name={name}
              onChange={e => onChange(o.value)}
              checked={value === o.value}
            />
            <span>
              {o.label}
              <FieldInfo>{o.info}</FieldInfo>
            </span>
          </Label>
        );
      })}
    </Fieldset>
  );
}

export default React.memo(RadioSet);
