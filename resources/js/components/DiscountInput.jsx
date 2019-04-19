import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import {
  ExpandMore as ExpandMoreIcon,
  NavigateNext as NavigateNextIcon
} from "styled-icons/material";
import numeral from "numeral";

export default class DiscountInput extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      discount: "0",
      discountFocused: false
    };
  }

  render() {
    const { discount, discountFocused } = this.state;
    const {
      value,
      type,
      disabled = false,
      onChangeValue,
      onChangeType
    } = this.props;

    return (
      <div className="input-group" style={{ flex: 1 }}>
        <input
          type="text"
          className="form-control text-right"
          value={
            discountFocused ? discount : numeral(value).format("0,0.[0000]")
          }
          disabled={disabled}
          onFocus={e => {
            e.target.select();
            this.setState({ discountFocused: true });
          }}
          onBlur={() => {
            const setValue =
              parseFloat(discount) >= 0 ? parseFloat(discount) : 0;
            onChangeValue(setValue);
            this.setState({
              discountFocused: false,
              discount: setValue
            });
          }}
          onChange={e =>
            discountFocused && this.setState({ discount: e.target.value })
          }
        />
        <div className="input-group-append dropdown">
          <button
            className="btn btn-outline-secondary dropdown-toggle text-truncate d-flex align-items-center justify-content-between"
            data-toggle={"dropdown"}
            disabled={disabled}
            style={{ width: 80 }}>
            <div>{type.label}</div>
            <ExpandMoreIcon size={16} />
          </button>
          <div className="dropdown-menu dropdown-menu-right">
            {discountTypes.map(discountType => (
              <button
                key={"discount-type-" + discountType.key}
                onClick={() => onChangeType(discountType)}
                className="dropdown-item">
                <NavigateNextIcon
                  size={16}
                  className="mr-1"
                  style={{
                    opacity: type.key === discountType.key ? 1 : 0
                  }}
                />
                {discountType.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export const discountTypes = [
  { key: "percentage", label: "%" },
  { key: "fixed", label: "Fixed" }
];

DiscountInput.propTypes = {
  value: PropTypes.number.isRequired,
  type: PropTypes.shape({
    key: PropTypes.oneOf(["percentage", "fixed"]).isRequired
  }).isRequired,
  disabled: PropTypes.bool,
  onChangeType: PropTypes.func.isRequired,
  onChangeValue: PropTypes.func.isRequired
};
