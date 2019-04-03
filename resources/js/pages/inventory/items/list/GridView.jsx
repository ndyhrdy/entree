import React, { PureComponent } from "react";

import { LoadingIndicator } from "@/components";
import GridViewItem from "./GridViewItem";
import sortData from "./sort";

export default class InventoryItemsListListView extends PureComponent {
  render() {
    const { fetching, error, data, sort } = this.props;
    return (
      <div>
        {fetching && data.length === 0 && (
          <LoadingIndicator
            size={80}
            label="Hang on, we're getting your inventory.."
          />
        )}
        <div
          className="row no-gutters align-items-stretch"
          style={{ marginRight: -16 }}>
          {sortData(data, sort).map((item, index) => (
            <div key={"items-item-" + index} className="col-lg-2 mb-3 pr-3">
              <GridViewItem {...item} />
            </div>
          ))}
        </div>
      </div>
    );
  }
}
