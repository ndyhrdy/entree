import React, { PureComponent } from "react";
import numeral from "numeral";

import { DiscountInput, UnitQuantityInput } from "@/components";

export default class PurchasingPurchasesCreateItemsListItem extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      unitPrice: props.item.unitPrice,
      highlighted: false
    };
  }

  componentDidMount() {
    this.props.focusOnMount && this.quantityInput.focus();
  }

  calculateSubtotal(item) {
    const priceBeforeDiscount = item.quantity * item.unitPrice;
    const discountValue =
      item.discountType.key === "percentage"
        ? priceBeforeDiscount * item.discount * 0.01
        : item.discount;
    return priceBeforeDiscount - discountValue;
  }

  render() {
    const { item, onRemove, onUpdate } = this.props;
    const { highlighted, unitPrice } = this.state;

    return (
      <tr
        onMouseEnter={() => this.setState({ highlighted: true })}
        onMouseLeave={() => this.setState({ highlighted: false })}>
        <td className="align-middle pl-0">
          <div>
            {item.sku}{" "}
            {highlighted && (
              <a
                className="small text-danger"
                href="#"
                onClick={e => {
                  e.preventDefault();
                  onRemove();
                }}>
                Remove
              </a>
            )}
          </div>
          <div className="small">{item.name}</div>
        </td>
        <td className="align-middle">
          <UnitQuantityInput
            ref={r => (this.quantityInput = r)}
            item={item}
            onChange={item =>
              onUpdate({ ...item, subtotal: this.calculateSubtotal(item) })
            }
          />
        </td>
        <td className="align-middle">
          <input
            ref={r => (this.unitPriceInput = r)}
            type="text"
            className="form-control text-right"
            value={
              this.unitPriceInput === document.activeElement
                ? unitPrice
                : numeral(item.unitPrice).format("0,0.[0000]")
            }
            onChange={e =>
              this.unitPriceInput === document.activeElement &&
              this.setState({ unitPrice: e.target.value })
            }
            onFocus={e => e.target.select()}
            onBlur={() => {
              const setValue =
                parseFloat(unitPrice) > 0 ? parseFloat(unitPrice) : 0;
              const updateItem = { ...item, unitPrice: setValue };
              return this.setState({ unitPrice: setValue }, () =>
                onUpdate({
                  ...updateItem,
                  subtotal: this.calculateSubtotal(updateItem)
                })
              );
            }}
          />
        </td>
        <td className="align-middle">
          <DiscountInput
            value={item.discount}
            type={item.discountType}
            onChangeType={type => {
              const updateItem = { ...item, discountType: type };
              return onUpdate({
                ...updateItem,
                subtotal: this.calculateSubtotal(updateItem)
              });
            }}
            onChangeValue={value => {
              const updateItem = { ...item, discount: value };
              return onUpdate({
                ...updateItem,
                subtotal: this.calculateSubtotal(updateItem)
              });
            }}
          />
        </td>
        <td className="text-right align-middle pr-0">
          <strong>{numeral(item.subtotal).format("0,0.[0000]")}</strong>
        </td>
      </tr>
    );
  }
}
