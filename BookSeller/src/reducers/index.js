import Userreducer  from './user.js';
import { combineReducers } from "redux";
import Books from './Books.js';
import Cart from './Cart'
import Order from './Order'
export default combineReducers({
  user:Userreducer,
  book:Books,
  cart:Cart,
  order:Order

});
