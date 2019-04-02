import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { CancelToken, isCancel } from "axios";

import api, { routes } from "@/api";
import { pushItem, removeItem } from "@/actions";

let cancelRequest;

class InventoryItemsSettngsSKU extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sku: props.item.sku,
      saving: false,
      error: null
    };
  }

  handleSave() {
    const { sku, saving } = this.state;
    const { history: routeHistory, item, pushItem, removeItem } = this.props;

    if (saving) return;
    return this.setState({ saving: true, error: null }, async () => {
      try {
        const response = await api.patch(
          routes.items + "/" + item.slug,
          {
            sku
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
            "/settings?_alert=sku-change-success"
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
    const { sku, saving, error } = this.state;

    return (
      <div className="mb-4">
        <label className="form-label">SKU</label>
        <div className="mb-2">
          <div className="form-inline">
            <input
              type="text"
              className={
                "form-control" +
                (error && error.length > 0 ? " is-invalid" : "")
              }
              value={sku}
              disabled={saving}
              onChange={e => this.setState({ sku: e.target.value })}
            />

            <button
              type="button"
              disabled={saving}
              onClick={() => this.handleSave()}
              className="btn btn-outline-secondary px-4 ml-2">
              Save
            </button>
          </div>
        </div>
        {error && error.length > 0 ? (
          <div className="invalid-feedback">{error}</div>
        ) : (
          <div className="form-text text-muted">
            A SKU (Stock Keeping Unit) is a code that can be read by scanners
            and is usually found on the labels of the product. If a SKU is not
            applicable for this item, give it a random unique code.
          </div>
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
)(withRouter(InventoryItemsSettngsSKU));
