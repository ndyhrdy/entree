import React, { PureComponent } from "react";

export default class LoadingIndicator extends PureComponent {
  render() {
    const size = this.props.size || 120;

    return (
      <div className={"text-center " + this.props.className}>
        <img
          src={window.appConfig.baseURL + "/images/loading.gif"}
          alt="Loading.."
          style={{ height: size, width: size }}
        />
        {this.props.label && (
          <div className="mt-2 lead text-center">{this.props.label}</div>
        )}
      </div>
    );
  }
}
