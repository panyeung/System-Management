import store from "store";
/*
local data storage module
*/
const USER_KEY = "user_key";
export default {
  /*
    Save user
    */
  saveUser(user) {
    store.set(USER_KEY, user);
  },
  /*
    read user
    */
  getUser() {
    return store.get(USER_KEY) || {};
  },
  /*
    delete user
    */
  removeUser() {
    store.remove(USER_KEY);
  },
};
