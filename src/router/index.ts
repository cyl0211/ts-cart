import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/goods-list",
    name: "GoodsList",
    component: () => import("../views/goodsList.vue")
  },
  {
    path: "/pay-page",
    name: "PayPage",
    component: () => import("../views/payPage.vue")
  },
  {
    path: "/",
    name: "Cart",
    component: () => import("../views/cart.vue")
  },
  {
    path: "/function",
    name: "Function",
    component: () => import("../views/practice/function.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  routes
});

export default router;
