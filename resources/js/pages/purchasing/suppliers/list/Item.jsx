import React, { PureComponent } from "react";
import { Link } from "react-router-dom";
import moment from "moment";

export default class PurchasingSuppliersListItem extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      highlighted: false
    };
  }

  render() {
    const { slug, id, name, createdAt, createdBy, onDelete } = this.props;
    const { highlighted } = this.state;
    const singleURL = "/purchasing/suppliers/" + slug + "/" + id;

    return (
      <tr
        onMouseEnter={() => this.setState({ highlighted: true })}
        onMouseLeave={() => this.setState({ highlighted: false })}>
        <td>
          <Link to={singleURL}>{name}</Link>
          {highlighted && (
            <div className="small">
              <Link className="text-dark" to={singleURL + "/edit"}>
                Edit
              </Link>
              <a
                href="#"
                className="text-danger ml-2"
                onClick={e => {
                  e.preventDefault();
                  return onDelete();
                }}>
                Delete
              </a>
            </div>
          )}
        </td>
        <td>No purchases yet</td>
        <td>
          <div>{moment(createdAt).fromNow()}</div>
          <div className="small">{createdBy.data.name}</div>
        </td>
      </tr>
    );
  }
}
