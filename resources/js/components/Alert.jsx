import React, { PureComponent } from 'react'
import PropTypes from "prop-types";

class Alert extends PureComponent {
  render() {
    const { children, type } = this.props;
    return (
      <div className={[
        'alert',
        'alert-' + type,
      ].join(' ')}>
        { children }
      </div>
    )
  }
}

Alert.propTypes = {
  type: PropTypes.oneOf(['light', 'warning', 'danger', 'info']).isRequired,
};

export default Alert;