import React, { Fragment, PureComponent } from "react";
import moment from "moment";
import numeral from "numeral";
import { withRouter } from "react-router-dom";
import { Collections as ImagesIcon } from "styled-icons/material";

class InventoryItemsListGridViewItem extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      highlighted: false
    };
  }

  render() {
    const {
      name,
      sku,
      slug,
      images,
      unit: {
        data: { shortName: unitName }
      },
      createdBy: {
        data: { name: createdByName }
      },
      createdAt,
      currentQuantity,
      lastMutation,
      isStockMonitored,
      history
    } = this.props;
    const { highlighted } = this.state;

    return (
      <div
        className="rounded border bg-white h-100"
        style={{ cursor: "pointer" }}
        onClick={() => history.push("/inventory/items/" + slug)}
        onMouseEnter={() => this.setState({ highlighted: true })}
        onMouseLeave={() => this.setState({ highlighted: false })}>
        {!!images && images.length > 0 ? (
          <img
            src={images[0].thumbUrl || images[0].url}
            alt={name}
            className="w-100 rounded-top"
          />
        ) : (
          <div
            style={{ height: 0, width: "100%", paddingBottom: "100%" }}
            className="bg-light">
            <div
              className="d-flex justify-content-center align-items-center text-muted"
              style={{ opacity: 0.2, paddingTop: "50%" }}>
              <ImagesIcon size={72} style={{ marginTop: -36 }} />
            </div>
          </div>
        )}
        <div
          style={{ height: 120 }}
          className="px-3 py-2 d-flex flex-column justify-content-between">
          <div>{name}</div>
          <div className="small">
            <span className="text-muted mr-2">SKU {sku}</span>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(InventoryItemsListGridViewItem);
