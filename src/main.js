import Vue from "vue";
import App from "./App.vue";
import axios from 'axios'
import VueAxios from 'vue-axios'
import { BootstrapVue, BootstrapVueIcons } from "bootstrap-vue";
import VueRouter from "vue-router";
import "babel-polyfill";

Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons);
Vue.use(VueAxios, axios)
Vue.use(VueRouter);

import Home from "./components/Home";
import Persons from "./components/Persons";

const routes = [
  { path: "/", redirect: "/home" },
  { path: "/home", name: "home", component: Home },
  { path: "/persons", name: "persons", component: Persons },
  { path: "*" }
];
const router = new VueRouter({
  routes
});

new Vue({
  router,
  el: "#app",
  render: h => h(App)
});
