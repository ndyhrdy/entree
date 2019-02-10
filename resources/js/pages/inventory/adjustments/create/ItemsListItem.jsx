import React from "react";
import {
  Add as AddIcon,
  Remove as RemoveIcon,
  ExpandMore as ExpandMoreIcon,
  NavigateNext as NavigateNextIcon
} from "styled-icons/material";

export default props => {
  const { item, adjustmentType, disabled, onUpdate, onRemove } = props;
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
        {item.currentQuantity}{" "}
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
          <div className="input-group" style={{ flex: 1 }}>
            <input
              type="number"
              className="form-control text-right"
              value={item.quantity}
              disabled={disabled}
              onFocus={e => e.target.select()}
              onChange={e =>
                onUpdate({
                  ...item,
                  quantity: parseFloat(e.target.value) >= 0 ? e.target.value : 1
                })
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
                <button
                  onClick={() =>
                    onUpdate({
                      ...item,
                      selectedUnit: { ...item.unit.data, index: 1, ratio: 1 }
                    })
                  }
                  className="dropdown-item">
                  {item.unit.data.shortName}
                </button>
                {!!item.unit2 && (
                  <button
                    onClick={() =>
                      onUpdate({
                        ...item,
                        selectedUnit: {
                          ...item.unit2.data,
                          index: 2,
                          ratio: item.unit2Ratio
                        }
                      })
                    }
                    className="dropdown-item">
                    {item.unit2.data.shortName}{" "}
                    <span className="text-muted">
                      ({item.unit2Ratio} {item.unit.data.shortName})
                    </span>
                  </button>
                )}
                {!!item.unit3 && (
                  <button
                    onClick={() =>
                      onUpdate({
                        ...item,
                        selectedUnit: {
                          ...item.unit3.data,
                          index: 3,
                          ratio: item.unit3Ratio
                        }
                      })
                    }
                    className="dropdown-item">
                    {item.unit3.data.shortName}{" "}
                    <span className="text-muted">
                      ({item.unit3Ratio} {item.unit.data.shortName})
                    </span>
                  </button>
                )}
              </div>
            </div>
          </div>
          <NavigateNextIcon size={16} className="ml-3" />
        </div>
      </td>
      <td
        className={
          "align-middle text-right" + (endingQuantity < 0 ? " text-danger" : "")
        }>
        <strong>{endingQuantity}</strong>{" "}
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
};
