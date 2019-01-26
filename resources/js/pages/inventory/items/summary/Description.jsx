import React, { Fragment, PureComponent } from "react";
import moment from "moment";

export default class Description extends PureComponent {
  render() {
    const fields = [
      {
        label: "SKU",
        value: this.props.sku
      },
      {
        label: "Created",
        value: (
          <Fragment>
            <div>
              {moment(this.props.createdAt).format("DD MMM YYYY")} (
              {moment(this.props.createdAt).fromNow()})
            </div>
            <div>by {this.props.createdBy.data.name}</div>
          </Fragment>
        )
      }
    ];

    return (
      <div className="bg-white rounded pt-4 pb-1 px-3 mb-4">
        {fields.map((field, index) => (
          <div className="mb-3" key={"description-item-" + index}>
            <div className="text-muted small">{field.label}</div>
            <div>{field.value}</div>
          </div>
        ))}
      </div>
    );
  }
}
