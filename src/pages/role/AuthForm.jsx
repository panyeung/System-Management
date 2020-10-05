import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import { Form, Input, Tree } from "antd";
import menuList from "../../config/menuConfig";
import { set } from "store";
/**
 * Add Category form component
 */
const Item = Form.Item;
//const { TreeNode } = Tree;

const AuthForm = forwardRef((props, ref) => {
  const [form] = Form.useForm();
  const formItemLayout = {
    labelCol: { span: 5 }, //label width
    wrapperCol: { span: 15 }, //right wrapper width
  };

  const [treeData, settreeData] = useState([]);
  const [checkedKeys, setCheckedKeys] = useState(props.role.menus);
  const [autoExpandParent, setAutoExpandParent] = useState(true);

  useEffect(() => {
    console.log("Inside useEffect", props);
    form.setFieldsValue({ roleName: props.role.name });
    props.setForm(form);
    setCheckedKeys(props.role.menus);
  }, [props]);

  useEffect(() => {
    console.log("Inside useEffect2", props.role.menus);
    settreeData(menuList);
  }, []);

  //Allow role component get the checkedKeys
  useImperativeHandle(ref, () => ({
    getMenus() {
      //text to html
      return checkedKeys;
    },
  }));

  const onCheck = (checkedKeys, info) => {
    console.log("onCheck", checkedKeys, info);
    setCheckedKeys(checkedKeys);
  };
  return (
    <Form initialValues={{ roleName: props.role.name }} form={form}>
      <Item
        name="roleName"
        rules={[{ required: true, message: "Please input your role name!" }]}
        label="Role Name"
        {...formItemLayout}
      >
        <Input disabled></Input>
      </Item>
      <Tree
        checkable
        onCheck={onCheck}
        treeData={treeData}
        defaultExpandAll={true}
        checkedKeys={checkedKeys}
        autoExpandParent={autoExpandParent}
      />
    </Form>
  );
});

export default AuthForm;
