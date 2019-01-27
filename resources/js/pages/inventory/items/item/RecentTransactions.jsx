import React, { Fragment, PureComponent } from "react";
import moment from "moment";
import numeral from "numeral";
import { Link } from "react-router-dom";

export default class RecentTransactions extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      highlighted: null
    };
  }

  render() {
    const {
      fetching,
      mutations,
      slug,
      unit: { data: unit }
    } = this.props;
    const transactions = mutations
      ? [
          ...mutations.data
            .sort((firstMutation, secondMutation) =>
              moment(firstMutation.createdAt).isBefore(
                moment(secondMutation.createdAt)
              )
                ? 1
                : -1
            )
            .slice(0, mutations.data.length > 5 ? 5 : mutations.data.length)
        ]
      : [];

    return (
      <Fragment>
        <h4 className="px-3 mb-3">Recent Transactions</h4>

        <table className="table table-sm mb-3">
          <thead>
            <tr>
              <th className="pl-3">Transaction</th>
              <th className="pr-3 text-right">Quantity</th>
            </tr>
          </thead>
          <tbody>
            {fetching && transactions.length === 0 && (
              <tr>
                <td colSpan={2} className="text-center">
                  Loading..
                </td>
              </tr>
            )}
            {transactions.map((tx, index) => {
              const highlighted = this.state.highlighted === index;
              return (
                <tr
                  key={"recent-transaction-item-" + index}
                  onMouseEnter={() => this.setState({ highlighted: index })}
                  onMouseLeave={() => this.setState({ highlighted: null })}>
                  <td className="pl-3">
                    {highlighted
                      ? moment(tx.createdAt).format("D MMM YY, HH:mm")
                      : tx.mutableType}
                  </td>
                  <td className="pr-3 text-right">
                    {highlighted ? (
                      <div>
                        {numeral(tx.baseUnitQuantity).format("0,0.[0000]")}{' '}
                        <span className="text-muted small">
                          {unit.shortName}
                        </span>
                      </div>
                    ) : (
                      <div>
                        {numeral(tx.quantity).format("0,0.[0000]")}{' '}
                        <span className="text-muted small">
                          {tx.mutable.data.unit.data.shortName}
                        </span>
                      </div>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <div className="mx-3">
          <Link to={"/inventory/items/" + slug + "/tx"}>
            See all transactions
          </Link>
        </div>
      </Fragment>
    );
  }
}
