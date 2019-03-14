import React, { PureComponent } from "react";

export default class ListItem extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      hovering: false
    };
  }

  render() {
    const { hovering } = this.state;
    const {
      disabled,
      primary,
      thumbUrl,
      url,
      onMakePrimary,
      onDelete
    } = this.props;

    return (
      <div
        className="col-3 pb-4"
        onMouseEnter={() => this.setState({ hovering: true })}
        onMouseLeave={() => this.setState({ hovering: false })}>
        <div className="position-relative">
          <img src={thumbUrl || url} className="w-100 rounded" />
          <div
            className={
              "fade d-flex flex-column justify-content-center p-3 rounded fill" +
              (hovering && !disabled ? " show" : "")
            }
            style={{
              background: "rgba(0, 0, 0, 0.8)"
            }}>
            {!primary && (
              <button
                type="button"
                onClick={() => !disabled && onMakePrimary()}
                className="btn btn-outline-light mb-2">
                Set as Primary
              </button>
            )}
            <button
              type="button"
              onClick={() => !disabled && onDelete()}
              className="btn btn-outline-danger">
              Delete
            </button>
          </div>
        </div>
      </div>
    );
  }
}
