import React, { Component, forwardRef } from "react";
import { toString } from "lodash";
import numeral from "numeral";

class QuantityInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      quantityFocused: false,
      quantity: toString(props.value) || "1"
    };
  }

  render() {
    const { quantity, quantityFocused } = this.state;
    const { disabled, innerRef, onChange, value } = this.props;

    return (
      <input
        ref={innerRef}
        type="text"
        className="form-control text-right"
        value={quantityFocused ? quantity : numeral(value).format("0,0.[0000]")}
        disabled={disabled}
        onFocus={e => {
          e.target.select();
          this.setState({ quantityFocused: true });
        }}
        onBlur={() => {
          onChange(parseFloat(quantity) >= 0 ? parseFloat(quantity) : 0);
          this.setState({
            quantityFocused: false,
            quantity: parseFloat(quantity)
          });
        }}
        onChange={e =>
          quantityFocused && this.setState({ quantity: e.target.value })
        }
      />
    );
  }
}

export default forwardRef((props, ref) => (
  <QuantityInput innerRef={ref} {...props} />
));
