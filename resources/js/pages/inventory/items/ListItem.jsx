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
          {name}
          <div className="small text-muted">SKU {sku}</div>
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
