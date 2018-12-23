import React, { PureComponent } from "react";

export default class Home extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      menus: menus.slice(0)
    };
  }

  render() {
    const { menus } = this.state;

    return (
      <div className="container py-4">
        <div className="row">
          {menus.map((menu, index) => (
            <div key={"menu-item-" + index} className="col-md-3 p-3">
              <h5 className="m-0">{menu.title}</h5>
              <div className="text-muted">{menu.subtitle}</div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

const menus = [
  {
    title: "Stores",
    subtitle: "Manage your stores",
    requiredCapability: "stores.view"
  }
];
