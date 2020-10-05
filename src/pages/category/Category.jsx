import React, { useEffect, useState } from "react";
import { Card, Table, Button, message, Modal } from "antd";
import { PlusOutlined, ArrowRightOutlined } from "@ant-design/icons";
import LinkButton from "../../components/link-button/LinkButton";
import {
  reqCategories,
  reqUpdateCategory,
  reqAddCategory,
} from "../../api/index";
import AddForm from "./AddForm";
import UpDateForm from "./UpDateForm";
import { set } from "store";

/*
Product Category
*/
export default function Category() {
  const [categories, setCategories] = useState([]);
  const [SelectCategory, setSelectCategory] = useState("");
  const [SelectCategoryID, setSelectCategoryID] = useState("");
  const [Loading, setLoading] = useState(false);
  //Current display Categories parent ID
  const [ParentId, setParentId] = useState("0");
  const [ParentName, setParentName] = useState("Category");
  const [PreviousName, setPreviousName] = useState([]);
  const [SubCategories, setSubCategories] = useState([]);
  const [showStatus, setShowStatus] = useState(0); //display add/edit modal, 0 both not sure, 1 show add, 2 show update
  //Form control
  const [form, setForm] = useState("");

  useEffect(() => {
    //getting second categories
    //useState not going to immediately update the value
    //Use useEffect to wait for it to update
    console.log("parentID", ParentId);
    getCategories();
    setPreviousName([...PreviousName, { name: ParentName, id: ParentId }]);
  }, [ParentId, ParentName]);

  //Only render once to get the data
  useEffect(() => {
    //get first order categories
    getCategories();
  }, []);

  //Getting second order categories
  const showSubCategories = (category) => {
    console.log("showSubCategories Set_id", category._id);
    console.log("showSubCategories SetName", category.name);
    //update parentId
    setParentId(category._id);
    setParentName(category.name);
  };

  //show the update form
  const showUpdate = (category) => {
    //save the select category
    setSelectCategory(category.name);
    setSelectCategoryID(category._id);
    //Update status
    setShowStatus(2);
  };

  const columns = [
    {
      title: "Category Name",
      dataIndex: "name",
    },
    {
      title: "Action",
      width: 300,
      render: (category) => (
        //display
        <span>
          <LinkButton onClick={() => showUpdate(category)}>
            UpdateCategory
          </LinkButton>
          <LinkButton onClick={() => showSubCategories(category)}>
            ChildrenCategory
          </LinkButton>
        </span>
      ),
    },
  ];

  //Getting the first order/second order category
  const getCategories = async () => {
    // ajax request to get data
    //Set loading true
    setLoading(true);
    const response = await reqCategories(ParentId);
    //request finish
    setLoading(false);
    const result = response.data;
    if (result.status === 0) {
      const list_categories = result.data;
      if (ParentId === "0") {
        setCategories(list_categories);
      } else {
        setSubCategories(list_categories);
      }
    } else {
      message.error("Unable to get the Category");
    }
  };

  /*
    handle Modal close
  */
  const handleCancel = () => {
    setShowStatus(0);
  };

  //Add Category
  const addCategory = async () => {
    console.log("Add Category");
    //hide modal
    setShowStatus(0);
    //getting data and request add
    const { name } = form.getFieldValue();
    console.log("Add Category ParentID", ParentId);
    console.log("Add Category name", name);
    let response = await reqAddCategory(name, ParentId);
    console.log("Add Category response", response);
    let result = response.data;
    if (result.status === 0) {
      //reload category
      getCategories();
    }
  };

  //Update Category
  const updateCategory = async () => {
    console.log("update Category");

    //Get rid of modal
    setShowStatus(0);

    //prepare data
    const categoryId = SelectCategoryID;
    const categoryName = form.getFieldValue("categoryName");

    //Make request to update
    const response = await reqUpdateCategory({ categoryName, categoryId });
    console.log(response);
    let result = response.data;
    if (result.status === 0) {
      //success
      //render the list again
      getCategories();
    }
  };

  const backHandler = (name, id) => {
    // console.log("This is name", name);
    // console.log("This is id", id);
    // console.log("This is parentName", ParentName);
    // console.log("This is parent Id", ParentId);

    let newPrevious = [];
    // console.log("This is original", PreviousName);
    if (
      !(
        PreviousName[PreviousName.length - 1].name &&
        PreviousName[PreviousName.length - 1].id == id
      )
    ) {
      for (let i = 0; i < PreviousName.length; i++) {
        if (PreviousName[i].id === id && PreviousName[i].name === name) {
          break;
        } else {
          newPrevious.push(PreviousName[i]);
        }
      }
      console.log("This is newPrevious", newPrevious);
      setPreviousName(newPrevious);
    }
    setParentName(name);
    setParentId(id);
  };
  //Card left
  const title = PreviousName.map(({ name, id }) => (
    <span>
      <LinkButton onClick={() => backHandler(name, id)}>{name}</LinkButton>
      <ArrowRightOutlined style={{ marginRight: 5 }} />
    </span>
  ));
  //Card right
  const extra = (
    <Button type="primary" onClick={() => setShowStatus(1)}>
      <PlusOutlined />
      Add
    </Button>
  );

  return (
    <Card title={title} extra={extra}>
      <Table
        rowKey="_id"
        bordered
        dataSource={ParentId === "0" ? categories : SubCategories}
        columns={columns}
        pagination={{ defaultPageSize: 5, showQuickJumper: true }}
        loading={Loading}
      />
      <Modal
        title="Add Category"
        visible={showStatus === 1}
        onOk={addCategory}
        onCancel={handleCancel}
      >
        <AddForm
          categories={SubCategories}
          parentId={ParentId}
          parentName={ParentName}
          setForm={(form) => setForm(form)}
        />
      </Modal>
      <Modal
        title="Update Category"
        visible={showStatus === 2}
        onOk={updateCategory}
        onCancel={handleCancel}
      >
        <UpDateForm
          categoryName={SelectCategory}
          setForm={(form) => setForm(form)}
        />
      </Modal>
    </Card>
  );
}
