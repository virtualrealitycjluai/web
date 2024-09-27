import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    redirect: {
      name: "indexPage",
    },
  },
  {
    path: "/indexPage",
    name: "indexPage",
    component: () => import("views/indexPage/indexPage.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
