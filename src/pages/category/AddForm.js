import React, { useEffect } from "react";
import { Form, Select, Input } from "antd";
/**
 * Add Category form component
 */
const Item = Form.Item;
const Option = Select.Option;

function AddForm({ categories, parentId, parentName, setForm }) {
  const [form] = Form.useForm();
  useEffect(() => {
    form.setFieldsValue({ parentId: parentName });
    setForm(form);
  }, [parentId, parentName]);

  console.log(categories);
  console.log(parentId);
  console.log(parentName);
  console.log(categories.length === 0);
  return (
    <Form initialValues={{ parentId: parentId, name: "" }} form={form}>
      <Item name="parentId" rules={[{ required: true }]}>
        {/* <Select defaultValue={parentName}>
          {categories.length === 0 ? <Option value="0">Category</Option> : null}
          {categories.map((ele) => (
            <Option value={ele._id}>{ele.name}</Option>
          ))}
        </Select> */}
      </Item>
      <Item name="name">
        <Input placeholder="Enter Category Name"></Input>
      </Item>
    </Form>
  );
}

export default AddForm;
