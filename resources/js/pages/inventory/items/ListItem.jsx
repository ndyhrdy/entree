import React, { Fragment, PureComponent } from "react";
import moment from "moment";
import numeral from "numeral";
import { Link } from "react-router-dom";
import { Create as EditIcon } from "styled-icons/material";

export default class InventoryItemsListItem extends PureComponent {
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
      unit: {
        data: { shortName: unitName }
      },
      createdBy: {
        data: { name: createdByName }
      },
      createdAt,
      currentQuantity,
      lastMutation
    } = this.props;
    const { highlighted } = this.state;

    return (
      <tr
        onMouseEnter={() => this.setState({ highlighted: true })}
        onMouseLeave={() => this.setState({ highlighted: false })}>
        <td>
          <div className="d-flex">
            <img
              src={"https://picsum.photos/50?nonce=" + sku}
              alt={name}
              className="rounded mr-3"
              style={{ height: 50, width: 50 }}
            />
            <div>
              <Link to={"/inventory/items/" + slug}>{name}</Link>
              <div className="small">
                <span className="text-muted mr-2">SKU {sku}</span>
                {highlighted && (
                  <Fragment>
                    <Link
                      className="text-dark mr-2"
                      to={"/inventory/adjustments/new?_default-item=" + slug}>
                      Adjust Stock
                    </Link>
                    <Link
                      className="text-dark mr-2"
                      to={"/inventory/purchase/" + slug}>
                      Purchase
                    </Link>
                    <Link
                      className="text-dark mr-2"
                      to={"/inventory/production/" + slug}>
                      Produce
                    </Link>
                    <Link
                      className="text-dark mr-2"
                      to={"/inventory/items/" + slug + "/edit"}>
                      Edit
                    </Link>
                  </Fragment>
                )}
              </div>
            </div>
          </div>
        </td>
        <td className="text-right">
          {numeral(currentQuantity).format(
            highlighted ? "0,0.[0000]" : "0.[0]a"
          )}
          {highlighted && (
            <Link to={"/inventory/adjustment/" + slug}>
              <EditIcon size={16} className="ml-1" />
            </Link>
          )}
          <div className="small text-muted">{unitName}</div>
        </td>
        <td className="text-right">
          {lastMutation
            ? numeral(lastMutation.data.quantity).format(
                highlighted ? "0,0.[0000]" : "0.[0]a"
              )
            : "No transactions yet"}
          {!!lastMutation && (
            <div className="small text-muted">
              {moment(lastMutation.data.createdAt).fromNow()}
            </div>
          )}
        </td>
        <td>
          <div className="d-flex justify-content-between">
            <div>
              {moment(createdAt).fromNow()}
              <div className="text-muted small">{createdByName}</div>
            </div>
          </div>
        </td>
      </tr>
    );
  }
}
