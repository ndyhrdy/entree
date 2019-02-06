import React, { PureComponent } from "react";
import moment from "moment";
import { ExpandMore, NavigateNext } from "styled-icons/material";
import { Chart } from "chart.js";

import { defaultOptions } from "@/helpers/graphs";

export default class QuantityGraph extends PureComponent {
  constructor(props) {
    super(props);
    this.chartArea = React.createRef();
    this.chart = null;
    this.state = {
      interval: intervalSelections.filter(
        intervalSelection => intervalSelection.default
      )[0],
      startDate: moment(new Date())
        .startOf("day")
        .subtract(6, "month")
        .toDate(),
      endDate: moment(new Date())
        .startOf("day")
        .toDate()
    };
  }

  componentWillReceiveProps(nextProps) {
    if (
      !!nextProps.mutations &&
      !!this.chartArea &&
      nextProps.mutations.data.length > 0
    ) {
      this.initGraph({
        mutations: nextProps.mutations.data,
        selectedInterval: this.state.interval,
        startDate: this.state.startDate,
        endDate: this.state.endDate
      });
    }
  }

  componentWillUnmount() {
    this.chart = null;
  }

  initGraph({ mutations, selectedInterval, startDate, endDate }) {
    const intervals = [];
    let currentInterval = moment(startDate).toDate();
    while (moment(currentInterval).isSameOrBefore(moment(endDate))) {
      intervals.push(currentInterval);
      currentInterval = moment(currentInterval).add(1, selectedInterval.key);
    }
    const lastMutationBeforeRange = mutations
      .filter(mutation =>
        moment(mutation.createdAt).isBefore(moment(startDate))
      )
      .sort((firstMutation, secondMutation) =>
        moment(firstMutation.createdAt).isBefore(
          moment(secondMutation.createdAt)
        )
          ? 1
          : -1
      )[0];
    const lastValueBeforeRange = lastMutationBeforeRange
      ? lastMutationBeforeRange.endingQuantity
      : 0;
    const data = [];
    intervals.forEach((interval, intervalIndex) => {
      let mutationDate = null;
      let value = null;
      mutations.forEach(mutation => {
        const createdDate = moment(mutation.createdAt);
        if (
          createdDate.isSameOrAfter(moment(interval)) &&
          (intervals[intervalIndex + 1]
            ? createdDate.isBefore(moment(intervals[intervalIndex + 1]))
            : true) &&
          (mutationDate ? createdDate.isAfter(moment(mutationDate)) : true)
        ) {
          mutationDate = createdDate.toDate();
          value = mutation.endingQuantity;
        }
      });
      data.push(
        value ||
          (intervalIndex === 0 ? lastValueBeforeRange : data[intervalIndex - 1])
      );
    });

    for (let dataIndex = 0; dataIndex < data.length; dataIndex++) {
      if (data[dataIndex] === null && data[dataIndex - 1]) {
        data[dataIndex] = data[dataIndex - 1];
      }
    }
    const chartData = {
      labels: [
        ...intervals.map(interval =>
          moment(interval).format(selectedInterval.format)
        )
      ],
      datasets: [
        {
          data: [...data]
        }
      ]
    };
    if (this.chart) {
      this.chart.data = {...chartData};
      return this.chart.update();
    }
    this.chart = new Chart(this.chartArea.current.getContext("2d"), {
      type: "line",
      data: {...chartData},
      options: defaultOptions
    });
    return;
  }

  selectInterval(selectedInterval) {
    if (selectedInterval.key === this.state.interval.key) {
      return;
    }
    return this.setState({ interval: selectedInterval }, () =>
      this.initGraph({
        chartArea: this.chartArea.current,
        mutations: this.props.mutations.data,
        selectedInterval: this.state.interval,
        startDate: this.state.startDate,
        endDate: this.state.endDate
      })
    );
  }

  render() {
    const { interval, startDate, endDate } = this.state;

    return (
      <div>
        <div className="d-flex justify-content-between align-items-center">
          <h4>Stock Monitor</h4>
          <div className="form-inline">
            <div className="form-group mr-3">
              <label className="mr-2">Interval</label>
              <div className="dropdown">
                <button
                  type="button"
                  className="btn btn-outline-secondary dropdown-toggle"
                  data-toggle="dropdown">
                  {interval.label} <ExpandMore size={16} />
                </button>
                <div className="dropdown-menu dropdown-menu-right">
                  {intervalSelections.map(intervalSelection => (
                    <button
                      key={intervalSelection.key}
                      type="button"
                      className="dropdown-item"
                      onClick={() => this.selectInterval(intervalSelection)}>
                      {interval.key === intervalSelection.key && (
                        <NavigateNext size={16} className="mr-2" />
                      )}
                      {intervalSelection.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="form-group">
              <label className="mr-2">Date Range</label>
              <div className="dropdown">
                <button type="button" className="btn btn-outline-secondary">
                  {moment(startDate).format("DD MMM YY")} -{" "}
                  {moment(endDate).format("DD MMM YY")}
                </button>
              </div>
            </div>
          </div>
        </div>
        {this.props.fetching && <div>Loading transaction history..</div>}

        <canvas ref={this.chartArea} className="mt-3" />
      </div>
    );
  }
}

const intervalSelections = [
  { key: "day", label: "Daily", format: "DD/MM" },
  { key: "week", label: "Weekly", format: "DD/MM" },
  { key: "month", label: "Monthly", format: "MMM", default: true }
];
