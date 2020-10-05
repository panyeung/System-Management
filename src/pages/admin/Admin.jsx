import React, { Component } from "react";
import { Redirect, Switch, Route } from "react-router-dom";
import memoryUtils from "../../utils/memoryUtils";
import { Layout } from "antd";
import LeftNav from "../../components/left-nav/LeftNav";
import Header from "../../components/header/Header";
import Home from "../home/Home";
import Category from "../category/Category";
import Product from "../product/Product";
import Role from "../role/role";
import User from "../user/User";
import Bar from "../charts/Bar";
import Line from "../charts/Line";
import Pie from "../charts/Pie";

const { Footer, Sider, Content } = Layout;

/*
Admin Login Router component
*/
export default class Admin extends Component {
  render() {
    const user = memoryUtils.user;
    //if user is not exist
    if (!user || !user._id) {
      //Redirect user to login
      return <Redirect to="/login/" />;
    }
    return (
      <Layout style={{ minHeight: "100%" }}>
        <Sider>
          <LeftNav {...this.props} />
        </Sider>
        <Layout>
          <Header>Header</Header>
          <Content style={{ margin: 20, backgroundColor: "white" }}>
            <Switch>
              <Route path="/home" component={Home} />
              <Route path="/category" component={Category} />
              <Route path="/product" component={Product} />
              <Route path="/role" component={Role} />
              <Route path="/user" component={User} />
              <Route path="/charts/bar" component={Bar} />
              <Route path="/charts/line" component={Line} />
              <Route path="/charts/pie" component={Pie} />
              <Redirect to="/home" />
            </Switch>
          </Content>
          <Footer style={{ textAlign: "center", color: "#cccccc" }}>
            Recommend Using Google Chrome
          </Footer>
        </Layout>
      </Layout>
    );
  }
}
