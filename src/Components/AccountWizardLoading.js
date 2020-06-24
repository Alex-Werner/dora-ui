import React from "react";

import { LoadingWizard } from "../Styles";
import LoadingInline from "./LoadingInline";

function AccountWizardLoading({ children, Icon }) {
  return (
    <LoadingWizard>
      <div>
        {Icon && <Icon />}
        <LoadingInline />
      </div>
      <p>{children}</p>
    </LoadingWizard>
  );
}

export default React.memo(AccountWizardLoading);
