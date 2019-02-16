import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { parse } from "querystring";

import api, { routes } from "@/api";
import { fetchItems, pushAdjustment, selectItem } from "@/actions";
import Items from "./Items";
import TypeSelection from "./TypeSelection";

export class InventoryAdjustmentsCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      type: null,

      saving: false,
      errors: null
    };
  }

  save() {
    if (this.state.saving) {
      return;
    }
    this.setState({ saving: true }, () => {
      const {
        type: { key: adjustmentType },
        items
      } = this.state;
      return api
        .post(routes.adjustments, {
          adjustmentType,
          items
        })
        .then(response => {
          this.props.pushAdjustment(response.data.data);

          const query = parse(location.search.substr(1));
          if (
            query._default_item &&
            items.length === 1 &&
            items[0].slug === query._default_item
          ) {
            this.props.selectItem(items[0]);
            return this.props.history.push(
              "/inventory/items/" +
                query._default_item +
                "?_flow=create-adjustment-success"
            );
          }
          this.props.fetchItems();
          return this.props.history.push(
            "/inventory/adjustments?_flow=create-success"
          );
        })
        .catch(error =>
          this.setState({
            errors: error.response ? error.response.data.errors : [error],
            saving: false
          })
        );
    });
  }

  setAdjustmentType(adjustmentType) {
    return this.setState({ type: adjustmentType }, () =>
      this.props.fetchItems()
    );
  }

  render() {
    const { items: selectedItems, type, saving } = this.state;
    const { items: availableItems, location } = this.props;
    const query = parse(location.search.substr(1));

    return (
      <div className="container py-5">
        <ol className="breadcrumb mb-5">
          <li className="breadcrumb-item">
            <Link to="/inventory/adjustments" replace>
              Stock Adjustments
            </Link>
          </li>
          <li className="breadcrumb-item active">Make Adjustment</li>
        </ol>

        <h3 className="mb-4">Make Adjustment</h3>

        <div className="mb-4 bg-white rounded px-3 py-3">
          <TypeSelection
            selected={type !== null}
            onSelect={selection => this.setAdjustmentType(selection)}
          />
        </div>
        {type && (
          <div className="mb-4 bg-white rounded px-3 py-3">
            <Items
              adjustmentType={type}
              selectedItems={selectedItems}
              availableItems={availableItems}
              defaultItem={query._default_item}
              saving={saving}
              onAddItem={item =>
                this.setState({
                  items: [
                    ...selectedItems,
                    {
                      ...item,
                      quantity: 1,
                      selectedUnit: { ...item.unit.data, index: 1, ratio: 1 }
                    }
                  ]
                })
              }
              onRemoveItem={item =>
                this.setState({
                  items: [
                    ...selectedItems.filter(
                      selectedItem => selectedItem.slug !== item.slug
                    )
                  ]
                })
              }
              onSave={() => this.save()}
              onUpdateItem={item =>
                this.setState({
                  items: [
                    ...selectedItems.map(selectedItem =>
                      selectedItem.slug === item.slug
                        ? { ...item }
                        : { ...selectedItem }
                    )
                  ]
                })
              }
            />
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  items: state.items
});

const mapDispatchToProps = {
  fetchItems,
  pushAdjustment,
  selectItem
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InventoryAdjustmentsCreate);
