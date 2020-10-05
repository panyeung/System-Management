import React, { useEffect, useState } from "react";
import { Card, Select, Input, Button, Table, message } from "antd";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import LinkButton from "../../components/link-button/LinkButton";
import {
  reqProducts,
  reqSearchProducts,
  reqUpdateStatus,
  reqCategoryById,
} from "../../api/index";
import { PAGE_SIZE } from "../../utils/constants";
const Option = Select.Option;

const getParentCategories = async (categoryIds, currentId) => {
  if (currentId === "0") {
    //base case
    return categoryIds;
  }
  //get categories by Id
  const response = await reqCategoryById(currentId);
  let result = response.data;
  let newId = result.data.parentId;
  categoryIds.unshift(currentId);
  return await getParentCategories(categoryIds, newId);
};

const getCategoriesIds = async (product) => {
  let categoryIds = [];
  categoryIds.push(product.categoryId);
  if (product.pCategoryId !== "0") {
    categoryIds = await getParentCategories(categoryIds, product.pCategoryId);
  }
  return categoryIds;
};

/**
 * Product default route component
 */

export default function Home(props) {
  const [Products, setProducts] = useState([]); //product array])
  const [TotalProduct, setTotalProduct] = useState(0); //total products number
  const [Loading, setLoading] = useState(false); //Is it loading?
  const [SearchName, setSearchName] = useState(""); //searchValue
  const [SearchType, setSearchType] = useState("productName");
  const [PageNum, setPageNum] = useState(1); //store page number

  useEffect(() => {
    getProducts(1);
  }, []);

  //Getting the specific page products
  const getProducts = async (pageNum) => {
    setPageNum(pageNum);
    //Show loading
    setLoading(true);
    //If searchName exist, we need to do search page
    let response;
    if (SearchName) {
      response = await reqSearchProducts({
        pageNum,
        pageSize: PAGE_SIZE,
        searchName: SearchName,
        searchType: SearchType,
      });
    } else {
      //NormalSearch
      response = await reqProducts(pageNum, PAGE_SIZE);
    }
    //hide loading
    setLoading(false);
    console.log("inside getProducts", response);
    let result = response.data;
    //Update status
    if (result.status === 0) {
      const { total, list } = result.data;
      setTotalProduct(total);
      setProducts(list);
    }
  };

  /**
   * update product status
   */
  const upDateStatus = async (productId, newStatus) => {
    const response = await reqUpdateStatus(productId, newStatus);
    let result = response.data;
    if (result.status === 0) {
      message.success("Successfully update Product");
      getProducts(PageNum);
    }
  };

  //initialize table columns
  const columns = [
    {
      title: "Product Name",
      dataIndex: "name",
    },
    {
      title: "Product Description",
      dataIndex: "desc",
    },
    {
      title: "Price",
      dataIndex: "price",
      render: (price) => "$" + price, //already define the dataIndex so it is not product anymore
    },
    {
      width: 100,
      title: "Status",
      render: (product) => {
        const { status, _id } = product;
        const newStatus = status === 1 ? 2 : 1;
        return (
          <span>
            <Button type="primary" onClick={() => upDateStatus(_id, newStatus)}>
              {status === 1 ? "offShelf" : "shelf"}
            </Button>
            <span>{status === 1 ? "Shelf" : "offShelf"}</span>
          </span>
        );
      },
    },
    {
      width: 100,
      title: "Control",
      render: (product) => {
        return (
          <span>
            <LinkButton
              // pass product object use state to pass to the detail component
              //Check detail component's location.state
              onClick={() => props.history.push("/product/detail", product)}
            >
              Detail
            </LinkButton>
            <LinkButton
              onClick={() => {
                let categoryIds = getCategoriesIds(product);
                categoryIds
                  .then((result) => {
                    let newProduct = {
                      ...product,
                      categoryIds: result,
                    };
                    props.history.push("/product/addupdate", newProduct);
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              }}
            >
              Edit
            </LinkButton>
          </span>
        );
      },
    },
  ];

  const title = (
    <span>
      <Select
        defaultValue={SearchType}
        style={{ width: 150 }}
        onChange={(value) => setSearchType(value)}
      >
        <Option value="productName">Search By Name</Option>
        <Option value="productDesc">Search By Description</Option>
      </Select>
      <Input
        placeholder="KeyWords"
        style={{ width: 150, margin: "0 15px" }}
        value={SearchName}
        onChange={(event) => setSearchName(event.target.value)}
      />
      <Button type="primary" onClick={() => getProducts(1)}>
        <SearchOutlined /> Search
      </Button>
    </span>
  );

  const extra = (
    <Button
      type="primary"
      onClick={() => props.history.push("/product/addupdate")}
    >
      <PlusOutlined /> Add Product
    </Button>
  );
  return (
    <Card title={title} extra={extra}>
      <Table
        loading={Loading}
        bordered
        dataSource={Products}
        columns={columns}
        rowKey="_id"
        pagination={{
          current: PageNum, //save current Page
          total: TotalProduct,
          defaultPageSize: PAGE_SIZE,
          showQuickJumper: true,
          onChange: getProducts,
        }}
      ></Table>
    </Card>
  );
}
