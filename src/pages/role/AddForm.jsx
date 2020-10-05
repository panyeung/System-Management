import React, { useEffect } from "react";
import { Form, Input } from "antd";
/**
 * Add Category form component
 */
const Item = Form.Item;

function AddForm({ setForm }) {
  const [form] = Form.useForm();
  useEffect(() => {
    setForm(form);
  }, []);

  const formItemLayout = {
    labelCol: { span: 5 }, //label width
    wrapperCol: { span: 15 }, //right wrapper width
  };

  return (
    <Form initialValues="" form={form}>
      <Item
        name="roleName"
        rules={[{ required: true, message: "Please input your role name!" }]}
        label="Role Name"
        {...formItemLayout}
      >
        <Input placeholder="Enter Role Name"></Input>
      </Item>
    </Form>
  );
}

export default AddForm;
