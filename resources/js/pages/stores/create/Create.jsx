import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link, Prompt } from "react-router-dom";

import { populateStores, fetchAuthenticatedUser } from "../../../actions";
import api, { routes } from "../../../api";
import { FormSection } from "../../../components";

export class StoresCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        name: "",
        description: "",

        address: "",
        city: "",
        state: "",
        country: "",
        phone: "",
        email: "",
        web: ""
      },
      isDirty: false,
      isSaving: false,
      validationErrors: null
    };
  }

  onSubmit() {
    this.setState({ isSaving: true, validationErrors: null }, () => {
      return api
        .post(routes.stores, { ...this.state.data })
        .then(response => {
          const newStore = { ...response.data.data };
          this.props.populateStores([...this.props.stores, newStore]);
          this.props.fetchAuthenticatedUser({
            callback: () => {
              return this.setState({ isDirty: false }, () =>
                this.props.history.push(
                  "/coworkers?_flow=create-store&_alert=create-store-success"
                )
              );
            }
          });
        })
        .catch(
          error =>
            error.response &&
            error.response.data &&
            this.setState({
              isSaving: false,
              validationErrors: error.response.data.errors
            })
        );
    });
  }

  render() {
    const { isDirty, data: store, isSaving, validationErrors } = this.state;

    return (
      <div className="container py-5">
        <ol className="breadcrumb mb-5">
          <li className="breadcrumb-item">
            <Link to="/stores" replace>
              Stores
            </Link>
          </li>
          <li className="breadcrumb-item active">Add a Store</li>
        </ol>

        <h3 className="mb-4">Add a Store</h3>
        <FormSection title="General Info" subtitle="These are required">
          <div className="form-group">
            <label>Store Name</label>
            <input
              type="text"
              className={
                "form-control" +
                (validationErrors && validationErrors.name ? " is-invalid" : "")
              }
              disabled={isSaving}
              value={store.name}
              onChange={e =>
                this.setState({
                  data: { ...store, name: e.target.value },
                  isDirty: true
                })
              }
            />
            {validationErrors && validationErrors.name && (
              <div className="invalid-feedback">{validationErrors.name[0]}</div>
            )}
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea
              className={
                "form-control" +
                (validationErrors && validationErrors.description
                  ? " is-invalid"
                  : "")
              }
              disabled={isSaving}
              value={store.description}
              onChange={e =>
                this.setState({
                  data: { ...store, description: e.target.value },
                  isDirty: true
                })
              }
            />
            {validationErrors && validationErrors.description && (
              <div className="invalid-feedback">
                {validationErrors.description[0]}
              </div>
            )}
          </div>
        </FormSection>
        <FormSection title="Address">
          <div className="form-group">
            <label>Street Address</label>
            <textarea
              className={
                "form-control" +
                (validationErrors && validationErrors.address
                  ? " is-invalid"
                  : "")
              }
              disabled={isSaving}
              value={store.address}
              onChange={e =>
                this.setState({
                  data: { ...store, address: e.target.value },
                  isDirty: true
                })
              }
            />
            {validationErrors && validationErrors.address && (
              <div className="invalid-feedback">
                {validationErrors.address[0]}
              </div>
            )}
          </div>
          <div className="form-row">
            <div className="col-sm-6 form-group">
              <label>City</label>
              <input
                type="text"
                className={
                  "form-control" +
                  (validationErrors && validationErrors.city
                    ? " is-invalid"
                    : "")
                }
                disabled={isSaving}
                value={store.city}
                onChange={e =>
                  this.setState({
                    data: { ...store, city: e.target.value },
                    isDirty: true
                  })
                }
              />
              {validationErrors && validationErrors.city && (
                <div className="invalid-feedback">
                  {validationErrors.city[0]}
                </div>
              )}
            </div>
            <div className="col-sm-6 form-group">
              <label>State</label>
              <input
                type="text"
                className={
                  "form-control" +
                  (validationErrors && validationErrors.state
                    ? " is-invalid"
                    : "")
                }
                disabled={isSaving}
                value={store.state}
                onChange={e =>
                  this.setState({
                    data: { ...store, state: e.target.value },
                    isDirty: true
                  })
                }
              />
              {validationErrors && validationErrors.state && (
                <div className="invalid-feedback">
                  {validationErrors.state[0]}
                </div>
              )}
            </div>
          </div>
          <div className="form-group">
            <label>Country</label>
            <input
              type="text"
              className={
                "form-control" +
                (validationErrors && validationErrors.country
                  ? " is-invalid"
                  : "")
              }
              disabled={isSaving}
              value={store.country}
              onChange={e =>
                this.setState({
                  data: { ...store, country: e.target.value },
                  isDirty: true
                })
              }
            />
            {validationErrors && validationErrors.country && (
              <div className="invalid-feedback">
                {validationErrors.country[0]}
              </div>
            )}
          </div>
        </FormSection>
        <FormSection title="Other Info">
          <div className="form-row">
            <div className="col-lg-6 form-group">
              <label>Phone</label>
              <input
                type="text"
                className={
                  "form-control" +
                  (validationErrors && validationErrors.phone
                    ? " is-invalid"
                    : "")
                }
                disabled={isSaving}
                value={store.phone}
                onChange={e =>
                  this.setState({
                    data: { ...store, phone: e.target.value },
                    isDirty: true
                  })
                }
              />
              {validationErrors && validationErrors.phone && (
                <div className="invalid-feedback">
                  {validationErrors.phone[0]}
                </div>
              )}
            </div>
            <div className="col-lg-6 form-group">
              <label>Email</label>
              <input
                type="email"
                className={
                  "form-control" +
                  (validationErrors && validationErrors.email
                    ? " is-invalid"
                    : "")
                }
                disabled={isSaving}
                value={store.email}
                onChange={e =>
                  this.setState({
                    data: { ...store, email: e.target.value },
                    isDirty: true
                  })
                }
              />
              {validationErrors && validationErrors.email && (
                <div className="invalid-feedback">
                  {validationErrors.email[0]}
                </div>
              )}
            </div>
          </div>
          <div className="form-group">
            <label>Webpage</label>
            <input
              type="text"
              className={
                "form-control" +
                (validationErrors && validationErrors.web ? " is-invalid" : "")
              }
              disabled={isSaving}
              value={store.web}
              onChange={e =>
                this.setState({
                  data: { ...store, web: e.target.value },
                  isDirty: true
                })
              }
            />
            {validationErrors && validationErrors.web && (
              <div className="invalid-feedback">{validationErrors.web[0]}</div>
            )}
          </div>
        </FormSection>

        <div>
          <button
            type="button"
            onClick={() => this.onSubmit()}
            className="btn btn-primary"
            disabled={isSaving}>
            {isSaving ? "Please wait.." : "Add Store"}
          </button>
        </div>

        <Prompt
          when={isDirty}
          message="Are you sure? Your changes will be lost."
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({ stores: state.stores.data });

const mapDispatchToProps = { fetchAuthenticatedUser, populateStores };

StoresCreate.propTypes = {
  fetchAuthenticatedUser: PropTypes.func.isRequired,
  populateStores: PropTypes.func.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StoresCreate);
