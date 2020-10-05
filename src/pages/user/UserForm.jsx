import React, { useEffect, useState } from "react";
import { Form, Input, Select } from "antd";
import userEvent from "@testing-library/user-event";
/**
 * Add Category form component
 */
const Item = Form.Item;
const Option = Select.Option;

function UserForm(props) {
  const [selectUser, setSelectUser] = useState(props.selectUser);
  const [form] = Form.useForm();
  useEffect(() => {
    console.log(props.selectUser);
    setSelectUser(props.selectUser);
    props.setForm(form);
  }, [props.selectUser]);

  const formItemLayout = {
    labelCol: { span: 5 }, //label width
    wrapperCol: { span: 15 }, //right wrapper width
  };

  return (
    <Form initialValues={selectUser} form={form}>
      <Item
        name="username"
        rules={[{ required: true, message: "Please input your username!" }]}
        label="username"
        {...formItemLayout}
      >
        <Input placeholder="Enter userName"></Input>
      </Item>
      {selectUser._id ? null : (
        <Item
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
          label="password"
          {...formItemLayout}
        >
          <Input type="password" placeholder="Enter password!"></Input>
        </Item>
      )}
      <Item name="phone" label="Phone Number" {...formItemLayout}>
        <Input placeholder="Enter Phone Number!"></Input>
      </Item>
      <Item name="email" label="Email" {...formItemLayout}>
        <Input placeholder="Enter Email!"></Input>
      </Item>
      <Item name="role_id" label="Role" {...formItemLayout}>
        <Select placeholder="Please Select role">
          {props.roles.map((role) => (
            <Option key={role._id} value={role._id}>
              {role.name}
            </Option>
          ))}
        </Select>
      </Item>
    </Form>
  );
}

export default UserForm;
