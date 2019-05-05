import React, { PureComponent, createRef } from "react";

export default class PurchasingPurchasesPurchaseListItem extends PureComponent {
  constructor(props) {
    super(props);
    this.row = createRef();
  }

  render() {
    const {
      item: {
        data: { name, images }
      },
      mutation: {
        data: { quantity, baseUnitQuantity }
      },
      basePrice
    } = this.props;

    return (
      <tr ref={this.row}>
        <td>
          <div className="d-flex">
            {!!images && images.length > 0 && (
              <img
                src={images[0].thumbUrl || images[0].url}
                alt={name}
                className="rounded mr-3"
                style={{ height: 50, width: 50 }}
              />
            )}
            <div>{name}</div>
          </div>
        </td>
        <td>{quantity}</td>
        <td>{basePrice}</td>
      </tr>
    );
  }
}
