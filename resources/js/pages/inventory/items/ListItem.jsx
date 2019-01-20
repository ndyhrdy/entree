import React, { PureComponent } from "react";
import moment from "moment";

export default class InventoryItemsListItem extends PureComponent {
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
      createdAt
    } = this.props;

    return (
      <tr>
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
        <td>{unitName}</td>
        <td>
          {moment(createdAt).fromNow()}
          <div className="text-muted small">{createdByName}</div>
        </td>
      </tr>
    );
  }
}
