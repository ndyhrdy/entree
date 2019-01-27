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
        label: "Base Unit",
        value: this.props.unit.data.name
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
      },
    ];

    return (
      <Fragment>
        {fields.map((field, index) => (
          <div className="mb-3" key={"description-item-" + index}>
            <div className="text-muted small">{field.label}</div>
            <div>{field.value}</div>
          </div>
        ))}
      </Fragment>
    );
  }
}
