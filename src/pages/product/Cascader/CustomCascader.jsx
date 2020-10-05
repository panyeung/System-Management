import React, { useEffect, useState } from "react";
import { Cascader } from "antd";
import { reqCategories, reqCategoryById } from "../../../api";

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

// const getCategoriesIds = async (product) => {
//   let categoryIds = [];
//   categoryIds.push(product.categoryId);
//   if (product.pCategoryId !== "0") {
//     categoryIds = await getParentCategories(categoryIds, product.pCategoryId);
//   }
//   return categoryIds;
// };

export default function CustomCascader(props) {
  const [options, setOption] = useState([]);
  // const [categoryIds, setCategoryIds] = useState();
  // const [IsBusy, setIsBusy] = useState(true);

  useEffect(() => {
    getCategories("0");
  }, []);
  // useEffect(() => {
  //   console.log("value Change");
  //   console.log(props.value);
  //   setIsBusy(false);
  // }, [props.value]);

  const initOptions = async (categories) => {
    console.log("InsideInitProps", props);
    //setCategoryIds(categoryIds);
    //created options array
    const options = categories.map((option) => ({
      value: option._id,
      label: option.name,
      isLeaf: false,
    }));

    //updateOptions
    setOption(options);
  };

  /**
   *  Getting the categories
   *  return is a promise becuase it is async
   */
  const getCategories = async (parentId) => {
    const response = await reqCategories(parentId);
    let result = response.data; //{status:0, data:}
    if (result.status === 0) {
      const categories = result.data;
      if (parentId === "0") {
        initOptions(categories);
      } else {
        //contain parent
        return categories; //Return success promise with values of subCategories
      }
    }
  };

  /**
   * Loading the next category values
   */
  const loadData = async (selectedOptions) => {
    //getting the option
    console.log(selectedOptions);
    let targetOption = selectedOptions[selectedOptions.length - 1];

    targetOption.loading = true;

    //based on select category, load child categories
    const subCategories = await getCategories(targetOption.value);
    //hide loading
    targetOption.loading = false;
    if (subCategories && subCategories.length > 0) {
      const childOptions = subCategories.map((category) => ({
        value: category._id,
        label: category.name,
        isLeaf: false,
      }));
      //Set the children options
      targetOption.children = childOptions;
    } else {
      targetOption.loading = false;
      //There is no subCategories
      targetOption.isLeaf = true;
    }

    //Update Options
    setOption([...options]);
  };

  return (
    <Cascader
      options={options}
      loadData={loadData} //get data when select a option
      onChange={props.onChange}
    />
  );
}
