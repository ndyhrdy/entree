import React, { Fragment, Component } from "react";
import Search from "./ItemsSearch";
import List from "./ItemsList";

export default class InventoryAdjustmentsCreateItems extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      adjustmentType,
      availableItems,
      saving,
      onAddItem,
      onRemoveItem,
      onSave,
      onUpdateItem,
      selectedItems
    } = this.props;

    return (
      <Fragment>
        <div className="h4 mb-3">
          <span className="badge badge-primary">2</span> Select Items and
          Quantity
        </div>

        {availableItems.length === 0 && fetching && (
          <div className="mb-3">Loading items..</div>
        )}

        <Search
          saving={saving}
          items={availableItems}
          onSelect={item =>
            selectedItems.filter(
              selectedItem => selectedItem.slug === item.slug
            ).length === 0 && onAddItem(item)
          }
        />
        <List
          items={selectedItems}
          adjustmentType={adjustmentType}
          disabled={saving}
          onUpdate={item => onUpdateItem(item)}
          onRemove={item => onRemoveItem(item)}
        />
        {selectedItems.length > 0 && (
          <button
            type="button"
            className="btn btn-primary mt-3"
            disabled={saving}
            onClick={() => onSave()}>
            {saving ? "Saving.." : "Save"}
          </button>
        )}
      </Fragment>
    );
  }
}
