import React, { Fragment, PureComponent } from "react";
import moment from "moment";
import numeral from "numeral";
import { Link } from "react-router-dom";

export default class RecentTransactions extends PureComponent {
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
              <th className="pl-3">Date</th>
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
            {transactions.map((tx, index) => (
              <tr key={"recent-transaction-item-" + index}>
                <td className="pl-3">
                  {moment(tx.createdAt).format("D MMM YY")}
                </td>
                <td className="pr-3 text-right">
                  {numeral(tx.baseUnitQuantity).format("0,0.[0000]")}{" "}
                  <span className="text-muted small">{unit.shortName}</span>
                </td>
              </tr>
            ))}
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
