import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementPlus from "element-plus";
import zhCn from "element-plus/dist/locale/zh-cn.mjs";
import "element-plus/theme-chalk/index.css";
createApp(App)
  .use(store)
  .use(router)
  .use(ElementPlus, { locale: zhCn })
  .mount("#app");
router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title;
  }
  next();
});
