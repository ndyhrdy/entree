import React, { PureComponent } from "react";
import ListItem from "./ItemsListItem";
import { ColumnHeader } from "@/components/DataTable";

export default class InventoryAdjustmentsCreateItemsList extends PureComponent {
  render() {
    const { adjustmentType, disabled, items, onRemove, onUpdate } = this.props;

    return (
      <table className="table table-sm">
        <thead>
          <tr>
            <ColumnHeader>Item</ColumnHeader>
            <ColumnHeader className="text-right" style={{ width: 150 }}>
              Current Quantity
            </ColumnHeader>
            <ColumnHeader className="text-center" style={{ width: 250 }}>
              Adjustment Quantity
            </ColumnHeader>
            <ColumnHeader className="text-right" style={{ width: 150 }}>
              Ending Quantity
            </ColumnHeader>
            <ColumnHeader style={{ width: 120 }} />
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
