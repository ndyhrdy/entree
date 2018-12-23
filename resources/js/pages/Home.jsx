import React, { PureComponent } from "react";
import { Link } from "react-router-dom";

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
      <div className="container py-5">
        <div className="row">
          {menus.map((menu, index) => (
            <div
            key={"menu-item-" + index}
            className="col-md-4">
              <Link
                className="btn btn-light btn-block text-left p-3 border mb-4"
                to={menu.route}>
                <h5>{menu.title}</h5>
                <div className="text-muted">{menu.subtitle}</div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

const menus = [
  {
    title: "Account Settings",
    subtitle: "Modify settings for your account",
    requiredCapability: "settings.view",
    route: "/settings"
  },
  {
    title: "Inventory",
    subtitle: "Manage items for current store",
    requiredCapability: "items.view",
    route: "/inventory"
  },
  {
    title: "Stores",
    subtitle: "Create, manage and delete stores",
    requiredCapability: "stores.view",
    route: "/stores"
  },
  {
    title: "Users & Permissions",
    subtitle: "Manage staff and their permissions",
    requiredCapability: "users.view",
    route: "/users-permissions"
  },
];
