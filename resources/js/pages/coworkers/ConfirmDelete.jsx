import React, { Fragment, PureComponent } from "react";
import PropTypes from "prop-types";

import api, { routes } from "@/api";

export default class CoworkersConfirmDelete extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      deleting: false
    };
  }

  onConfirm() {
    this.setState({ deleting: true }, () => {
      const { slug } = this.props.coworker;
      return api
        .delete(routes.coworkers + "/" + slug, {
          params: {
            store: this.props.store.slug
          }
        })
        .then(response => this.props.onSuccess(response.data.data))
        .catch(error => this.setState({ deleting: false }));
    });
  }

  render() {
    const { deleting } = this.state;
    const { email, name } = this.props.coworker;

    return (
      <Fragment>
        <div className="modal-body">
          <h3>Remove Coworker?</h3>
          <p>
            Are you sure you want to remove <strong>{name || email}</strong>?
            This action will revoke all their permissions to the store.
          </p>
        </div>
        <div className="modal-footer">
          <button
            onClick={() => this.props.onCancel()}
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

CoworkersConfirmDelete.propTypes = {
  onSuccess: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  coworker: PropTypes.shape({
    slug: PropTypes.string.isRequired,
    email: PropTypes.string,
    name: PropTypes.string
  }),
  activeStore: PropTypes.shape({
    slug: PropTypes.string.isRequired
  })
};
