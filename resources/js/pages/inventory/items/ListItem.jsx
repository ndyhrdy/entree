import React, { PureComponent } from "react";
import moment from "moment";
import numeral from "numeral";
import {
  Create as EditIcon,
  Delete as DeleteIcon,
  MoreVert as MenuIcon
} from "styled-icons/material";

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
      unit: {
        data: { shortName: unitName }
      },
      createdBy: {
        data: { name: createdByName }
      },
      createdAt,
      currentQuantity,
      lastMutation: { data: lastMutation }
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
              {name}
              <div className="small text-muted">SKU {sku}</div>
            </div>
          </div>
        </td>
        <td className="text-right">
          {numeral(currentQuantity).format(highlighted ? "0,0.[0000]" : "0.[0]a")}
          <div className="small text-muted">{unitName}</div>
        </td>
        <td className="text-right">
          {lastMutation
            ? numeral(lastMutation.quantity).format(
                highlighted ? "0,0.[0000]" : "0.[0]a"
              )
            : "No transactions yet"}
          {!!lastMutation && (
            <div className="small text-muted">
              {moment(lastMutation.createdAt).fromNow()}
            </div>
          )}
        </td>
        <td>
          <div className="d-flex justify-content-between">
            <div>
              {moment(createdAt).fromNow()}
              <div className="text-muted small">{createdByName}</div>
            </div>
            <div className="dropdown">
              <a
                href="#"
                className={
                  "dropdown-toggle" +
                  (highlighted ? " text-muted" : " text-white")
                }
                data-toggle="dropdown">
                <MenuIcon size={30} />
              </a>
              <div
                className="dropdown-menu dropdown-menu-right"
                style={{ marginTop: 12 }}>
                <button
                  className="dropdown-item d-flex align-items-center"
                  type="button">
                  <EditIcon size={16} className="mr-2" /> <span>Edit</span>
                </button>
                <button
                  className="dropdown-item d-flex align-items-center text-danger"
                  type="button">
                  <DeleteIcon size={16} className="mr-2" />{" "}
                  <span>Move to Trash</span>
                </button>
              </div>
            </div>
          </div>
        </td>
      </tr>
    );
  }
}
