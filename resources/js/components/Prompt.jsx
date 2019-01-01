import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

export class Prompt extends Component {
  render() {
    const { content, shown } = this.props.prompt;

    if (!shown) {
      return null;
    }

    return (
      <div className="modal show" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
        <div
          className="bg-dark"
          style={{
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            position: "absolute",
            display: "block",
            opacity: 0.7
          }}
        />
        <div className="modal-dialog" role="document">
          <div className="modal-content">{content}</div>
        </div>
      </div>
    );
  }
}

Prompt.propTypes = {
  prompt: PropTypes.shape({
    content: PropTypes.any,
    shown: PropTypes.bool.isRequired
  }).isRequired
};

const mapStateToProps = state => ({ prompt: state.prompt });

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Prompt);
