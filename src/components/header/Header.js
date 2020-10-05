import React, { useEffect, useState } from "react";
import "./Header.css";
import { formatDate } from "../../utils/dateUtils";
import memoryUtils from "../../utils/memoryUtils";
import storageUtils from "../../utils/storageUtils";
import { reqWeather } from "../../api/index";
import { withRouter } from "react-router-dom";
import menuList from "../../config/menuConfig";
import LinkButton from "../link-button/LinkButton";
import axios from "axios";
//Modal
import { Modal, Button, Space } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";

const { confirm } = Modal;
/*
left navigation component
*/
function Header(props) {
  const [currentTime, setCurrentTime] = useState(formatDate(Date.now()));
  const [IconUrl, setIconUrl] = useState("");
  const [weather, setWeather] = useState("");
  const username = memoryUtils.user.username;
  let intervalId;

  const getTime = () => {
    //update the time every second
    intervalId = setInterval(() => {
      const Time = formatDate(Date.now());
      setCurrentTime(Time);
    }, 1000);
  };

  //ajax request/timer
  useEffect(() => {
    //update time every second
    getTime();
    return () => {
      //unmount the  time interval
      clearInterval(intervalId);
    };
  });

  useEffect(() => {
    //use ajax to request data
    let unmounted = false;
    let source = axios.CancelToken.source();
    reqWeather("los Angeles", source).then((response) => {
      const { iconUrl, weather } = response;
      setIconUrl(iconUrl);
      setWeather(weather);
    });
  }, []);

  const getTitle = () => {
    let title;
    menuList.forEach((Item) => {
      if (Item.key === path) {
        // if current item's key match with path
        //set the title
        title = Item.title;
      } else if (Item.children) {
        //find the children that match
        const findElement = Item.children.find(
          (searchItem) => searchItem.key === path
        );
        //if match exist
        if (findElement) {
          //set the title
          title = findElement.title;
        }
      }
    });
    return title;
  };

  /*
  handle logout
  */
  const logout = () => {
    //display modal
    Modal.confirm({
      title: "Do you Want to LogOut?",
      icon: <ExclamationCircleOutlined />,
      onOk() {
        //delete the user data
        storageUtils.removeUser();
        memoryUtils.user = {};
        //redirect user to login
        console.log(props);
        props.history.replace("/login");
      },
    });
  };

  const path = props.location.pathname;
  //get the current title
  const title = getTitle();
  return (
    <div className="header">
      <div className="header-top">
        <span className="header-span">Welcome, {username}</span>
        <LinkButton onClick={logout}>Log Out </LinkButton>
      </div>
      <div className="header-bottom">
        <div className="header-bottom-left">{title}</div>
        <div className="header-bottom-right">
          <span>{currentTime}</span>
          <img
            className="header-bottom-right-img"
            src={IconUrl}
            alt="weather"
          ></img>
          <span>{weather}</span>
        </div>
      </div>
    </div>
  );
}

export default withRouter(Header);
