import React, { PureComponent } from "react";
import moment from "moment";
import { Edit as EditIcon, Delete as DeleteIcon } from "styled-icons/material";
import { Link } from "react-router-dom";

export default class InventoryUnitsListItem extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      highlighted: false
    };
  }

  render() {
    const {
      id,
      name,
      isDefault,
      shortName,
      createdAt,
      isCreatedAutomatically,
      onDelete
    } = this.props;
    const { highlighted } = this.state;

    return (
      <tr
        onMouseEnter={() => this.setState({ highlighted: true })}
        onMouseLeave={() => this.setState({ highlighted: false })}>
        <td>
          {shortName}
          {isDefault && (
            <span className="ml-2 badge badge-success">Default</span>
          )}
          <div className="small text-muted">
            {name}
            {highlighted && (
              <span className="ml-2">
                <Link
                  className="text-dark"
                  to={
                    "/inventory/units/" +
                    id +
                    ":" +
                    shortName.replace(" ", "") +
                    "/edit"
                  }>
                  <EditIcon size={12} /> Edit
                </Link>
                {!isDefault && (
                  <a
                    href="#"
                    className="text-danger ml-2"
                    onClick={e => {
                      e.preventDefault();
                      return onDelete();
                    }}>
                    <DeleteIcon size={12} /> Delete
                  </a>
                )}
              </span>
            )}
          </div>
        </td>
        <td>
          {moment(createdAt).fromNow()}
          {isCreatedAutomatically && (
            <div className="text-muted small">Created automatically</div>
          )}
        </td>
      </tr>
    );
  }
}
