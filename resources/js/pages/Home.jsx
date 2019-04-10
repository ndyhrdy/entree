import React, { Fragment, PureComponent } from "react";
import { connect } from "react-redux";
import {
  PhotoLibrary as InventoryIcon,
  Group as GroupIcon,
  ShoppingCart as ShoppingCartIcon
} from "styled-icons/material";
import moment from "moment";

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
    let timeOfDayString = "morning";
    if (moment().isAfter(moment("12", "H"))) {
      timeOfDayString = "afternoon";
    } else if (moment().isAfter(moment("18", "H"))) {
      timeOfDayString = "evening";
    }

    if (!user.data || user.fetching) {
      return <div className="container py-5">Loading..</div>;
    }

    return (
      <Fragment>
        <div className="bg-dark py-5">
          <div className="container my-5">
            <div className="h1 text-white">
              Good {timeOfDayString}, {user.data.name.split(" ")[0]}!
            </div>
            <div className="h4 text-muted">
              Today is {moment().format("D MMMM YYYY")}
            </div>
          </div>
        </div>
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
      </Fragment>
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
    title: "Inventory",
    subtitle: "Manage items for current store",
    requiredCapability: "items.view",
    requiresActiveStore: true,
    route: "/inventory",
    iconComponent: <InventoryIcon size={36} />
  },
  {
    title: "Purchasing",
    subtitle: "Record purchase history from suppliers",
    requiredCapability: "staff.view",
    requiresActiveStore: true,
    route: "/purchasing",
    iconComponent: <ShoppingCartIcon size={36} />
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
