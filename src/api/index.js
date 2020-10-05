import axios from "axios";
/*
Include application all the request functions
return: promise
*/
import ajax from "./ajax";
//const BASE = "http://localhost:5000";
//Login
export const reqLogin = (username, password) =>
  ajax("/login", { username, password }, "POST");

//Add user
export const reqAddUser = (user) => ajax("/manage/user/add", user, "POST");

//Getting The weather
export const reqWeather = async (city, source = axios.CancelToken.source()) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=967f53b4b8afb38dd07edaab5cf9f971`;
  //const url ="https://api.openweathermap.org/data/2.5/weather"
  let response = await ajax(url, {
    cancelToken: source.token,
  });
  return new Promise((resolve, reject) => {
    const result = response.data;
    const weather = result.weather[0].main;
    const icon = result.weather[0].icon;
    const iconUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`;
    resolve({
      weather,
      iconUrl,
    });
  });
};

//getting Category list
export const reqCategories = (parentId) =>
  ajax("/manage/category/list", { parentId: parentId });

// add Category
export const reqAddCategory = (name, parentId) =>
  ajax("/manage/category/add", { parentId: parentId, name: name }, "POST");

//Update Category
export const reqUpdateCategory = ({ categoryName, categoryId }) =>
  ajax(
    "/manage/category/update",
    { categoryId: categoryId, categoryName: categoryName },
    "POST"
  );

//Get Category by ID
export const reqCategoryById = (categoryId) =>
  ajax("/manage/category/info", { categoryId });

//get the product pages
export const reqProducts = (pageNum, pageSize) =>
  ajax("/manage/product/list", { pageNum, pageSize });

// get the product search
export const reqSearchProducts = ({
  pageNum,
  pageSize,
  searchName,
  searchType, //could be productName/ productDescription
}) =>
  ajax("/manage/product/search", {
    pageNum,
    pageSize,
    [searchType]: searchName,
  });

//update product status (onshelf/off)
export const reqUpdateStatus = (productId, status) =>
  ajax("/manage/product/updateStatus", { productId, status }, "POST");

export const reqDeleteImg = (id) => {
  return ajax("/manage/img/delete", { id: id }, "POST");
};

//add or update product
export const reqAddOrUpdateProduct = (product) =>
  ajax("/manage/product/" + (product._id ? "update" : "add"), product, "POST");

// get all role list
export const reqRoles = () => ajax("/manage/role/list");
// add role
export const reqAddRole = (roleName) =>
  ajax("/manage/role/add", { roleName }, "POST");
// update role
export const reqUpdateRole = (role) =>
  ajax("/manage/role/update", role, "POST");

//Get all user in a list
export const reqUsers = () => ajax("/manage/user/list");

//Delete User
export const reqDeleteUser = (_id) =>
  ajax("manage/user/delete", { _id }, "POST");

export const reqAddOrUpdateUser = (user) =>
  ajax("/manage/user/" + (user._id ? "update" : "add"), user, "POST");
