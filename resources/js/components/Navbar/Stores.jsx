import React, { Fragment, PureComponent } from "react";
import { ChevronRight } from "styled-icons/material";

export default class NavbarStores extends PureComponent {
  render() {
    const {
      activeStore,
      stores: { data, fetching, error }
    } = this.props;

    return (
      <Fragment>
        {(fetching || data.length > 0) && (
          <div className="dropdown-header">
            {fetching ? "Loading stores.." : "Switch to store"}
          </div>
        )}
        {data.length > 0 ? (
          data.map((store, index) => (
            <a
              key={"navbar-store-item-" + index}
              className="dropdown-item text-truncate"
              href="#"
              onClick={e => {
                e.preventDefault();
                this.props.onSwitch(store);
              }}>
              <ChevronRight
                size={18}
                className={
                  "mr-2" +
                  (store.slug !== activeStore.slug ? " text-white" : "")
                }
              />
              {store.name}
            </a>
          ))
        ) : (
          <a
            className="dropdown-item"
            href="#"
            onClick={e => {
              e.preventDefault();
              this.props.onAdd();
            }}>
            Add a Store
          </a>
        )}
      </Fragment>
    );
  }
}
