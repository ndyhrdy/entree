import React, { PureComponent } from "react";

import { LoadingIndicator } from "@/components";
import { Header as TableHeader, ColumnHeader } from "@/components/DataTable";
import ListViewItem from "./ListViewItem";
import sortData from "./sort";

export default class InventoryItemsListListView extends PureComponent {
  render() {
    const { fetching, error, data, sort } = this.props;
    return (
      <table
        className={
          "table" +
          ((fetching || error) && data.length === 0 ? "" : " table-hover")
        }>
        <TableHeader>
          <tr>
            <ColumnHeader>Item</ColumnHeader>
            <ColumnHeader className="text-right" style={{ width: 150 }}>
              Quantity
            </ColumnHeader>
            <ColumnHeader className="text-right" style={{ width: 200 }}>
              Last Transaction
            </ColumnHeader>
            <ColumnHeader style={{ width: 250 }}>Created</ColumnHeader>
          </tr>
        </TableHeader>
        <tbody>
          {fetching && data.length === 0 && (
            <tr>
              <td colSpan={4}>
                <LoadingIndicator
                  size={80}
                  label="Hang on, we're getting your inventory.."
                />
              </td>
            </tr>
          )}
          {sortData(data, sort).map((item, index) => (
            <ListViewItem key={"items-item-" + index} {...item} />
          ))}
        </tbody>
      </table>
    );
  }
}
