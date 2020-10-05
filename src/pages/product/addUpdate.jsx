import React, { useEffect, useRef, useState } from "react";
import { Card, Form, Input, Button, message } from "antd";
import LinkButton from "../../components/link-button/LinkButton";
import { ArrowLeftOutlined } from "@ant-design/icons";
import {
  reqCategories,
  reqCategoryById,
  reqAddOrUpdateProduct,
} from "../../api";
import PriceInput from "../../components/PriceInput/PriceInput";
import CustomCascader from "./Cascader/CustomCascader";
import PictureWall from "./PictureWall/PictureWall";
import { useSelector } from "react-redux";
import RichTextEditor from "./RichTextEditor/RichTextEditor";

const Item = Form.Item;
const { TextArea } = Input;

/**
 * Product update and add route component
 */
export default function AddUpdate(props) {
  const [form] = Form.useForm();
  const imgs = useSelector((state) => state.imgs);
  const [isUpdate, setIsUpdate] = useState(false);
  const [Product, setProduct] = useState({});
  const RichTextEditorRef = useRef();
  // const [CategoriesIds, setCategoriesIds] = useState([]);
  // const [IsBusy, setIsBusy] = useState(true);

  // const getParentCategories = async (categoryIds, currentId) => {
  //   if (currentId === "0") {
  //     //base case
  //     return categoryIds;
  //   }
  //   //get categories by Id
  //   const response = await reqCategoryById(currentId);
  //   let result = response.data;
  //   let newId = result.data.parentId;
  //   categoryIds.unshift(currentId);
  //   return await getParentCategories(categoryIds, newId);
  // };
  const loadProfile = async (product) => {
    console.log("setting field value");
    console.log(product);
    //get the categories ID
    // let categoryIds = [];
    // categoryIds.push(product.categoryId);
    // if (product.pCategoryId !== "0") {
    //   categoryIds = await getParentCategories(categoryIds, product.pCategoryId);
    // }
    // console.log(categoryIds);
    // setCategoriesIds(categoryIds);
    form.setFieldsValue({
      name: product.name,
      desc: product.desc,
      price: { number: product.price },
      // categoryIds: categoryIds,
    });
  };

  useEffect(() => {
    //check if it add new product or edit a product
    const upDateProduct = props.location.state;
    if (!!upDateProduct) {
      setIsUpdate(!!upDateProduct); //force caste boolean
      setProduct(upDateProduct);
      loadProfile(upDateProduct);
      // const finalCategories = async () => {
      //   const categoriesIds = await loadProfile(upDateProduct);
      //   setCategoriesIds(categoriesIds);
      // };
      // finalCategories();
    }
  }, []);

  // useEffect(() => {
  //   console.log("values change ids");
  //   //console.log(CategoriesIds);
  //   // setIsBusy(false);
  // }, [CategoriesIds]);

  const CascaderOnChange = (value, selectedOptions) => {
    console.log(value, selectedOptions);
  };

  const title = (
    <span>
      <LinkButton onClick={() => props.history.goBack()}>
        <ArrowLeftOutlined style={{ fontSize: 20 }} />
        <span>{isUpdate ? "Edit Product" : "Add Product"}</span>
      </LinkButton>
    </span>
  );

  //Item layout config
  const formItemLayout = {
    labelCol: { span: 2 }, //label width
    wrapperCol: { span: 8 }, //right wrapper width
  };

  //Form submit
  const onFinish = async (values, Image) => {
    // const Image = imgs || [];
    const detail = RichTextEditorRef.current.getDetail(); //called child method
    //collect data
    const { name, desc, price, categoryIds } = values;
    let pCategoryId, categoryId;
    if (categoryIds.length === 1) {
      pCategoryId = "0";
      categoryId = categoryIds[0];
    } else {
      pCategoryId = categoryIds[categoryIds.length - 2];
      categoryId = categoryIds[categoryIds.length - 1];
    }
    let product = {
      name,
      desc,
      price,
      imgs: Image,
      detail,
      pCategoryId,
      categoryId,
    };
    product.price = values.price.number;
    //If update we also need the ._id
    if (isUpdate) {
      product._id = Product._id;
    }
    console.log(product);
    //Make request
    const response = await reqAddOrUpdateProduct(product);
    let result = response.data;
    if (result.status === 0) {
      message.success(`${isUpdate ? "Update" : "Add"} product successfully!`);
      props.history.goBack();
    } else {
      message.error(`${isUpdate ? "Update" : "Add"} product fail!`);
    }
  };

  const checkPrice = (rule, value) => {
    if (value.number > 0) {
      return Promise.resolve();
    }

    return Promise.reject("Price must be greater than zero!");
  };

  const validateMessages = {
    required: "${label} is required!",
  };

  return (
    <Card title={title}>
      <Form
        {...formItemLayout}
        onFinish={(values) => onFinish(values, imgs)}
        initialValues={Product}
        form={form}
      >
        <Item
          label="Product Name"
          name="name"
          rules={[{ required: true }]}
          validateMessages={validateMessages}
        >
          <Input placeholder="Enter Product Name" />
        </Item>
        <Item
          label="Description"
          name="desc"
          rules={[{ required: true }]}
          validateMessages={validateMessages}
        >
          <TextArea
            placeholder="Enter Product Description"
            autoSize={{ minRows: 2, maxRows: 6 }}
          />
        </Item>
        <Item
          label="Product Price"
          name="price"
          rules={[
            { required: true },
            {
              validator: checkPrice,
            },
          ]}
        >
          <PriceInput />
        </Item>
        <Item label="Category" name="categoryIds" rules={[{ required: true }]}>
          <CustomCascader
            onChange={CascaderOnChange}
            Product={props.location.state || {}}
          />
        </Item>
        <Item label="Image">
          {/* <PictureWall imgs={props.location.state || []} /> */}
          <PictureWall {...props} isUpdate={isUpdate} />
        </Item>
        <Item
          label="Product Detail"
          labelCol={{ span: 2 }}
          wrapperCol={{ span: 20 }}
        >
          <RichTextEditor ref={RichTextEditorRef} detail={Product.detail} />
        </Item>
        <Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Item>
      </Form>
    </Card>
  );
}
