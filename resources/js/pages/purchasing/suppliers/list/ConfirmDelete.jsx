import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import Swal from "sweetalert2";
import SwalReact from "sweetalert2-react-content";

import api, { routes } from "@/api";
import { removeSupplier } from "@/actions";
import { Alert } from "@/components";

const alert = SwalReact(Swal);

class PurchasingSuppliersConfirmDelete extends Component {
  constructor(props) {
    super(props);

    this.state = {
      deleting: false,
      error: null
    };
  }

  onConfirm() {
    return this.setState(
      {
        deleting: true,
        error: null
      },
      () => {
        return api
          .delete(routes.suppliers + "/" + this.props.supplier.id)
          .then(() => {
            this.props.removeSupplier(this.props.supplier);
            alert.fire({
              type: "success",
              title: "Gone!",
              text:
                this.props.supplier.name + " has been deleted successfully.",
              timer: 3000,
              showConfirmButton: false
            });
            return this.props.onDismiss();
          })
          .catch(error =>
            this.setState({
              deleting: false,
              error: error.response ? error.response.data : error
            })
          );
      }
    );
  }

  render() {
    const {
      supplier: { name },
      onDismiss
    } = this.props;
    const { deleting, error } = this.state;

    return (
      <Fragment>
        <div className="modal-body">
          <h3>Delete Supplier?</h3>
          <p>
            Are you sure you want to delete <strong>{name}</strong>? All history
            for this supplier will be kept.
          </p>

          {!!error && <Alert type="danger">{error.message}</Alert>}
        </div>
        <div className="modal-footer">
          <button
            onClick={() => onDismiss()}
            className="btn btn-link"
            disabled={deleting}>
            I changed my mind
          </button>
          <button
            onClick={() => this.onConfirm()}
            className="btn btn-danger"
            disabled={deleting}>
            Yes, Remove
          </button>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {
  removeSupplier
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PurchasingSuppliersConfirmDelete);
