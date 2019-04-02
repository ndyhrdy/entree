import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import Swal from "sweetalert2";
import SwalReact from "sweetalert2-react-content";

import api, { routes } from "@/api";
import { removeItem } from "@/actions";
import { Alert } from "@/components";

const alert = SwalReact(Swal);

class InventoryItemsSettingsGeneralConfirmDelete extends Component {
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
          .delete(routes.items + "/" + this.props.item.slug)
          .then(() => {
            this.props.removeItem(this.props.item);
            alert.fire({
              type: "success",
              title: "Gone!",
              text: this.props.item.name + " has been deleted successfully.",
              timer: 3000,
              showConfirmButton: false
            });
            return this.props.onSuccess();
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
      item: { name, sku },
      onDismiss
    } = this.props;
    const { deleting, error } = this.state;

    return (
      <Fragment>
        <div className="modal-body">
          <h3>Delete Item?</h3>
          <p>
            Are you sure you want to delete{" "}
            <strong>
              {name} ({sku})
            </strong>
            ? This action cannot be undone.
          </p>

          {!!error && (
            <Alert type="danger">
              {error.message}
            </Alert>
          )}
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
            Yes, Delete
          </button>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {
  removeItem
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InventoryItemsSettingsGeneralConfirmDelete);
