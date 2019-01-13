import React, { PureComponent } from "react";
import moment from "moment";

export default class InventoryUnitsListItem extends PureComponent {
  render() {
    const {
      name,
      isDefault,
      shortName,
      createdAt,
      isCreatedAutomatically
    } = this.props;

    return (
      <tr>
        <td>
          {shortName}
          {isDefault && <span className="ml-2 badge badge-success">Default</span>}
          <div className="small text-muted">{name}</div>
        </td>
        <td>
          {moment(createdAt).fromNow()}
          {isCreatedAutomatically && (
            <div className="text-muted small">Created automatically</div>
          )}
        </td>
      </tr>
    );
  }
}
