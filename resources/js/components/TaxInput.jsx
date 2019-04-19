import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import {
  ExpandMore as ExpandMoreIcon,
  NavigateNext as NavigateNextIcon
} from "styled-icons/material";
import numeral from "numeral";

export default class TaxInput extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      tax: "0",
      taxFocused: false
    };
  }

  render() {
    const { tax, taxFocused } = this.state;
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
          value={taxFocused ? tax : numeral(value).format("0,0.[0000]")}
          disabled={disabled}
          onFocus={e => {
            e.target.select();
            this.setState({ taxFocused: true });
          }}
          onBlur={() => {
            const setValue = parseFloat(tax) >= 0 ? parseFloat(tax) : 0;
            onChangeValue(setValue);
            this.setState({
              taxFocused: false,
              tax: setValue
            });
          }}
          onChange={e => taxFocused && this.setState({ tax: e.target.value })}
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
            {taxTypes.map(taxType => (
              <button
                key={"tax-type-" + taxType.key}
                onClick={() => onChangeType(taxType)}
                className="dropdown-item">
                <NavigateNextIcon
                  size={16}
                  className="mr-1"
                  style={{
                    opacity: type.key === taxType.key ? 1 : 0
                  }}
                />
                {taxType.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export const taxTypes = [
  { key: "percentage", label: "%" },
  { key: "fixed", label: "Fixed" }
];

TaxInput.propTypes = {
  value: PropTypes.number.isRequired,
  type: PropTypes.shape({
    key: PropTypes.oneOf(["percentage", "fixed"]).isRequired
  }).isRequired,
  disabled: PropTypes.bool,
  onChangeType: PropTypes.func.isRequired,
  onChangeValue: PropTypes.func.isRequired
};
