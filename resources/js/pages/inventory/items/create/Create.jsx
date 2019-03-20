import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, Prompt } from "react-router-dom";
import { CancelToken, isCancel } from "axios";
import { ExpandMore as ExpandMoreIcon } from "styled-icons/material";

import api, { routes } from "@/api";
import { fetchUnits, populateItems } from "@/actions";
import { Alert, FormSection, QuantityInput, UnitPicker } from "@/components";

let cancelRequest;

class InventoryItemsCreate extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sku: "",
      name: "",
      description: "",

      isStockMonitored: false,
      primaryUnit: null,
      initialQuantity: 0,

      isDirty: false,
      saving: false,
      errors: {}
    };
  }

  componentDidMount() {
    this.props.fetchUnits();
  }

  componentWillUnmount() {
    cancelRequest && cancelRequest();
  }

  handleChange(field, value) {
    return this.setState({ [field]: value, isDirty: true });
  }

  handleSubmit(postAction = null) {
    if (this.state.saving) {
      return;
    }
    return this.setState({ saving: true, errors: {} }, async () => {
      try {
        const {
          sku,
          name,
          description,
          isStockMonitored,
          initialQuantity,
          primaryUnit
        } = this.state;
        const response = await api.post(
          routes.items,
          {
            sku,
            name,
            description,
            isStockMonitored,
            initialQuantity,
            primaryUnit
          },
          {
            cancelToken: new CancelToken(c => (cancelRequest = c))
          }
        );
        const { data: items } = response.data;
        this.props.populateItems(items);
        return this.setState({ isDirty: false }, () => {
          switch (postAction) {
            case "settings":
              return this.props.history.push(
                "/inventory/items/" +
                  item.slug +
                  "/settings?_flow=create-success"
              );
            case "summary":
              return this.props.history.push(
                "/inventory/items/" + item.slug + "?_flow=create-success"
              );
            default:
              return this.props.history.push(
                "/inventory/items?_flow=create-success"
              );
          }
        });
      } catch (error) {
        if (!isCancel(error)) {
          this.setState({
            saving: false,
            errors: error.response
              ? error.response.data.errors || {
                  server: error.response.data.message
                }
              : { server: error.toString() }
          });
        }
      }
    });
  }

  render() {
    const {
      description,
      errors,
      initialQuantity,
      isDirty,
      isStockMonitored,
      name,
      primaryUnit,
      saving,
      sku
    } = this.state;
    const {
      units: { data: units, fetching: fetchingUnits }
    } = this.props;

    return (
      <div className="container py-5">
        <ol className="breadcrumb mb-4">
          <li className="breadcrumb-item">
            <Link to="/inventory/items" replace>
              All Items
            </Link>
          </li>
          <li className="breadcrumb-item active">Add an Item</li>
        </ol>

        <h3 className="mb-4">Add an Item</h3>

        <div className="row">
          <div className="col-lg-9">
            {!!errors.server && <Alert type="danger">{errors.server}</Alert>}
            <div className="form">
              <FormSection title="Item Details">
                <div className="form-group">
                  <label className="form-label">SKU</label>
                  <input
                    type="text"
                    className={
                      "form-control" +
                      (errors.sku && errors.sku.length > 0 ? " is-invalid" : "")
                    }
                    value={sku}
                    disabled={saving}
                    onChange={e => this.handleChange("sku", e.target.value)}
                  />
                  {errors.sku && errors.sku.length > 0 ? (
                    <div className="invalid-feedback">{errors.sku[0]}</div>
                  ) : (
                    <div className="form-text text-muted">
                      A unique code to identify this item
                    </div>
                  )}
                </div>
                <div className="form-group">
                  <label className="form-label">Item Name</label>
                  <input
                    type="text"
                    className={
                      "form-control" +
                      (errors.name && errors.name.length > 0
                        ? " is-invalid"
                        : "")
                    }
                    value={name}
                    disabled={saving}
                    onChange={e => this.handleChange("name", e.target.value)}
                  />
                  {errors.name && errors.name.length > 0 ? (
                    <div className="invalid-feedback">{errors.name[0]}</div>
                  ) : (
                    <div className="form-text text-muted">
                      Make sure it's descriptive
                    </div>
                  )}
                </div>
                <div className="form-group">
                  <label className="form-label">Description</label>
                  <textarea
                    className={
                      "form-control" +
                      (errors.description && errors.description.length > 0
                        ? " is-invalid"
                        : "")
                    }
                    rows={3}
                    value={description}
                    disabled={saving}
                    onChange={e =>
                      this.handleChange("description", e.target.value)
                    }
                  />
                  {errors.description && errors.description.length > 0 && (
                    <div className="invalid-feedback">
                      {errors.description[0]}
                    </div>
                  )}
                </div>
              </FormSection>
              <FormSection title="Stock Management">
                <div className="form-group">
                  <div className="custom-control custom-checkbox">
                    <input
                      type="checkbox"
                      className="custom-control-input"
                      checked={isStockMonitored}
                      disabled={saving}
                      onChange={() =>
                        this.handleChange("isStockMonitored", !isStockMonitored)
                      }
                    />
                    <label
                      className="custom-control-label"
                      onClick={() =>
                        !saving &&
                        this.handleChange("isStockMonitored", !isStockMonitored)
                      }>
                      Monitor Stock
                    </label>
                  </div>
                  <div className="form-text text-muted small">
                    If checked, you will be able to monitor and manage the stock
                    of this item.
                  </div>
                </div>

                {isStockMonitored && (
                  <div className="form-group">
                    <label>Set Initial Quantity</label>
                    <div className="row">
                      <div className="col-6">
                        <div className="row no-gutters align-items-center">
                          <div className="col-6">
                            <QuantityInput
                              disabled={saving}
                              value={initialQuantity}
                              onChange={initialQuantity =>
                                this.setState({
                                  initialQuantity,
                                  isDirty: true
                                })
                              }
                            />
                          </div>
                          <div className="col-6 pl-3">
                            {!!primaryUnit && primaryUnit.pluralName}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                <div className="form-group">
                  <label>Primary Unit</label>
                  <div className="row">
                    <div className="col-6">
                      <UnitPicker
                        selectedUnit={primaryUnit}
                        availableUnits={units}
                        disabled={fetchingUnits || saving}
                        onSelect={primaryUnit => this.setState({ primaryUnit })}
                        placeholder="Please select"
                      />
                    </div>
                  </div>
                </div>
              </FormSection>
              <div className="mt-4 d-flex">
                <button
                  type="button"
                  disabled={saving}
                  className="btn btn-primary"
                  onClick={() => this.handleSubmit()}>
                  {saving ? "Saving.." : "Add Item"}
                </button>
                <div className="ml-2 dropdown">
                  <button
                    className="btn btn-outline-secondary dropdown-toggle"
                    data-toggle="dropdown">
                    Add Item then.. <ExpandMoreIcon size={14} />
                  </button>
                  <div className="dropdown-menu">
                    <button
                      className="dropdown-item"
                      onClick={() => this.handleSubmit("summary")}>
                      Go to Item Summary
                    </button>
                    <button
                      className="dropdown-item"
                      onClick={() => this.handleSubmit("settings")}>
                      Go to Item Settings
                    </button>
                  </div>
                </div>
              </div>
              <Prompt
                when={isDirty}
                message="Are you sure? Your unsaved changes will be lost."
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  units: state.units
});

const mapDispatchToProps = {
  fetchUnits,
  populateItems
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InventoryItemsCreate);
