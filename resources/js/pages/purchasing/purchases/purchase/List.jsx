import React from "react";
import { Header as TableHeader, ColumnHeader } from "@/components/DataTable";
import PurchasingPurchasesPurchaseListItem from "./ListItem";

export default props => {
  return (
    <table className="table">
      <TableHeader>
        <tr>
          <ColumnHeader>Item</ColumnHeader>
          <ColumnHeader>Quantity</ColumnHeader>
          <ColumnHeader>Price</ColumnHeader>
        </tr>
      </TableHeader>
      <tbody>
        {props.items.map(item => (
          <PurchasingPurchasesPurchaseListItem {...item} key={item.sku} />
        ))}
      </tbody>
    </table>
  );
};
