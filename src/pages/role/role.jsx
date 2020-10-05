import React, { useEffect, useRef, useState } from "react";
import { Card, Button, Table, Modal, message } from "antd";
import { PAGE_SIZE } from "../../utils/constants";
import { reqRoles, reqAddRole, reqUpdateRole } from "../../api";
import AddForm from "./AddForm";
import AuthForm from "./AuthForm";
import memoryUtils from "../../utils/memoryUtils";
import storageUtils from "../../utils/storageUtils";
import { formatDate } from "../../utils/dateUtils";

export default function Role(props) {
  const [Roles, setRoles] = useState([]);
  const [Role, setRole] = useState({}); // the select row
  const [isShowAdd, setisShowAdd] = useState(false); //show modal add
  const [isShowAuth, setisShowAuth] = useState(false); //show modal auth
  const [form, setForm] = useState("");
  const TreeRef = useRef();

  //Adding Role
  const addRole = () => {
    // form.validateFields((error, values) => {
    //   if (!error) {
    //     //Collect data
    //     console.log(values);
    //     const { roleName } = values;
    //   }
    // });
    form.validateFields(["roleName"]).then(async (values) => {
      //hide modal
      setisShowAdd(false);
      const { roleName } = values;
      form.setFieldsValue({ roleName: "" });
      //Send request
      const response = await reqAddRole(roleName);
      let result = response.data;
      //Based on result display
      if (result.status === 0) {
        message.success("Add Role Successfully!");
        //Getting the newly create role
        const role = result.data;
        setRoles([...Roles, role]);
        //update roles
      } else {
        message.error("Add Role fail!");
      }
    });
  };

  /**
   * update
   */

  const updateRole = async () => {
    //getting new menus
    const menus = TreeRef.current.getMenus();
    Role.menus = menus;
    Role.auth_name = memoryUtils.user.username;
    Role.auth_time = Date.now();

    //Request update
    const response = await reqUpdateRole(Role);
    let result = response.data;
    if (result.status === 0) {
      message.success("Update Role success!");
      //if the update is your curren auth logout
      if (Role._id === memoryUtils.user.role_id) {
        //force logout
        memoryUtils.user = {};
        storageUtils.removeUser();
        props.history.replace("/login");
        message.success(
          "Current User auth have been change. Please Login again!"
        );
      }
      setisShowAuth(false);
    }
  };

  const getAllRoles = async () => {
    const response = await reqRoles();
    let result = response.data;
    if (result.status === 0) {
      const roles = result.data;
      console.log(roles);
      setRoles(roles);
    }
  };
  useEffect(() => {
    //get the data
    getAllRoles();
  }, []);

  const onRow = (role) => {
    return {
      onClick: (event) => {
        //click row
        setRole(role);
      },
    };
  };
  const title = (
    <span>
      <Button type="primary" onClick={() => setisShowAdd(true)}>
        Create Role
      </Button>{" "}
      &nbsp; &nbsp;
      <Button
        type="primary"
        disabled={!Role._id}
        onClick={() => setisShowAuth(true)}
      >
        Assign Role
      </Button>
    </span>
  );
  const initColumn = [
    {
      title: "User Name",
      dataIndex: "name",
    },
    {
      title: "Created Time",
      dataIndex: "create_time",
      render: formatDate,
    },
    {
      title: "Auth Time",
      dataIndex: "auth_time",
      render: formatDate,
    },
    {
      title: "Auth Name",
      dataIndex: "auth_name",
    },
  ];
  return (
    <Card title={title}>
      <Table
        rowKey="_id"
        bordered
        dataSource={Roles}
        columns={initColumn}
        pagination={{ defaultPageSize: PAGE_SIZE, showQuickJumper: true }}
        rowSelection={{
          type: "radio",
          selectedRowKeys: [Role._id],
          onSelect: (role) => {
            setRole(role);
          },
        }}
        onRow={onRow}
      />
      <Modal
        title="Add Role"
        visible={isShowAdd}
        onOk={addRole}
        onCancel={() => {
          setisShowAdd(false);
          form.resetFields();
        }}
      >
        <AddForm setForm={(form) => setForm(form)} />
      </Modal>

      <Modal
        title="Add Role"
        visible={isShowAuth}
        onOk={addRole}
        onCancel={() => {
          setisShowAdd(false);
          form.resetFields();
        }}
      >
        <AddForm setForm={(form) => setForm(form)} />
      </Modal>

      <Modal
        title="Assign Role"
        visible={isShowAuth}
        onOk={updateRole}
        onCancel={() => {
          console.log("Oncancel", Role);
          setisShowAuth(false);
        }}
      >
        <AuthForm
          role={Role}
          setForm={(form) => setForm(form)}
          ref={TreeRef}
          isShowAuth={isShowAuth}
        />
      </Modal>
    </Card>
  );
}
