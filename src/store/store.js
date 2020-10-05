import { createStore } from "redux";
import imagReducer from "../store/reducer/imgReducer";

export let store = createStore(
  imagReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
