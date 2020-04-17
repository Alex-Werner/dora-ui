import React from "react";
import { connect } from "react-redux";

import EditApplicationList from "./EditApplicationList";
import ApplicationEditor from "./ApplicationEditor";

function PageEditApplications() {
  return (
    <div className="page">
      <div className="edit-application-list">
        <EditApplicationList />
      </div>
      <div className="application-editor">
        <ApplicationEditor />
      </div>
    </div>
  );
}

export default React.memo(PageEditApplications);
