import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import ProductHome from "./Home";
import ProductAddUpdate from "./addUpdate";
import ProductDetail from "./ProductDetail";
import { Provider } from "react-redux";
import { store } from "../../store/store";

export default class Product extends Component {
  render() {
    return (
      <Switch>
        <Provider store={store}>
          <Route path="/product" component={ProductHome} exact />
          <Route path="/product/addupdate" component={ProductAddUpdate} />
          <Route path="/product/detail" component={ProductDetail} />
          <Redirect to="/product" />
        </Provider>
      </Switch>
    );
  }
}
