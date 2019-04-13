import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link, Prompt } from "react-router-dom";
import { CancelToken, isCancel } from "axios";

import { pushSupplier } from "@/actions";
import { Alert } from "@/components";
import api, { routes } from "@/api";

let cancelRequest;

class PurchasingSuppliersCreate extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      address: "",
      phone: "",
      email: "",

      dirty: false,
      saving: false,
      errors: {}
    };
  }

  componentWillUnmount() {
    cancelRequest && cancelRequest();
  }

  handleChange(field, value) {
    this.setState({ [field]: value, dirty: true });
  }

  handleSubmit() {
    const { name, address, phone, email, saving } = this.state;
    if (saving) {
      return;
    }
    return this.setState({ saving: true, errors: {} }, async () => {
      try {
        const response = await api.post(
          routes.suppliers,
          {
            name,
            address,
            phone,
            email
          },
          {
            cancelToken: new CancelToken(c => (cancelRequest = c))
          }
        );
        const { data: supplier } = response.data;
        this.props.pushSupplier(supplier);

        return this.setState({ dirty: false }, () =>
          this.props.history.push("/purchasing/suppliers?_flow=create-success")
        );
      } catch (error) {
        if (!isCancel(error)) {
          return this.setState({
            saving: false,
            errors:
              error.response && error.response.data
                ? error.response.data.errors || { server: error.response.data }
                : error.toString()
          });
        }
      }
    });
  }

  render() {
    const { dirty, name, address, phone, email, saving, errors } = this.state;
    return (
      <div className="container py-5">
        <ol className="breadcrumb mb-4">
          <li className="breadcrumb-item">
            <Link to="/purchasing/suppliers" replace>
              All Suppliers
            </Link>
          </li>
          <li className="breadcrumb-item active">{pageTitle}</li>
        </ol>

        <h3 className="mb-4">{pageTitle}</h3>

        {!!errors.server && <Alert type="danger">{errors.server}</Alert>}

        <div className="row">
          <div className="col-lg-9">
            <div className="form-group">
              <label className="form-label">Supplier Name</label>
              <input
                type="text"
                value={name}
                onChange={e => this.handleChange("name", e.target.value)}
                className={"form-control" + (errors.name ? " is-invalid" : "")}
                placeholder="Acme, Inc."
                disabled={saving}
              />
              {errors.name ? (
                <div className="invalid-feedback">{errors.name[0]}</div>
              ) : (
                <div className="form-text text-muted">Required.</div>
              )}
            </div>
            <div className="form-group">
              <label className="form-label">Address</label>
              <input
                type="text"
                value={address}
                onChange={e => this.handleChange("address", e.target.value)}
                className={
                  "form-control" + (errors.address ? " is-invalid" : "")
                }
                disabled={saving}
              />
              {!!errors.address && (
                <div className="invalid-feedback">{errors.address[0]}</div>
              )}
            </div>
            <div className="row">
              <div className="col-lg-6">
                <div className="form-group">
                  <label className="form-label">Phone Number</label>
                  <input
                    type="text"
                    value={phone}
                    onChange={e => this.handleChange("phone", e.target.value)}
                    className={
                      "form-control" + (errors.phone ? " is-invalid" : "")
                    }
                    disabled={saving}
                  />
                  {!!errors.phone && (
                    <div className="invalid-feedback">{errors.phone[0]}</div>
                  )}
                </div>
              </div>
              <div className="col-lg-6">
                <div className="form-group">
                  <label className="form-label">Email Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={e => this.handleChange("email", e.target.value)}
                    className={
                      "form-control" + (errors.email ? " is-invalid" : "")
                    }
                    disabled={saving}
                  />
                  {!!errors.email && (
                    <div className="invalid-feedback">{errors.email[0]}</div>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-4">
              <button
                type="button"
                className="btn btn-primary"
                disabled={saving}
                onClick={() => this.handleSubmit()}>
                {saving ? "Saving.." : "Add Supplier"}
              </button>
            </div>
          </div>
        </div>

        <Prompt
          when={dirty}
          message="Are you sure? Your unsaved changes will be lost."
        />
      </div>
    );
  }
}

const pageTitle = "Add a Supplier";

const mapStateToProps = state => ({});

const mapDispatchToProps = {
  pushSupplier
};

PurchasingSuppliersCreate.propTypes = {
  pushSupplier: PropTypes.func.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PurchasingSuppliersCreate);
