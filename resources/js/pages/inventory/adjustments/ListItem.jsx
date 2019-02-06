import React, { PureComponent } from "react";
import moment from "moment";

export default class InventoryAdjustmentsListItem extends PureComponent {
  render() {
    const {
      batchNo,
      createdAt,
      createdBy,
      adjustments: { data: adjustments }
    } = this.props;

    return (
      <tr>
        <td>
          {batchNo}
          <div className="text-muted small">
            {adjustments.length} items adjusted
          </div>
        </td>
        <td>
          {moment(createdAt).fromNow()}
          <div className="text-muted small">{createdBy.data.name}</div>
        </td>
      </tr>
    );
  }
}
