import React from "react";
import moment from "moment";
import numeral from "numeral";
import { Link } from "react-router-dom";

export default props => {
  const {
    batchNo,
    itemsCount,
    totalPrice,
    createdAt,
    createdBy: { data: createdBy },
    supplier: { data: supplier }
  } = props;
  return (
    <tr>
      <td className="align-middle">{supplier.name}</td>
      <td>
        <div>
          <Link to={"/purchasing/purchases/" + batchNo}>{batchNo}</Link>
        </div>
        <div className="small">{itemsCount} items</div>
      </td>
      <td className="text-right align-middle">
        {numeral(totalPrice).format("0,0.[0000]")}
      </td>
      <td>
        <div>{moment(createdAt).fromNow()}</div>
        <div className="small">{createdBy.name}</div>
      </td>
    </tr>
  );
};
