import React, { PureComponent } from "react";
import PropTypes from "prop-types";

class Alert extends PureComponent {
  render() {
    const { children, type, className } = this.props;
    return (
      <div className={["alert", "alert-" + type, className].join(" ")}>
        {children}
      </div>
    );
  }
}

Alert.propTypes = {
  type: PropTypes.oneOf(["light", "success", "warning", "danger", "info"])
    .isRequired,
  className: PropTypes.string
};

export default Alert;
