<!--
 * @Author: zhangzhe 437050740@qq.com
 * @Date: 2023-12-05 16:01:22
 * @LastEditors: zhangzhe 437050740@qq.com
 * @LastEditTime: 2024-09-24 21:28:56
 * @FilePath: \market\src\App.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="appBody" ref="appBody" :style="[{ transform: `translate(-50%, -50%) scale(${appScale})` }]">
    <!-- 三维地图 -->
    <ThreeDimensionalMap ref="mapDom" />
    <!-- 头部标签 -->
    <AppBodyBgCom></AppBodyBgCom>
    <router-view />

    <div class="iframe-style" v-if="iframeScr" v-loading="loadingBool">
      <iframe :src="iframeScr" @load="loadingBool = false" frameborder="0"></iframe>
    </div>
    <el-image class="iframe-btn-logo" :src="require('@/assets/images/close-iframe.png')" fit="cover"
      @click="iframeScr = '';" style="background: #ffffff;" v-if="iframeScr" />

  </div>
  <el-image class="bottomImage" :src="bottomImageUrl" fit="cover" />
</template>

<script setup>
import { provide, onMounted, ref, nextTick } from "vue";
onMounted(() => {
  //适配比例函数
  nextTick(() => {
    CalculatePageSize();
  });
});
let mapDom = ref(null);
provide("mapDom", mapDom);

//全局背景图
const bottomImageUrl = require("@/assets/images/BackgroundImages.png");
//appBody DOM
const appBody = ref(null);
//appBody 比例
const appScale = ref(1);
//适配页面比例
function CalculatePageSize() {
  const appWidth = appBody.value.offsetWidth;
  if (appWidth > window.innerWidth) {
    console.log("适配16 : 9 的比例，当前app宽度超出电脑分辨率宽度。");
    appScale.value = (window.innerWidth / appWidth).toFixed(2); //等比例缩放
    console.log(appScale.value);
  }
}

//全局页面跳转
let iframeScr = ref("");
let loadingBool = ref(false);//iframe加载loading
provide("PageJump", (url, outWeb = false) => {
  if (url) {
    if (outWeb) {
      window.open(url);
    } else {
      iframeScr.value = url;
      loadingBool.value = true;
    }
  }
});
</script>
<style lang="scss">
@import "assets/css/base.css";

@font-face {
  font-family: 'NotoSansHans-Regular';
  src: url('@/assets/fonts/NotoSansHans-Regular.otf') format('opentype');
}

@font-face {
  font-family: 'AlimamaShuHeiTi';
  src: url('@/assets/fonts/AlimamaShuHeiTi-Bold.ttf') format('truetype');
}

@font-face {
  font-family: 'douyuFont';
  src: url('@/assets/fonts/douyuFont-2.otf') format('opentype');
}

@font-face {
  font-family: 'Kingsoft_Cloud_Font';
  src: url('@/assets/fonts/Kingsoft_Cloud_Font.ttf') format('truetype');
}

.iframe-style {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  z-index: 2024;
  background: #fefefe;

  iframe {
    width: 100%;
    height: 100%;
  }
}

.iframe-btn-logo {
  width: 40px;
  height: 40px;
  cursor: pointer;
  margin-left: 10px;
  box-shadow: 0px 0px 10px 7px rgba(65, 77, 114, 0.15);
  border-radius: 50%;
  position: absolute !important;
  top: 10px;
  right: 10px;
  z-index: 2024;
}

.bottomImage {
  width: 100vw;
  height: 100vh;
  position: fixed;
  z-index: -1;
  top: 0px;
  left: 0px;
}

// 16 ： 9
.appBody {
  width: 177.78vh;
  height: 100vh;
  position: fixed;
  left: 50%;
  top: 50%;
  font-family: 'douyuFont';
}
</style>