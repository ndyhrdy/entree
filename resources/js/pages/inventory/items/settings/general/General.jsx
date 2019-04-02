import React, { PureComponent } from "react";
import { connect } from "react-redux";

import { showPrompt, hidePrompt, removeItem } from "@/actions";
import { FormSection } from "@/components";
import InventoryItemSettingsSKU from "./SKU";
import InventoryItemSettingsRename from "./Rename";
import InventoryItemSettingsConfirmDelete from "./ConfirmDelete";
import InventoryItemsSettingsDescription from "./Description";

class InventoryItemSettingsGeneral extends PureComponent {
  handleDelete() {
    const {
      item: { slug, name, sku }
    } = this.props;
    return this.props.showPrompt(
      <InventoryItemSettingsConfirmDelete
        item={{ slug, name, sku }}
        onDismiss={() => this.props.hidePrompt()}
        onSuccess={() => {
          this.props.hidePrompt();
          this.props.removeItem(this.props.item);
          return this.props.history.push("/inventory/items");
        }}
      />
    );
  }

  render() {
    const {
      item: { name, slug, sku, description }
    } = this.props;

    return (
      <div>
        <h3 className="mb-4">General Settings</h3>
        <FormSection title="Options">
          <div>
            <InventoryItemSettingsSKU item={{ slug, sku }} />
            <InventoryItemSettingsRename item={{ slug, name }} />
          </div>
        </FormSection>
        <FormSection title="Description">
          <InventoryItemsSettingsDescription item={{ slug, description }} />
        </FormSection>
        <FormSection title="Danger Zone">
          <div className="border border-danger rounded px-3 py-4">
            <div className="row">
              <div className="col-8">
                <strong>Delete Item</strong>
                <p>
                  Remove this item from your store's inventory. Deleting an item
                  will not erase its transaction history.
                </p>
              </div>
              <div className="col-4 text-right">
                <button
                  type="button"
                  className="btn btn-outline-danger"
                  onClick={() => this.handleDelete()}>
                  Delete Item
                </button>
              </div>
            </div>
          </div>
        </FormSection>
      </div>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {
  showPrompt,
  hidePrompt,
  removeItem
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InventoryItemSettingsGeneral);
