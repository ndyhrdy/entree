import React, { Component } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import { ExpandMore as ExpandMoreIcon } from "styled-icons/material";

export default class DateRangePicker extends Component {
  render() {
    const { startDate, endDate, className = "", style = {} } = this.props;

    return (
      <div className="dropdown">
        <button
          type="button"
          className={"btn btn-outline-secondary " + className}
          style={style}>
          {moment(startDate).format("DD MMM YY")} -{" "}
          {moment(endDate).format("DD MMM YY")}
          <ExpandMoreIcon size={16} className="ml-2" />
        </button>
      </div>
    );
  }
}

DateRangePicker.propTypes = {
  startDate: PropTypes.instanceOf(Date),
  endDate: PropTypes.instanceOf(Date)
};
