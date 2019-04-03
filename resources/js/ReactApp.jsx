import React, { Component } from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { Chart } from "chart.js";

import store, { persistor } from "./store";
import { Main } from "./components";

Chart.defaults.global.defaultFontFamily = "Sarabun";

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Main />
        </PersistGate>
      </Provider>
    );
  }
}

render(<App />, document.getElementById("app"));
