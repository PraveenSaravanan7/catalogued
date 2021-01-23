import axios from 'axios';
const ls=require("local-storage")
var accessToken=ls("accessToken")
export default axios.create({
  baseURL: `http://localhost:3000/`,
  timeout:3000,
  headers:{ 'Authorization': 'Bearer '+accessToken}
});