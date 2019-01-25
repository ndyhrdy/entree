import React, { Component, Fragment } from "react";
import { toString } from "lodash";

import api, { routes } from "@/api";

export default class InviteForm extends Component {
  constructor(props) {
    super(props);
    this.defaultState = {
      data: {
        email: ""
      },
      saving: false,
      error: null
    };
    this.state = { ...this.defaultState };
  }

  onSubmit() {
    this.setState({ saving: true, error: false }, () => {
      return api
        .post(routes.coworkers, this.state.data)
        .then(response => {
          this.props.onInviteSuccess(response.data.data);
          this.setState({ ...this.defaultState });
        })
        .catch(error => {
          return this.setState({
            error: error.response ? error.response.data : error,
            saving: false,
          });
        });
    });
  }

  render() {
    const { data, saving, error } = this.state;
    const errorMessage = error
      ? error.errors && error.errors.email
        ? error.errors.email[0]
        : error.message || toString(error)
      : null;

    return (
      <Fragment>
        <h4>Invite a Coworker</h4>
        <p>
          Don't handle everything by yourself! Get your coworker here to help
          you out managing your store. Type in their email address below, and
          we'll take care of the rest.
        </p>

        <div className="form-inline">
          <input
            type="email"
            className={"form-control" + (errorMessage ? " is-invalid" : "")}
            placeholder="Email address"
            value={data.email}
            style={{ flex: 1 }}
            disabled={saving}
            onChange={e =>
              this.setState({ data: { ...data, email: e.target.value } })
            }
          />
          <button
            className="btn btn-primary ml-2"
            onClick={() => this.onSubmit()}
            disabled={saving}>
            Send Invitation
          </button>
        </div>
        {!!errorMessage && (
          <div className="small text-danger mt-2">{errorMessage}</div>
        )}
      </Fragment>
    );
  }
}
