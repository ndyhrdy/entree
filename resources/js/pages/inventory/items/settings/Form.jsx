import React, { Component } from "react";
import { Prompt } from "react-router-dom";
import { isCancel, CancelToken } from "axios";
import { CheckCircle } from "styled-icons/material";

import api, { routes } from "@/api";

let cancelRequest = null;

export default class ItemSettingsForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sku: props.sku,
      name: props.name,
      description: props.description,

      isDirty: false,
      errors: {},
      saving: false,
      saved: false
    };
  }

  handleChange(field, value) {
    return this.setState(
      { [field]: value, isDirty: true, saved: false },
      () => {}
    );
  }

  async onSave() {
    const { sku, name, description, saving } = this.state;
    if (saving) {
      return;
    }

    this.setState({ errors: {}, saving: true });
    try {
      const response = await api.patch(
        routes.items + "/" + this.props.slug,
        { sku, name, description },
        {
          cancelToken: new CancelToken(c => (cancelRequest = c))
        }
      );

      return this.setState({ saving: false, saved: true, isDirty: false }, () =>
        this.props.onSaved(response.data.data)
      );
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
  }

  componentWillUnmount() {
    cancelRequest && cancelRequest();
  }

  render() {
    const {
      sku,
      name,
      description,
      saving,
      saved,
      errors,
      isDirty
    } = this.state;

    return (
      <div className="row">
        <div className="col-lg-9">
          <h3 className="mb-4">General Settings</h3>
          <div className="form">
            {!!errors.server && errors.server.length > 0 && (
              <div className="alert alert-danger">{errors.server}</div>
            )}

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
                  (errors.name && errors.name.length > 0 ? " is-invalid" : "")
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
                onChange={e => this.handleChange("description", e.target.value)}
              />
              {errors.description && errors.description.length > 0 && (
                <div className="invalid-feedback">{errors.description[0]}</div>
              )}
            </div>

            <div className="mt-4 d-flex align-items-center">
              <button
                type="button"
                className="btn btn-primary"
                disabled={saving}
                onClick={() => this.onSave()}>
                {saving ? "Saving.." : "Save Changes"}
              </button>
              {!!saved && (
                <div className="ml-3 text-success d-flex align-items-center">
                  <CheckCircle size={24} className="mr-1" /> Saved!
                </div>
              )}
            </div>
          </div>
        </div>
        <Prompt when={isDirty} message="Your changes will be lost. Continue?" />
      </div>
    );
  }
}
