import React, { Fragment, Component } from "react";

export default class InventoryAdjustmentsCreateTypeSelection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selection: null
    };
  }

  onSelect(selection) {
    if (this.props.selected) {
      return;
    }
    return this.setState({ selection });
  }

  render() {
    const { onSelect, selected } = this.props;
    const { selection } = this.state;

    return (
      <Fragment>
        <div className="h4 mb-3">
          <span className="badge badge-primary">1</span> Select Adjustment
          Action
        </div>
        {selected ? (
          <div className="mb-2">
            Action: <strong>{selection.label}</strong>
          </div>
        ) : (
          <div className="d-flex mb-2">
            {adjustmentTypes.map(adjustmentType => (
              <div
                key={adjustmentType.key}
                className="custom-control custom-radio mr-3">
                <input
                  type="radio"
                  className="custom-control-input"
                  value={adjustmentType.key}
                  onChange={() => this.onSelect(adjustmentType)}
                  checked={
                    selection ? adjustmentType.key === selection.key : false
                  }
                />
                <label
                  className="custom-control-label"
                  onClick={() => this.onSelect(adjustmentType)}>
                  {adjustmentType.label}
                </label>
              </div>
            ))}
          </div>
        )}
        {selection && <div className="text-muted">{selection.helpText}</div>}

        {selection && !selected && (
          <button
            type="button"
            className="btn btn-primary mt-3"
            onClick={() => onSelect(selection)}>
            Next
          </button>
        )}
      </Fragment>
    );
  }
}

const adjustmentTypes = [
  {
    key: "receipt",
    label: "Receipt",
    helpText: "Set quantity will be added to the current quantity."
  },
  {
    key: "issue",
    label: "Issue",
    helpText: "Set quantity will be subtracted from the current quantity."
  },
  {
    key: "balance",
    label: "Balance",
    helpText: "Set quantity will be set as current quantity."
  }
];
