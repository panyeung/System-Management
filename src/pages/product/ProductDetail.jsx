import React, { useEffect, useState } from "react";
import { Card, List } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import "./Product.css";
import LinkButton from "../../components/link-button/LinkButton";
import { BASE_IMG_URL } from "../../utils/constants";
import { reqCategoryById } from "../../api";

const Item = List.Item;
export default function ProductDetail(props) {
  const [parentCategory, setParentCategory] = useState("");
  //read product detail data from the Home
  const { name, desc, detail, price, imgs } = props.location.state;
  console.log(props.location.state);
  const [FullPath, setFullPath] = useState("");

  //Getting category path of the product
  const getPath = async (categoryId, path) => {
    //baseCase
    if (categoryId === "0") {
      return path;
    }
    //more than one Level
    const categoryResponse = await reqCategoryById(categoryId);
    let categoryResult = categoryResponse.data;
    let categoryName = categoryResult.data.name;
    let parentCategoryId = categoryResult.data.parentId;
    let newPath = "-->" + categoryName + path;
    if (parentCategoryId === "0") {
      newPath = categoryName + path;
    }
    return await getPath(parentCategoryId, newPath);
  };
  const getFullPath = async () => {
    //Getting current product category ID.
    const { pCategoryId, categoryId } = props.location.state;
    //The first level category
    let path = "";
    if (pCategoryId === "0") {
      const response = await reqCategoryById(categoryId);
      let result = response.data;
      const categoryName = result.data.name;
      return (path = categoryName);
    } else {
      let finalPath = await getPath(categoryId, path);
      return finalPath;
    }
  };
  useEffect(() => {
    const finalPath = async () => {
      const resultPath = await getFullPath();
      setFullPath(resultPath);
    };
    finalPath();
  }, []);

  const title = (
    <span>
      <LinkButton>
        <ArrowLeftOutlined
          style={{ marginRight: 10, fontSize: 20 }}
          onClick={() => props.history.goBack()}
        />
      </LinkButton>
      <span>Product Detail</span>
    </span>
  );
  return (
    <Card title={title} className="product-detail">
      <List>
        <Item>
          <span className="product-detail-left">Product Name:</span>
          <span>{name}</span>
        </Item>
        <Item>
          <span className="product-detail-left">Product Description:</span>
          <span>{desc}</span>
        </Item>
        <Item>
          <span className="product-detail-left">Product Price:</span>
          <span>{price}</span>
        </Item>
        <Item>
          <span className="product-detail-left">Category:</span>
          <span>{FullPath}</span>
        </Item>
        <Item>
          <span className="product-detail-left">Product Picture:</span>
          <span>
            {imgs.map((img) => (
              <img
                key={img}
                className="product-img"
                src={img.url}
                alt="product-img"
              />
            ))}
          </span>
        </Item>
        <Item>
          <span className="product-detail-left">Product Description:</span>
          <span dangerouslySetInnerHTML={{ __html: detail }}></span>
        </Item>
      </List>
    </Card>
  );
}
