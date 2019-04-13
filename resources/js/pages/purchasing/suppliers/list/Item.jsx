import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";

export default props => {
  const { slug, id, name, createdAt, createdBy } = props;
  const singleURL = "/purchasing/suppliers/" + slug + "/" + id;

  return (
    <tr>
      <td>
        <Link to={singleURL}>{name}</Link>
      </td>
      <td>No purchases yet</td>
      <td>
        <div>{moment(createdAt).fromNow()}</div>
        <div className="small">{createdBy.data.name}</div>
      </td>
    </tr>
  );
};
