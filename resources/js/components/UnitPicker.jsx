import React from "react";
import PropTypes from "prop-types";
import { ExpandMore as ExpandMoreIcon } from "styled-icons/material";

const UnitPicker = props => {
  const { availableUnits, disabled, selectedUnit, onSelect, showNull } = props;

  return (
    <div className="dropdown">
      <button
        type="button"
        disabled={disabled}
        data-toggle="dropdown"
        className="btn btn-block btn-outline-secondary d-flex justify-content-between align-items-center dropdown-toggle">
        {selectedUnit
          ? selectedUnit.shortName + " - " + selectedUnit.name
          : "None"}
        <ExpandMoreIcon size={18} />
      </button>
      <div className="dropdown-menu">
        {!!showNull && (
          <button
            type="button"
            className="dropdown-item"
            onClick={() => onSelect(null)}>
            None
          </button>
        )}
        {availableUnits.map((availableUnit, index) => (
          <button
            key={"available-unit-item-" + index}
            type="button"
            className="dropdown-item"
            onClick={() => onSelect(availableUnit)}>
            {availableUnit.shortName} - {availableUnit.name}
          </button>
        ))}
      </div>
    </div>
  );
};

UnitPicker.propTypes = {
  selectedUnit: PropTypes.shape({
    shortName: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
  }),
  availableUnits: PropTypes.arrayOf(
    PropTypes.shape({
      shortName: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired
    })
  ).isRequired,
  disabled: PropTypes.bool,
  showNull: PropTypes.bool
};

export default UnitPicker;
