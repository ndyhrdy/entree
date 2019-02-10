import React, { Fragment, Component } from "react";
import Search from "./ItemsSearch";
import List from "./ItemsList";

export default class InventoryAdjustmentsCreateItems extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.pushDefaultItem();
  }

  componentWillReceiveProps(nextProps) {
    const { availableItems } = this.props;
    if (
      availableItems.data.length === 0 &&
      nextProps.availableItems.data.length > 0
    ) {
      this.pushDefaultItem(nextProps.availableItems.data);
    }
  }

  pushDefaultItem(items = null) {
    const { availableItems, onAddItem, defaultItem } = this.props;
    const itemsToCheck = items ? [...items] : [...availableItems.data];
    if (defaultItem) {
      const toPush = [...itemsToCheck.filter(item => item.slug === defaultItem)];
      toPush.length > 0 && onAddItem(toPush[0]);
    }
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

        {availableItems.data.length === 0 && availableItems.fetching && (
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
