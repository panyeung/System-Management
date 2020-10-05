import React, { useState } from "react";
import { Form, Input, Button, Checkbox, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { reqLogin } from "../../api";
import memoryUtils from "../../utils/memoryUtils";
import storageUtils from "../../utils/storageUtils";

function CustomForm(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    //event.preventDefault();
    // console.log(`Submitting email ${username}`);
    // console.log(`Submitting password ${password}`);
    const response = await reqLogin(username, password);
    const result = response.data; //{status:0,data:user} {status:1, msg:"error"}
    if (result.status === 0) {
      //Login successfully
      message.success(`Welcome Back: ${result.data.username}`);
      //save it in the memory
      const user = result.data;
      memoryUtils.user = user;

      //Save it in storage
      //save it to local
      storageUtils.saveUser(user);

      //Redirect to the home page
      //Use replace because no need to go back to the login
      //since user already login
      props.history.replace("/");
    } else {
      //login failure
      message.error(result.msg);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <Form
      name="normal_login"
      className="login-form"
      onFinish={handleSubmit}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        name="username"
        rules={[{ required: true, message: "Please input your Username!" }]}
      >
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="Username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: "Please input your Password!" }]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </Form.Item>
      <Form.Item>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          Log in
        </Button>
      </Form.Item>
    </Form>
  );
}

export default CustomForm;
