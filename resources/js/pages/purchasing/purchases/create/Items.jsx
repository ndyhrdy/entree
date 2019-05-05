import React, { Fragment, PureComponent } from "react";
import { connect } from "react-redux";

import { fetchItems } from "@/actions";
import { Header as TableHeader, ColumnHeader } from "@/components/DataTable";
import { AutocompleteInput } from "@/components";
import { discountTypes } from "@/components/DiscountInput";
import ListItem from "./ItemsListItem";

class PurchasingPurchasesCreateItems extends PureComponent {
  constructor(props) {
    super(props);
    this.focusSearch = this.focusSearch.bind(this);
  }

  componentDidMount() {
    this.props.fetchItems();
    this.onSearchFocusShortcut = e => {
      if (e.keyCode === 191) {
        this.focusSearch();
        e.preventDefault();
      }
    };
    window.addEventListener("keydown", this.onSearchFocusShortcut);
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.onSearchFocusShortcut);
  }

  handleAdd(item) {
    return this.props.onChange([
      ...[
        ...this.props.items,
        {
          ...item,
          quantity: 1,
          selectedUnit: { ...item.unit.data, ratio: 1, index: 1 },
          unitPrice: 0,
          subtotal: 0,
          discount: 0,
          discountType: { ...discountTypes[0] }
        }
      ].reverse()
    ]);
  }

  handleRemove(deleteItem) {
    this.props.onChange([
      ...this.props.items.filter(item => item.slug !== deleteItem.slug)
    ]);
    this.searchBox.focus();
  }

  handleUpdate(updateItem) {
    return this.props.onChange([
      ...this.props.items.map(item =>
        item.slug === updateItem.slug ? updateItem : item
      )
    ]);
  }

  focusSearch() {
    return this.searchBox.focus();
  }

  render() {
    const { availableItems, fetchingAvailableItems, items } = this.props;

    return (
      <Fragment>
        <div className="h4 mb-3">
          <span className="badge badge-primary">2</span> Add Purchased Items
        </div>
        <AutocompleteInput
          ref={r => (this.searchBox = r)}
          items={[
            ...availableItems.filter(
              availableItem =>
                items.filter(item => item.slug === availableItem.slug)
                  .length === 0
            )
          ]}
          loading={fetchingAvailableItems}
          onSelect={item => this.handleAdd(item)}
          containerClassName="mb-3"
          placeholder='Search items (Press "/" to focus)'
          inputClassName="py-4"
          renderResult={result => (
            <Fragment>
              {result.images.length > 0 && (
                <img
                  src={result.images[0].thumbUrl}
                  alt={result.name}
                  className="rounded mr-3"
                  style={{ height: 50, width: 50 }}
                />
              )}
              <div style={{ flex: 1 }} className="text-left">
                <div>
                  {result.name} ({result.sku})
                </div>
                <div className="text-muted">
                  Current Quantity: {result.currentQuantity}{" "}
                  {result.unit.data.shortName}
                </div>
              </div>
            </Fragment>
          )}
        />
        <table className="table">
          <TableHeader>
            <tr>
              <ColumnHeader>Item</ColumnHeader>
              <ColumnHeader style={{ width: 200 }} className="text-right">
                Quantity
              </ColumnHeader>
              <ColumnHeader style={{ width: 150 }} className="text-right">
                Price per Unit
              </ColumnHeader>
              <ColumnHeader style={{ width: 200 }} className="text-right">
                Discount
              </ColumnHeader>
              <ColumnHeader style={{ width: 150 }} className="text-right">
                Subtotal
              </ColumnHeader>
            </tr>
          </TableHeader>
          <tbody>
            {items.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center">
                  No items added
                </td>
              </tr>
            ) : (
              items.map((item, index) => (
                <ListItem
                  key={"purchase-item-" + item.slug}
                  item={item}
                  focusOnMount={index === 0}
                  onUpdate={item => this.handleUpdate(item)}
                  onRemove={() => this.handleRemove(item)}
                />
              ))
            )}
          </tbody>
        </table>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  availableItems: state.items.data,
  fetchingAvailableItems: state.items.fetching
});

const mapDispatchToProps = {
  fetchItems
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  {
    forwardRef: true
  }
)(PurchasingPurchasesCreateItems);
