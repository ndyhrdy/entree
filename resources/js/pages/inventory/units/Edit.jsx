import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, Prompt } from "react-router-dom";

import api, { routes } from "@/api";
import { Alert } from "@/components";
import { fetchUnits, populateUnits } from "@/actions";

const defaultData = {
  name: "",
  shortName: "",
  pluralName: "",
  isDefault: false
};

export class InventoryUnitsEdit extends Component {
  constructor(props) {
    super(props);
    const matchedUnits = [
      ...props.units.data.filter(unit => unit.id === this.resolveId())
    ];

    this.state = {
      matchedUnits,
      data: {
        ...(matchedUnits.length > 0 ? matchedUnits[0] : defaultData)
      },
      showMakeDefault:
        matchedUnits.length > 0 ? !matchedUnits[0].isDefault : true,

      isSaving: false,
      isDirty: false,
      unresolvable: false,
      validationErrors: null
    };
  }

  componentDidMount() {
    if (this.state.matchedUnits.length === 0) {
      this.props.fetchUnits();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.units.fetching && !nextProps.units.fetching) {
      const matchedUnits = [
        ...nextProps.units.data.filter(unit => unit.id === this.resolveId())
      ];
      this.setState({
        matchedUnits,
        data: {
          ...this.state.data,
          ...(matchedUnits.length > 0 ? matchedUnits[0] : defaultData)
        },
        unresolvable: matchedUnits.length === 0
      });
    }
  }

  resolveId() {
    return parseInt(this.props.match.params.id.split(":")[0]);
  }

  onSubmit() {
    if (this.state.isSaving) {
      return;
    }
    this.setState({ isSaving: true, validationErrors: null }, () => {
      return api
        .patch(routes.units + "/" + this.resolveId(), this.state.data)
        .then(response => {
          this.setState({ isDirty: false });
          this.props.populateUnits([...response.data.data]);
          return this.props.history.push("/inventory/units?_flow=edit-success");
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
      data: { name, shortName, pluralName, isDefault },
      isSaving,
      isDirty,
      showMakeDefault,
      validationErrors
    } = this.state;
    const {
      units: { fetching: fetchingUnits }
    } = this.props;

    return (
      <div className="container py-5">
        <ol className="breadcrumb mb-5">
          <li className="breadcrumb-item">
            <Link to="/inventory/units" replace>
              Units
            </Link>
          </li>
          <li className="breadcrumb-item active">Edit Unit</li>
        </ol>

        <h3 className="mb-4">Edit Unit</h3>

        <div className="row">
          <div className="col-lg-6 col-md-9">
            <Alert type="info">
              <h5>A note on editing units</h5>
              <div>
                If a transaction has been made on an item with this unit as the
                assigned unit, modifying this unit will also change the units
                made in those transactions.
              </div>
            </Alert>
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
                disabled={isSaving || fetchingUnits}
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
                disabled={isSaving || fetchingUnits}
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
                disabled={isSaving || fetchingUnits}
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
            {showMakeDefault && (
              <div className="form-group">
                <div className="custom-control custom-checkbox">
                  <input
                    type="checkbox"
                    className="custom-control-input"
                    checked={isDefault}
                    disabled={isSaving || fetchingUnits}
                    onChange={() =>
                      !isSaving &&
                      !fetchingUnits &&
                      this.setState({
                        data: { ...this.state.data, isDefault: !isDefault },
                        isDirty: true
                      })
                    }
                  />
                  <label
                    className="custom-control-label"
                    onClick={() =>
                      !isSaving &&
                      !fetchingUnits &&
                      this.setState({
                        data: { ...this.state.data, isDefault: !isDefault },
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
            )}
            <div className="mt-5">
              <button
                type="button"
                onClick={() => this.onSubmit()}
                className="btn btn-primary"
                disabled={isSaving || fetchingUnits}>
                {isSaving ? "Please wait.." : "Save Changes"}
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
  units: state.units
});

const mapDispatchToProps = {
  populateUnits,
  fetchUnits
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InventoryUnitsEdit);
