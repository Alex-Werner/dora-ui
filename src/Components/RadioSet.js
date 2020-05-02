import React from "react";
import { Label, Radio } from "@rebass/forms";
import { Box, Text } from "rebass";

function RadioSet({ options, value, onChange, name }) {
  return (
    <Box as="fieldset" variant="formRow">
      {options.map(o => {
        return (
          <Label variant="check">
            <Radio
              name={name}
              onChange={e => onChange(o.value)}
              checked={value === o.value}
            />
            <Box>
              {o.label}
              <Text
                as="small"
                fontSize={0}
                mt={1}
                fontWeight="normal"
                sx={{ display: "block" }}
              >
                {o.smallText}
              </Text>
            </Box>
          </Label>
        );
      })}
    </Box>
  );
}

export default React.memo(RadioSet);
