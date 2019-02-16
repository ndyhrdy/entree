import React from "react";
import { Link } from "react-router-dom";

export default () => {
  return (
    <div className="text-center py-5">
      <div className="row justify-content-center mb-4">
        <div className="col-md-4">
          <img
            className="w-100"
            src={window.appConfig.baseURL + "/svg/undraw_QA_engineers_dg5p.svg"}
          />
        </div>
      </div>
      <div className="h4">No adjustments made, yet.</div>
      <div className="mb-4">
        Adjustments to item stock can be made when real stock quantity differs
        from what we have here.
      </div>

      <Link to="/inventory/adjustments/new" className="btn btn-primary">
        Make Adjustment
      </Link>
    </div>
  );
};
