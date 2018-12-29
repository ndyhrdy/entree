import React, { Fragment, PureComponent } from "react";
import moment from "moment";

export default class CoworkersListItem extends PureComponent {
  render() {
    const { isSelf, name, email, createdAt, acceptedAt } = this.props;

    return (
      <tr>
        <td>
          {isSelf ? (
            "You"
          ) : (
            <Fragment>
              <div>{name || email}</div>
              { !!name && <div className="small text-muted">{email}</div> }
            </Fragment>
          )}
        </td>
        {acceptedAt || isSelf ? (
          <td>{moment(acceptedAt || createdAt).fromNow()}</td>
        ) : (
          <td>
            <div>Invitation sent</div>
            <div className="small text-muted">
              {moment(createdAt).fromNow()}
              {moment(createdAt).isBefore(moment().subtract(1, "hour")) && (
                <a href="#" className="ml-2">
                  Resend invitation
                </a>
              )}
            </div>
          </td>
        )}
      </tr>
    );
  }
}
