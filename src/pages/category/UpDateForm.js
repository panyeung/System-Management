import React, { useEffect } from "react";
import { Form, Input } from "antd";
import PropTypes from "prop-types";
/**
 * Add Category form component
 */
const Item = Form.Item;

/**
 * Update Form Component
 */
function UpDateForm({ categoryName, setForm }) {
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({ categoryName: categoryName });
    setForm(form);
  }, [categoryName]);
  return (
    <Form
      form={form}
      initialValues={{ parentId: "0", categoryName: categoryName }}
    >
      <Item
        name="categoryName"
        rules={[
          {
            required: true,
            message: "Please input Category Name",
          },
        ]}
      >
        <Input placeholder="Enter Category Name"></Input>
      </Item>
    </Form>
  );
}

UpDateForm.propTypes = {
  categoryName: PropTypes.string,
};

export default UpDateForm;
