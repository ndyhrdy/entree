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
      <div className="h4">No suppliers added, yet.</div>
      <div className="mb-4">
        Suppliers are places where you buy your items from. They can be shops,
        supermarkets or retail stores.
      </div>

      <Link to="/purchasing/suppliers/new" className="btn btn-primary">
        Add a Supplier
      </Link>
    </div>
  );
};
