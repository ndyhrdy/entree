import React, { Component } from "react";
import { connect } from "react-redux";
import { Prompt } from "react-router-dom";
import { CancelToken, isCancel } from "axios";
import { CheckCircle, InfoOutline } from "styled-icons/material";

import api, { routes } from "@/api";
import { fetchUnits } from "@/actions";
import { FormSection, UnitPicker } from "@/components";

let cancelRequest;

class InventoryItemSettingsStock extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isStockMonitored: props.isStockMonitored,

      unit: { ...props.unit.data },
      unit2: props.unit2 ? { ...props.unit2.data } : null,
      unit3: props.unit3 ? { ...props.unit3.data } : null,
      unit2Ratio: props.unit2Ratio,
      unit3Ratio: props.unit3Ratio,

      isDirty: false,
      saving: false,
      saved: false,
      errors: {}
    };
  }

  componentDidMount() {
    this.props.fetchUnits();
  }

  handleChange(field, value) {
    return this.setState({ [field]: value, isDirty: true, saved: false });
  }

  onSave() {
    const { onSaved, slug } = this.props;
    const {
      isStockMonitored,
      unit,
      unit2,
      unit3,
      unit2Ratio,
      unit3Ratio,
      saving
    } = this.state;
    if (saving) {
      return;
    }

    return this.setState({ saving: true, errors: {} }, async () => {
      try {
        const response = await api.patch(
          routes.items + "/" + slug,
          {
            isStockMonitored,
            unit: unit.id,
            unit2: unit2 ? unit2.id : 0,
            unit3: unit3 ? unit3.id : 0,
            unit2Ratio,
            unit3Ratio
          },
          {
            cancelToken: new CancelToken(c => (cancelRequest = c))
          }
        );
        const { data: item } = response.data;
        this.setState({ isDirty: false, saved: true, saving: false });
        return onSaved(item);
      } catch (e) {
        if (isCancel(e)) {
          return;
        }
        return this.setState({
          saving: false,
          errors: e.response
            ? { ...e.response.data, server: e.response.data.message }
            : { server: e.toString() }
        });
      }
    });
  }

  render() {
    const {
      errors,
      isDirty,
      isStockMonitored,
      saving,
      saved,
      unit,
      unit2,
      unit3,
      unit2Ratio,
      unit3Ratio
    } = this.state;
    const {
      units: { data: availableUnits, fetching: fetchingUnits }
    } = this.props;

    return (
      <div>
        <h3 className="mb-4">Stock Management Settings</h3>

        {!!errors.server && errors.server.length > 0 && (
          <div className="alert alert-danger">{errors.server}</div>
        )}
        <FormSection title="Stock Monitoring">
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
              If checked, you will be able to monitor and manage the stock of
              this item.
            </div>
          </div>

          <div className="alert alert-info">
            <div className="d-flex align-items-center mb-2">
              <InfoOutline size={22} />
              <div className="h5 mb-0 ml-2">About Stock Monitoring</div>
            </div>
            <p className="mb-0">
              When stock monitoring for an item is enabled, please note that you
              will not be allowed to make an outgoing transaction for the item
              if the resulting quantity will be less than zero.
            </p>
          </div>
        </FormSection>
        <FormSection title="Units of Measurement">
          <div className="form-group">
            <label>Primary Unit</label>
            <div className="row">
              <div className="col-6">
                <UnitPicker
                  selectedUnit={unit}
                  availableUnits={availableUnits}
                  disabled={fetchingUnits || saving}
                  onSelect={unit => this.setState({ unit })}
                />
              </div>
            </div>
          </div>
          <div className="form-group">
            <label>Secondary Unit</label>
            <div className="row">
              <div className="col-6">
                <UnitPicker
                  selectedUnit={unit2}
                  availableUnits={availableUnits}
                  disabled={fetchingUnits || saving}
                  onSelect={unit2 => this.setState({ unit2, isDirty: true })}
                  showNull
                />
              </div>
              <div className="col-6">
                <div className="form-inline">
                  <label>Ratio</label>
                  <input
                    type="text"
                    className="ml-2 form-control text-right"
                    disabled={fetchingUnits || !unit2 || saving}
                    value={unit2Ratio}
                    onChange={e =>
                      this.handleChange("unit2Ratio", e.target.value)
                    }
                  />
                  <div className="form-text ml-2">{unit.shortName}</div>
                </div>
              </div>
            </div>
            {!!unit2 && unit.id === unit2.id && (
              <div className="form-text small text-danger">
                Are you sure? Using same units will be ambiguous when making
                transactions.
              </div>
            )}
          </div>
          <div className="form-group">
            <label>Tertiary Unit</label>
            <div className="row">
              <div className="col-6">
                <UnitPicker
                  selectedUnit={unit3}
                  availableUnits={availableUnits}
                  disabled={fetchingUnits || saving}
                  onSelect={unit3 => this.setState({ unit3, isDirty: true })}
                  showNull
                />
              </div>
              <div className="col-6">
                <div className="form-inline">
                  <label>Ratio</label>
                  <input
                    type="text"
                    className="ml-2 form-control text-right"
                    disabled={fetchingUnits || !unit3 || saving}
                    value={unit3Ratio}
                    onChange={e =>
                      this.handleChange("unit3Ratio", e.target.value)
                    }
                  />
                  <div className="form-text ml-2">{unit.shortName}</div>
                </div>
              </div>
            </div>
            {((!!unit3 && unit.id === unit3.id) ||
              (!!unit2 && !!unit3 && unit2.id === unit3.id)) && (
              <div className="form-text small text-danger">
                Are you sure? Using same units will be ambiguous when making
                transactions.
              </div>
            )}
          </div>
        </FormSection>
        <div className="mt-4 d-flex align-items-center">
          <button
            type="button"
            disabled={saving}
            className="btn btn-primary"
            onClick={() => this.onSave()}>
            {saving ? "Saving.." : "Save Changes"}
          </button>
          {!!saved && (
            <div className="ml-3 text-success d-flex align-items-center">
              <CheckCircle size={24} className="mr-1" /> Saved!
            </div>
          )}
        </div>
        <Prompt
          when={isDirty}
          message="Are you sure? Your unsaved changes will be lost."
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  units: state.units
});

const mapDispatchToProps = {
  fetchUnits
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InventoryItemSettingsStock);
