import React, { Fragment, PureComponent } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import moment from "moment";

class StoresListItem extends PureComponent {
  render() {
    const {
      slug,
      name,
      description,
      createdAt,
      owner: { data: owner },
      user
    } = this.props;

    return (
      <tr>
        <td>
          <div className="h5 m-0"><Link to={"/stores/" + slug }>{name}</Link></div>
          <div className="text-muted small">{description}</div>
        </td>
        <td>
          {owner.id === user.id ? (
            <div>You</div>
          ) : (
            <Fragment>
              <div>{owner.name}</div>
              <div className="text-muted small">{owner.email}</div>
            </Fragment>
          )}
        </td>
        <td>{moment(createdAt).fromNow()}</td>
      </tr>
    );
  }
}

StoresListItem.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string,
  createdAt: PropTypes.string.isRequired,
  owner: PropTypes.shape({
    data: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired
    }).isRequired
  }).isRequired
};

const mapStateToProps = state => ({
  user: state.user.data
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StoresListItem);
