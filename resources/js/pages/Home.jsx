import React, { PureComponent } from "react";
import { connect } from "react-redux";
import {
  AccountCircle as AccountIcon,
  PhotoLibrary as InventoryIcon,
  StoreMallDirectory as StoresIcon,
  Group as GroupIcon
} from "styled-icons/material";

import { Link } from "react-router-dom";

export class Home extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      menus: menus.slice(0),
      highlighted: null
    };
  }

  render() {
    const { highlighted, menus } = this.state;
    const { activeStore, user } = this.props;

    if (!user.data || user.fetching) {
      return <div className="container py-5">Loading..</div>;
    }

    return (
      <div className="container py-5">
        <div className="row no-gutters align-items-stretch">
          {menus.map((menu, index) =>
            menu.requiresActiveStore && !activeStore.data ? null : (
              <div key={"menu-item-" + index} className="col-md-4">
                <Link
                  className={
                    "btn btn-block p-3 mb-4" +
                    (highlighted === index ? " btn-dark" : "")
                  }
                  onMouseEnter={() => this.setState({ highlighted: index })}
                  onMouseLeave={() => this.setState({ highlighted: null })}
                  to={menu.route}>
                  <div className="d-flex">
                    {menu.iconComponent}
                    <div className="ml-3 text-left">
                      <h5>{menu.title}</h5>
                      <div className="text-muted">{menu.subtitle}</div>
                    </div>
                  </div>
                </Link>
              </div>
            )
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
  activeStore: state.activeStore
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);

const menus = [
  {
    title: "Account Settings",
    subtitle: "Modify settings for your account",
    requiredCapability: "settings.view",
    requiresActiveStore: false,
    route: "/settings",
    iconComponent: <AccountIcon size={36} />
  },
  {
    title: "Inventory",
    subtitle: "Manage items for current store",
    requiredCapability: "items.view",
    requiresActiveStore: true,
    route: "/inventory",
    iconComponent: <InventoryIcon size={36} />
  },
  {
    title: "Stores",
    subtitle: "Create, manage and delete stores",
    requiredCapability: "stores.view",
    requiresActiveStore: false,
    route: "/stores",
    iconComponent: <StoresIcon size={36} />
  },
  {
    title: "Coworkers",
    subtitle: "Invite and manage your coworkers",
    requiredCapability: "staff.view",
    requiresActiveStore: true,
    route: "/coworkers",
    iconComponent: <GroupIcon size={36} />
  }
];
