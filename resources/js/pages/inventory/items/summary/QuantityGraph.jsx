import React, { PureComponent } from "react";
import { times } from "lodash";
import moment from "moment";
import { Chart } from "chart.js";

export default class QuantityGraph extends PureComponent {
  constructor(props) {
    super(props);
    this.chartArea = React.createRef();
    this.chart = null;
    this.state = {};
  }

  componentWillReceiveProps(nextProps) {
    !!nextProps.mutations &&
      !!this.chartArea &&
      this.initGraph(this.chartArea.current, nextProps.mutations.data);
  }

  componentWillUnmount() {
    this.chart = null;
  }

  initGraph(chartArea, mutations) {
    const intervals = times(6, intervalRepeatIndex =>
      moment()
        .subtract(intervalRepeatIndex, "month")
        .date(1)
        .hour(0)
        .minute(0)
        .second(0)
    ).reverse();
    const data = intervals.map((interval, intervalIndex) => {
      let mutationDate = null;
      let value = null;
      mutations.forEach(mutation => {
        const createdDate = moment(mutation.createdAt);
        if (
          createdDate.isSameOrAfter(interval) &&
          (intervals[intervalIndex+1]
            ? createdDate.isBefore(intervals[intervalIndex+1])
            : true) &&
          (mutationDate ? createdDate.isAfter(mutationDate) : true)
        ) {
          mutationDate = createdDate;
          value = mutation.endingQuantity;
        }
      });
      return value;
    });

    for (let dataIndex = 0; dataIndex < data.length; dataIndex++) {
      if (data[dataIndex] === null && data[dataIndex - 1]) {
        data[dataIndex] = data[dataIndex - 1];
      }
    }
    const chartData = {
      labels: intervals.map(interval => interval.format("MMM")),
      datasets: [
        {
          data
        }
      ]
    };
    this.chart = new Chart(chartArea.getContext("2d"), {
      type: "line",
      data: chartData,
      options: {
        legend: { display: false }
      }
    });
  }

  render() {
    return (
      <div>
        {this.props.fetching && <div>Loading transaction history..</div>}

        <canvas ref={this.chartArea} className="mt-3" />
      </div>
    );
  }
}
