import React, { PureComponent } from "react";
import {
  Add as AddIcon,
  Remove as RemoveIcon,
  NavigateNext as NavigateNextIcon
} from "styled-icons/material";
import numeral from "numeral";
import { UnitQuantityInput } from "@/components";

export default class InventoryAdjustmentsCreateItemsListItem extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      quantity: "1",
      quantityFocused: false
    };
  }

  render() {
    const { item, adjustmentType, disabled, onUpdate, onRemove } = this.props;
    const endingQuantity =
      adjustmentType === "balance"
        ? item.quantity
        : item.currentQuantity +
          item.quantity *
            item.selectedUnit.ratio *
            (adjustmentType === "receipt" ? 1 : -1);

    return (
      <tr>
        <td className="align-middle">
          <span className="text-muted">{item.sku}</span> {item.name}
        </td>
        <td className="align-middle text-right">
          {numeral(item.currentQuantity).format("0,0.[0000]")}{" "}
          <span className="text-muted">{item.unit.data.shortName}</span>
        </td>
        <td>
          <div className="d-flex align-items-center">
            {adjustmentType === "receipt" && (
              <AddIcon size={16} className="ml-1 mr-3" />
            )}
            {adjustmentType === "issue" && (
              <RemoveIcon size={16} className="ml-1 mr-3" />
            )}
            <UnitQuantityInput item={item} onChange={item => onUpdate(item)} disabled={disabled} />
            <NavigateNextIcon size={16} className="ml-3" />
          </div>
        </td>
        <td
          className={
            "align-middle text-right" +
            (endingQuantity < 0 ? " text-danger" : "")
          }>
          <strong>{numeral(endingQuantity).format("0,0.[0000]")}</strong>{" "}
          <span className="text-muted">{item.unit.data.shortName}</span>
        </td>
        <td>
          <button
            type="button"
            className="btn d-flex align-items-center text-danger"
            disabled={disabled}
            onClick={() => onRemove(item)}>
            <RemoveIcon size="18" className="mr-2" /> Remove
          </button>
        </td>
      </tr>
    );
  }
}
