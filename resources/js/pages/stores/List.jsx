import React, { PureComponent } from "react";
import { connect } from "react-redux";
import ListItem from "./ListItem";

export class StoresList extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      filterFunction: this.getFilterFunction(null)
    };
  }

  getFilterFunction(filterBy) {
    switch (filterBy) {
      case "owned":
        return store => store.owner.data.id === this.props.user.id;
      default:
        return () => true;
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.filterBy !== this.props.filterBy) {
      this.setState({
        filterFunction: this.getFilterFunction(nextProps.filterBy)
      });
    }
  }

  render() {
    const { filterFunction } = this.state;
    const { data } = this.props;

    return (
      <table className="table table-hover">
        <thead>
          <tr>
            <th>Store</th>
            <th style={{ width: 150 }}>Owner</th>
            <th style={{ width: 150 }}>Created</th>
          </tr>
        </thead>
        <tbody>
          {data.filter(filterFunction).map((store, index) => (
            <ListItem key={"store-item-" + index} {...store} />
          ))}
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user.data
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StoresList);
