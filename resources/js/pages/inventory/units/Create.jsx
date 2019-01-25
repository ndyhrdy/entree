import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, Prompt } from "react-router-dom";

import api, { routes } from "@/api";
import { populateUnits } from "@/actions";

export class InventoryUnitsCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        name: "",
        shortName: "",
        pluralName: "",
        makeDefault: false
      },

      isSaving: false,
      isDirty: false,
      validationErrors: null
    };
  }

  onSubmit() {
    if (this.state.isSaving) {
      return;
    }
    this.setState({ isSaving: true, validationErrors: null }, () => {
      return api
        .post(routes.units, this.state.data)
        .then(response => {
          this.setState({ isDirty: false });
          populateUnits([...response.data.data]);
          return this.props.history.push("/inventory/units");
        })
        .catch(error => {
          this.setState({ isSaving: false });
          if (error.response && error.response.data.errors) {
            return this.setState({
              validationErrors: error.response.data.errors
            });
          }
        });
    });
  }

  render() {
    const {
      data: { name, shortName, pluralName, makeDefault },
      isSaving,
      isDirty,
      validationErrors
    } = this.state;

    return (
      <div className="container py-5">
        <ol className="breadcrumb mb-5">
          <li className="breadcrumb-item">
            <Link to="/inventory/units" replace>
              Units
            </Link>
          </li>
          <li className="breadcrumb-item active">Add a Unit</li>
        </ol>

        <h3 className="mb-4">Add a Unit</h3>
        <div className="row">
          <div className="col-lg-6 col-md-9">
            <div className="form-group">
              <label>Unit Name</label>
              <input
                type="text"
                className={
                  "form-control" +
                  (validationErrors && validationErrors.name
                    ? " is-invalid"
                    : "")
                }
                disabled={isSaving}
                value={name}
                placeholder="piece, box, pack..."
                onChange={e =>
                  this.setState({
                    data: { ...this.state.data, name: e.target.value },
                    isDirty: true
                  })
                }
              />
              {validationErrors && validationErrors.name && (
                <div className="invalid-feedback">
                  {validationErrors.name[0]}
                </div>
              )}
            </div>
            <div className="form-group">
              <label>Short Name</label>
              <input
                type="text"
                className={
                  "form-control" +
                  (validationErrors && validationErrors.shortName
                    ? " is-invalid"
                    : "")
                }
                disabled={isSaving}
                value={shortName}
                placeholder="pcs, kg, m..."
                onChange={e =>
                  this.setState({
                    data: { ...this.state.data, shortName: e.target.value },
                    isDirty: true
                  })
                }
              />
              {validationErrors && validationErrors.shortName && (
                <div className="invalid-feedback">
                  {validationErrors.shortName[0]}
                </div>
              )}
              <div className="form-text text-muted small">
                Optional. If nothing is given, we will use the full unit name
                above.
              </div>
            </div>
            <div className="form-group">
              <label>Plural Name</label>
              <input
                type="text"
                className={
                  "form-control" +
                  (validationErrors && validationErrors.pluralName
                    ? " is-invalid"
                    : "")
                }
                disabled={isSaving}
                value={pluralName}
                onChange={e =>
                  this.setState({
                    data: { ...this.state.data, pluralName: e.target.value },
                    isDirty: true
                  })
                }
              />
              {validationErrors && validationErrors.pluralName && (
                <div className="invalid-feedback">
                  {validationErrors.pluralName[0]}
                </div>
              )}
              <div className="form-text text-muted small">
                Optional. If nothing is given, we will decide for you based on
                the English language.
              </div>
            </div>
            <div className="form-group">
              <div className="custom-control custom-checkbox">
                <input
                  type="checkbox"
                  className="custom-control-input"
                  checked={makeDefault}
                  onChange={() =>
                    this.setState({
                      data: { ...this.state.data, makeDefault: !makeDefault },
                      isDirty: true
                    })
                  }
                />
                <label
                  className="custom-control-label"
                  onClick={() =>
                    this.setState({
                      data: { ...this.state.data, makeDefault: !makeDefault },
                      isDirty: true
                    })
                  }>
                  Set as Default Unit
                </label>
              </div>
              <div className="form-text text-muted small">
                If checked, this unit will be pre-selected as the primary unit
                when making new items.
              </div>
            </div>

            <div className="mt-5">
              <button
                type="button"
                onClick={() => this.onSubmit()}
                className="btn btn-primary"
                disabled={isSaving}>
                {isSaving ? "Please wait.." : "Add Unit"}
              </button>
            </div>

            <Prompt
              when={isDirty}
              message="Are you sure? Your changes will be lost."
            />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  store: state.activeStore.data,
  units: state.units.data
});

const mapDispatchToProps = {
  populateUnits
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InventoryUnitsCreate);
