import React, { PureComponent } from "react";
import { connect } from "react-redux";

import { Link } from "react-router-dom";

export class Home extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      menus: menus.slice(0)
    };
  }

  render() {
    const { menus } = this.state;
    const { activeStore, user } = this.props;

    if (!user.data || user.fetching) {
      return <div className="container py-5">Loading..</div>;
    }

    return (
      <div className="container py-5">
        <div className="row">
          {menus.map((menu, index) =>
            menu.requiresActiveStore && !activeStore.data ? null : (
              <div key={"menu-item-" + index} className="col-md-4">
                <Link
                  className="btn btn-light btn-block text-left p-3 border mb-4"
                  to={menu.route}>
                  <h5>{menu.title}</h5>
                  <div className="text-muted">{menu.subtitle}</div>
                </Link>
              </div>
            )
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({ user: state.user, activeStore: state.activeStore });

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
    route: "/settings"
  },
  {
    title: "Inventory",
    subtitle: "Manage items for current store",
    requiredCapability: "items.view",
    requiresActiveStore: true,
    route: "/inventory"
  },
  {
    title: "Stores",
    subtitle: "Create, manage and delete stores",
    requiredCapability: "stores.view",
    requiresActiveStore: false,
    route: "/stores"
  },
  {
    title: "Coworkers",
    subtitle: "Invite and manage your coworkers",
    requiredCapability: "staff.view",
    requiresActiveStore: true,
    route: "/coworkers"
  }
];
