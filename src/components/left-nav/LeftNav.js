import React, { useEffect, useState } from "react";
import "./LeftNav.css";
import logo from "../../assets/images/logo.png";
import { Link, withRouter } from "react-router-dom";
import menuList from "../../config/menuConfig";
import { Menu } from "antd";
import { Icon } from "@ant-design/compatible";
import memoryUtils from "../../utils/memoryUtils";

const { SubMenu } = Menu;
/*
left navigation component
*/
function LeftNav(props) {
  //get the current path name
  let path = props.location.pathname;
  if (path.indexOf("/product") === 0) {
    //product's subRoute
    path = "/product";
  }
  let openParent = "";
  const [menu, setMenu] = useState("");

  useEffect(() => {
    setMenu(getMenuNodes(menuList));
  }, []);

  /**
   *
   * check if current login user have auth
   * for different nav item
   */
  const hasAuth = (item) => {
    const { key, isPublic } = item;
    const menus = memoryUtils.user.role.menus;
    const username = memoryUtils.user.username;
    //if user is admin show all
    //if current item is public
    // if current user have auth: check menus
    if (username === "admin" || isPublic || menus.indexOf(key) !== -1) {
      return true;
    } else if (item.children) {
      //if current user have item's children auth
      return !!item.children.find((child) => menus.indexOf(child.key) !== -1); //return childitem and for bool
    }
    return false;
  };

  /*
    Base on menu list to generate the label
  */
  const getMenuNodes = (menuList) => {
    return menuList.map((item) => {
      /*
        {
          title:
          key:
          icon:
          children: optional
        }
      */
      if (hasAuth(item)) {
        if (!item.children) {
          return (
            <Menu.Item key={item.key} icon={<Icon type={item.icon} />}>
              <Link to={item.key}>{item.title}</Link>
            </Menu.Item>
          );
        } else {
          //Find the match children path with the path
          console.log(item.key);
          const selectItem = item.children.find((citem) => citem.key === path);
          if (selectItem) {
            openParent = item.key;
          }

          return (
            <SubMenu
              key={item.key}
              icon={<Icon type={item.icon} />}
              title={item.title}
            >
              {getMenuNodes(item.children)}
            </SubMenu>
          );
        }
      }
    });
  };
  return (
    <div to="/" className="left-nav">
      <Link to="/" className="left-nav-header">
        <img src={logo} alt="logo"></img>
        <h1>Management System</h1>
      </Link>
      <Menu
        mode="inline"
        theme="dark"
        selectedKeys={[path]}
        defaultOpenKeys={[openParent]}
      >
        {menu}
      </Menu>
    </div>
  );
}

//WithRouter is a higher order component
//Will pass in nonRouter component 3 props
// history, location,match
export default withRouter(LeftNav);
