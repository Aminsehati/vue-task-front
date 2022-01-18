import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/users/add",
    name: "users Add",
    component: () => import("../views/users/add"),
  },
  {
    path: "/users/list/:id",
    name: "update user",
    component: () => import("../views/users/edit/_id"),
  },
  {
    path: "/users/list/",
    name: "update user",
    component: () => import("../views/users/list"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
