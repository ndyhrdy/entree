import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import Swal from "sweetalert2";
import SwalReact from "sweetalert2-react-content";

import api, { routes } from "@/api";
import { removeUnit } from "@/actions";
import { Alert } from "@/components";

const alert = SwalReact(Swal);

class InventoryUnitsConfirmDelete extends Component {
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
          .delete(routes.units + "/" + this.props.unit.id)
          .then(() => {
            this.props.removeUnit(this.props.unit.id);
            alert.fire({
              type: "success",
              title: "Gone!",
              text: this.props.unit.name + " has been deleted successfully.",
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
      unit: { name, shortName },
      onDismiss
    } = this.props;
    const { deleting, error } = this.state;

    return (
      <Fragment>
        <div className="modal-body">
          <h3>Delete Unit?</h3>
          <p>
            Are you sure you want to delete{" "}
            <strong>
              {name} ({shortName})
            </strong>
            ? If an item uses this as its primary unit, you will need to change
            its primary unit first.
          </p>

          {!!error && (
            <Alert type="danger">
              <p>{error.message}</p>
              {!!error.items && error.items.length > 0 && (
                <ul>
                  {error.items.map(item => (
                    <li key={item.slug}>
                      {item.name} ({item.sku})
                    </li>
                  ))}
                </ul>
              )}
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
            Yes, Remove
          </button>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {
  removeUnit
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InventoryUnitsConfirmDelete);
