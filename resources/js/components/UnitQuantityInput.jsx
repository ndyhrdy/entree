import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import {
  ExpandMore as ExpandMoreIcon,
  NavigateNext as NavigateNextIcon
} from "styled-icons/material";
import numeral from "numeral";

export default class UnitQuantityInput extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      quantity: "1",
      quantityFocused: false
    };
  }

  render() {
    const { quantity, quantityFocused } = this.state;
    const { item, disabled = false, onChange } = this.props;

    return (
      <div className="input-group" style={{ flex: 1 }}>
        <input
          type="text"
          className="form-control text-right"
          value={
            quantityFocused
              ? quantity
              : numeral(item.quantity).format("0,0.[0000]")
          }
          disabled={disabled}
          onFocus={e => {
            e.target.select();
            this.setState({ quantityFocused: true });
          }}
          onBlur={() => {
            onChange({
              ...item,
              quantity: parseFloat(quantity) >= 0 ? parseFloat(quantity) : 0
            });
            this.setState({
              quantityFocused: false,
              quantity: parseFloat(quantity)
            });
          }}
          onChange={e =>
            quantityFocused && this.setState({ quantity: e.target.value })
          }
        />
        <div className="input-group-append dropdown">
          <button
            className="btn btn-outline-secondary dropdown-toggle text-truncate d-flex align-items-center justify-content-between"
            data-toggle={"dropdown"}
            disabled={disabled}
            style={{ width: 80 }}>
            <div>{item.selectedUnit.shortName}</div>
            <ExpandMoreIcon size={16} />
          </button>
          <div className="dropdown-menu dropdown-menu-right">
            {units.map(
              unit =>
                !!item[unit.key] && (
                  <button
                    key={item.slug + "-" + unit.key}
                    onClick={() =>
                      onChange({
                        ...item,
                        selectedUnit: {
                          ...item[unit.key].data,
                          index: unit.index,
                          ratio: unit.index === 1 ? 1 : item[unit.key + "Ratio"]
                        }
                      })
                    }
                    className="dropdown-item">
                    <NavigateNextIcon
                      size={16}
                      className="mr-1"
                      style={{
                        opacity: item.selectedUnit.index === unit.index ? 1 : 0
                      }}
                    />
                    {item[unit.key].data.shortName}
                    {unit.index > 1 && (
                      <span className="text-muted ml-1">
                        ({item[unit.key + "Ratio"]}{" "}
                        {item[unit.key].data.shortName})
                      </span>
                    )}
                  </button>
                )
            )}
          </div>
        </div>
      </div>
    );
  }
}

const units = [
  { key: "unit", index: 1 },
  { key: "unit2", index: 2 },
  { key: "unit3", index: 3 }
];

UnitQuantityInput.propTypes = {
  item: PropTypes.shape({
    quantity: PropTypes.number.isRequired,
    unit2Ratio: PropTypes.number,
    unit3Ratio: PropTypes.number,
    selectedUnit: PropTypes.shape({
      shortName: PropTypes.string.isRequired,
      ratio: PropTypes.number.isRequired,
      index: PropTypes.number.isRequired
    }).isRequired,
    unit: PropTypes.shape({
      data: PropTypes.shape({ shortName: PropTypes.string.isRequired })
        .isRequired
    }).isRequired,
    unit2: PropTypes.shape({
      data: PropTypes.shape({ shortName: PropTypes.string.isRequired })
        .isRequired
    }),
    unit3: PropTypes.shape({
      data: PropTypes.shape({ shortName: PropTypes.string.isRequired })
        .isRequired
    })
  }),
  disabled: PropTypes.bool,
  onChange: PropTypes.func.isRequired
};
