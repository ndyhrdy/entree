import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { CancelToken, isCancel } from "axios";

import api, { routes } from "@/api";
import { pushItem, removeItem } from "@/actions";

let cancelRequest;

class InventoryItemsSettngsRename extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: props.item.name,
      saving: false,
      error: null
    };
  }

  handleSave() {
    const { name, saving } = this.state;
    const { history: routeHistory, item, pushItem, removeItem } = this.props;

    if (saving) return;
    return this.setState({ saving: true, error: null }, async () => {
      try {
        const response = await api.patch(
          routes.items + "/" + item.slug,
          {
            name
          },
          {
            cancelToken: new CancelToken(c => (cancelRequest = c))
          }
        );
        const { data } = response.data;

        removeItem(item);
        pushItem(data);
        return routeHistory.push(
          "/inventory/items/" +
            data.slug +
            "/settings?_alert=name-change-success"
        );
      } catch (e) {
        if (isCancel(e)) return;
        return this.setState({
          error: e.response ? e.response.data.message : e.toString(),
          saving: false
        });
      }
    });
  }

  componentWillUnmount() {
    cancelRequest && cancelRequest();
  }

  render() {
    const { name, saving, error } = this.state;

    return (
      <div className="mb-4">
        <label className="form-label">Rename</label>
        <div className="mb-2">
          <div className="d-flex">
            <input
              type="text"
              className={
                "form-control" +
                (error && error.length > 0 ? " is-invalid" : "")
              }
              style={{ flex: 1 }}
              value={name}
              disabled={saving}
              onChange={e => this.setState({ name: e.target.value })}
            />

            <button
              type="button"
              disabled={saving}
              onClick={() => this.handleSave()}
              className="btn btn-outline-secondary px-4 ml-2">
              Rename
            </button>
          </div>
        </div>
        {!!error && error.length > 0 && (
          <div className="invalid-feedback">{error}</div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {
  pushItem,
  removeItem
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(InventoryItemsSettngsRename));
