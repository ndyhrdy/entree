import React from "react";
import { Link } from "react-router-dom";

export default () => {
  return (
    <div className="text-center py-5">
      <div className="row justify-content-center mb-4">
        <div className="col-md-4">
          <img
            className="w-100"
            src={window.appConfig.baseURL + "/svg/undraw_empty_xct9.svg"}
          />
        </div>
      </div>
      <div className="h4">No purchases, yet.</div>
      <div className="mb-4">
        You can record your purchases to get insights to how your items are
        being acquired.
      </div>

      <Link to="/purchasing/purchases/new" className="btn btn-primary">
        Record a Purchase
      </Link>
    </div>
  );
};
