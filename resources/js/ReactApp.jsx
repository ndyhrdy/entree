import React, { Component } from 'react'
import { render } from "react-dom";
import { Provider } from "react-redux";
import { Chart } from "chart.js";

import store from "./store";
import { Main } from "./components";

Chart.defaults.global.defaultFontFamily = 'Sarabun';

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Main />
      </Provider>
    );
  }
}


render(<App />, document.getElementById('app'));