import React, { Component } from "react";
import moment from "moment";
import numeral from "numeral";
import { DateRangePicker, LoadingIndicator } from "@/components";
import { ColumnHeader } from "@/components/DataTable";

export default class InventoryItemsItemTransactions extends Component {
  constructor(props) {
    super(props);

    this.state = {
      startDate: moment()
        .subtract(6, "months")
        .toDate(),
      endDate: moment().toDate(),
      highlighted: null
    };
  }

  render() {
    const { startDate, endDate, highlighted } = this.state;
    const { baseUnit, mutations, fetching, error } = this.props;

    return (
      <div className="mb-5">
        <div className="mb-3 bg-white rounded pt-4 pb-1">
          <div className="px-3 mb-4 d-flex justify-content-between">
            <div />
            <DateRangePicker startDate={startDate} endDate={endDate} />
          </div>

          <table className="table">
            <thead>
              <tr>
                <ColumnHeader className="pl-3">Transaction</ColumnHeader>
                <ColumnHeader className="text-right" style={{ width: 120 }}>
                  Quantity
                </ColumnHeader>
                <ColumnHeader
                  className="pr-3 text-right"
                  style={{ width: 150 }}>
                  Ending Balance
                </ColumnHeader>
              </tr>
            </thead>
            <tbody>
              {mutations.length === 0 && (
                <tr>
                  <td className="text-center py-5" colSpan={3}>
                    {fetching ? (
                      <LoadingIndicator
                        label="Loading transactions.."
                        size={60}
                      />
                    ) : (
                      "No transactions have been made to this item."
                    )}
                  </td>
                </tr>
              )}
              {mutations.map((mutation, index) => (
                <tr
                  key={"item-transactions-" + index}
                  onMouseEnter={() => this.setState({ highlighted: index })}
                  onMouseLeave={() => this.setState({ highlighted: null })}>
                  <td className="pl-3">
                    {mutation.mutableType} ({mutation.mutable.data.refNo})
                    <div className="text-muted">
                      {moment(mutation.createdAt).format("D MMM YYYY, HH:MM")}
                    </div>
                  </td>
                  <td className="text-right align-middle">
                    {numeral(
                      highlighted === index && !mutation.mutable.data.isBaseUnit
                        ? mutation.baseUnitQuantity
                        : mutation.quantity
                    ).format("0,0.[0000]")}{" "}
                    <span className="text-muted">
                      {highlighted === index &&
                      !mutation.mutable.data.isBaseUnit
                        ? baseUnit.shortName
                        : mutation.unit.data.shortName}
                    </span>
                  </td>
                  <td className="pr-3 text-right align-middle">
                    {numeral(mutation.endingQuantity).format("0,0.[0000]")}{" "}
                    {baseUnit.shortName}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
