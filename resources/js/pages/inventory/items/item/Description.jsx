import React, { Fragment, PureComponent } from "react";
import moment from "moment";

export default ({
  createdAt,
  createdBy,
  sku,
  unit,
  unit2 = null,
  unit2Ratio = 0,
  unit3 = null,
  unit3Ratio = 0
}) => {
  const fields = [
    {
      label: "SKU",
      value: sku
    },
    {
      label: "Base Unit",
      value: unit.data.name
    },
    {
      label: "Also comes in",
      value: [
        unit2
          ? unit2.data.name + " (" + unit2Ratio + " " + unit.data.name + ")"
          : "",
        unit3
          ? unit3.data.name + " (" + unit3Ratio + " " + unit.data.name + ")"
          : ""
      ]
        .filter(unit => unit.length > 0)
        .join(", "),
      hide: !unit2 && !unit3
    },
    {
      label: "Created",
      value: (
        <Fragment>
          <div>
            {moment(createdAt).format("DD MMM YYYY")} (
            {moment(createdAt).fromNow()})
          </div>
          <div>by {createdBy.data.name}</div>
        </Fragment>
      )
    }
  ];

  return (
    <Fragment>
      {fields.map((field, index) =>
        !field.hide ? (
          <div className="mb-3" key={"description-item-" + index}>
            <div className="text-muted small">{field.label}</div>
            <div>{field.value}</div>
          </div>
        ) : null
      )}
    </Fragment>
  );
};
