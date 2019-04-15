import React from "react";
import moment from "moment";

export default props => {
  const { batchNo, totalPrice, createdAt } = props;
  return (
    <tr>
      <td>{batchNo}</td>
      <td className="text-right">{totalPrice}</td>
      <td>
        <div>{moment(createdAt).fromNow()}</div>
      </td>
    </tr>
  );
};
