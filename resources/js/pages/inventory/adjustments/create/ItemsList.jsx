import React, { PureComponent } from "react";
import ListItem from "./ItemsListItem";

export default class InventoryAdjustmentsCreateItemsList extends PureComponent {
  render() {
    const { adjustmentType, disabled, items, onRemove, onUpdate } = this.props;

    return (
      <table className="table table-sm">
        <thead>
          <tr>
            <th>Item</th>
            <th className="text-right" style={{ width: 150 }}>
              Current Quantity
            </th>
            <th className="text-center" style={{ width: 250 }}>
              Adjustment Quantity
            </th>
            <th className="text-right" style={{ width: 150 }}>
              Ending Quantity
            </th>
            <th style={{ width: 120 }} />
          </tr>
        </thead>
        <tbody>
          {items.length === 0 ? (
            <tr>
              <td colSpan={5} className="text-center">
                Add items to adjust
              </td>
            </tr>
          ) : (
            items.map(item => (
              <ListItem
                key={"adjustment-items-item-" + item.slug}
                disabled={disabled}
                item={item}
                adjustmentType={adjustmentType.key}
                onUpdate={item => onUpdate(item)}
                onRemove={item => onRemove(item)}
              />
            ))
          )}
        </tbody>
      </table>
    );
  }
}

