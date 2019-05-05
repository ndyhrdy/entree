import React from "react";

export default ({ children, style = {}, className = "" }) => {
  return (
    <th
      className={"text-uppercase text-muted small " + className}
      style={style}>
      <strong>{children}</strong>
    </th>
  );
};
