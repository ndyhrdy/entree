import React, { PureComponent } from "react";
import PropTypes from "prop-types";

class FormSection extends PureComponent {
  render() {
    const { title, subtitle, children } = this.props;

    return (
      <div className="border-top mb-4 pt-4">
        <div className="row">
          <div className="col-md-3">
            <div className="h4 m-0">{title}</div>
            {subtitle && <div className="text-muted">{subtitle}</div>}
          </div>
          <div className="col-md-9">{children}</div>
        </div>
      </div>
    );
  }
}

FormSection.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string
};

export default FormSection;
