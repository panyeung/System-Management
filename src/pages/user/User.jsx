import React, { useEffect, useState } from "react";
import { Card, Button, Table, Modal, message } from "antd";
import { formatDate } from "../../utils/dateUtils";
import LinkButton from "../../components/link-button/LinkButton";
import { PAGE_SIZE } from "../../utils/constants";
import {
  reqDeleteUser,
  reqUsers,
  reqAddUser,
  reqAddOrUpdateUser,
} from "../../api";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import UserForm from "./UserForm";

export default function User() {
  const [users, setUsers] = useState([]);
  const [isShow, setIsShow] = useState(false); //show modal
  const [roles, setRoles] = useState([]); //all roles
  const [form, setForm] = useState("");
  const [selectUser, setSelectUser] = useState({});
  const renderName = (role_id) => {
    const findRole = roles.find((role) => role._id === role_id);
    if (findRole) {
      return findRole.name;
    }
  };

  const initColumns = [
    {
      title: "username",
      dataIndex: "username",
    },
    {
      title: "email",
      dataIndex: "email",
    },
    {
      title: "phone",
      dataIndex: "phone",
    },
    {
      title: "register time",
      dataIndex: "create_time",
      render: formatDate,
    },
    {
      title: "role",
      dataIndex: "role_id",
      render: renderName,
    },
    {
      title: "control",
      render: (user) => (
        <span>
          <LinkButton onClick={() => showUpdate(user)}>Edit</LinkButton>
          <LinkButton onClick={() => deleteUser(user)}>Delete</LinkButton>
        </span>
      ),
    },
  ];

  const getUsers = async () => {
    const response = await reqUsers();
    let result = response.data;
    console.log(result);
    if (result.status === 0) {
      const { users, roles } = result.data;
      setUsers(users);
      setRoles(roles);
    }
  };

  useEffect(() => {
    //get user data
    getUsers();
  }, []);
  /**
   * Add/update user
   */
  const addOrUpdateUser = async () => {
    //collect data
    const user = form.getFieldsValue();
    form.resetFields();

    //if it is update
    if (selectUser && selectUser._id) {
      user._id = selectUser._id;
    }
    // make request
    const response = await reqAddOrUpdateUser(user);
    let result = response.data;
    if (result.status === 0) {
      message.success(`${selectUser._id ? "Update" : "ADD"} User Successful!`);
      getUsers();
      setIsShow(false);
    } else {
      message.error("Fail to add user, please try again!");
    }
  };

  const deleteUser = (user) => {
    Modal.confirm({
      title: `Do you Want to delete ${user.username}?`,
      icon: <ExclamationCircleOutlined />,
      onOk: async () => {
        const response = await reqDeleteUser(user._id);
        let result = response.data;
        console.log(result);
        if (result.status === 0) {
          message.success("Delete User success!");
          getUsers();
        } else {
          message.error("Delete User fail!");
        }
      },
    });
    console.log(user);
  };

  /**
   * Display edit
   */
  const showUpdate = (user) => {
    console.log("show form", form);
    if (form) {
      form.setFieldsValue(user);
    }
    setIsShow(true);
    setSelectUser(user);
  };

  const showAdd = () => {
    setSelectUser({}); //getrid of save select user
    setIsShow(true);
  };
  const title = (
    <Button type="primary" onClick={showAdd}>
      {" "}
      Create User
    </Button>
  );
  return (
    <Card title={title}>
      <Table
        rowKey="_id"
        bordered
        dataSource={users}
        columns={initColumns}
        pagination={{ defaultPageSize: PAGE_SIZE, showQuickJumper: true }}
      />
      <Modal
        title={selectUser._id ? "Edit User" : "Add User"}
        visible={isShow}
        onOk={addOrUpdateUser}
        onCancel={() => {
          setIsShow(false);
          setSelectUser({});
        }}
      >
        <UserForm
          setForm={(form) => setForm(form)}
          roles={roles}
          selectUser={selectUser}
        />
      </Modal>
    </Card>
  );
}
