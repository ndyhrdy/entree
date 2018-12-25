import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { fetchStores } from "../../actions";
import List from "./List";

export class StoresHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filterBy: null
    };
  }

  filter(filterBy) {
    this.setState({ filterBy });
  }

  componentDidMount() {
    this.props.fetchStores();
  }

  render() {
    const { filterBy } = this.state;
    const {
      stores: { data, fetching, error }
    } = this.props;

    return (
      <div className="container py-5">
        <h3 className="mb-4">Your Stores</h3>

        <div className="card">
          <div className="card-header">
            <div className="d-flex justify-content-between align-items-center">
              <nav className="nav nav-pills small">
                {filters.map((filter, index) => (
                  <a
                    key={"stores-filter-" + index}
                    href="#"
                    onClick={e => {
                      e.preventDefault();
                      this.filter(filter.filterBy);
                    }}
                    className={
                      "nav-item nav-link" +
                      (filter.filterBy === filterBy ? " active" : "")
                    }>
                    {filter.label}
                  </a>
                ))}
              </nav>
              <div>
                <Link to="/stores/new" className="btn btn-primary">
                  Add Store
                </Link>
              </div>
            </div>
          </div>

          <List
            data={data}
            fetching={fetching}
            error={error}
            filterBy={filterBy}
          />
        </div>
      </div>
    );
  }
}

const filters = [
  { label: "All", filterBy: null },
  { label: "Owned", filterBy: "owned" }
];

const mapStateToProps = state => ({
  stores: state.stores
});

const mapDispatchToProps = { fetchStores };

StoresHome.propTypes = {
  stores: PropTypes.shape({
    data: PropTypes.array.isRequired,
    fetching: PropTypes.bool.isRequired,
    error: PropTypes.any
  })
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StoresHome);
