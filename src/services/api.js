import axios from 'axios';
const baseUrl = "http://localhost:5000"
// axios.defaults.baseURL = baseUrl;
const instance = axios.create({
  baseURL: baseUrl,
  timeout: 1000,
  headers: {"Accept": "application/json, text/plain, */*"}
});
const get = url => {
  return instance.get(url);
};

const post = (url, data) => {
  return instance.post(url, data);
};

const del = url => {
  return instance.delete(url);
};

export default {
  get,
  post,
  del
};