import React, { Component, Fragment } from "react";

export default class InventoryItemSettingsImages extends Component {
  render() {
    const { images } = this.props;

    return (
      <Fragment>
        {images.length === 0 && (
          <div className="alert alert-info">
            <div>This item doesn't have an image yet.</div>
          </div>
        )}
      </Fragment>
    );
  }
}
