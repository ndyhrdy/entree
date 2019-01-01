import React, { Fragment, PureComponent } from "react";
import { connect } from "react-redux";
import moment from "moment";

import { showPrompt, hidePrompt, populateCoworkers } from "../../actions";
import CoworkersConfirmDelete from "./ConfirmDelete";

export class CoworkersListItem extends PureComponent {
  promptConfirmRemove() {
    this.props.showPrompt(
      <CoworkersConfirmDelete
        onCancel={() => this.props.hidePrompt()}
        onSuccess={coworkers => {
          this.props.populateCoworkers(coworkers);
          return this.props.hidePrompt();
        }}
        coworker={{ ...this.props }}
        store={this.props.activeStore.data}
      />
    );
  }

  render() {
    const { isOwner, isSelf, name, email, createdAt, acceptedAt } = this.props;
    const RemoveButton = () => (
      <a
        href="#"
        className="text-danger small ml-2"
        onClick={e => {
          e.preventDefault();
          this.promptConfirmRemove();
        }}>
        Remove
      </a>
    );

    return (
      <tr>
        <td>
          <div>
            {isSelf ? "You" : name || email}
            {isOwner && <span className="badge badge-info ml-1 text-white">Owner</span>}
          </div>
          {!!name && <div className="small text-muted">{email}</div>}
        </td>
        <td>
          <div>
            {acceptedAt || isSelf ? (
              <div>
                {moment(acceptedAt || createdAt).fromNow()}
                {!isSelf && <RemoveButton />}
              </div>
            ) : (
              <Fragment>
                <div>
                  Invitation sent <RemoveButton />
                </div>
                <div className="small text-muted">
                  {moment(createdAt).fromNow()}
                  {moment(createdAt).isBefore(moment().subtract(1, "hour")) && (
                    <a href="#" className="ml-2">
                      Resend invitation
                    </a>
                  )}
                </div>
              </Fragment>
            )}
          </div>
        </td>
      </tr>
    );
  }
}

const mapStateToProps = state => ({
  activeStore: state.activeStore
});

const mapDispatchToProps = { showPrompt, hidePrompt, populateCoworkers };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CoworkersListItem);
