<!--
 * @Author: zhangzhe 437050740@qq.com
 * @Date: 2024-09-22 14:30:54
 * @LastEditors: zhangzhe 437050740@qq.com
 * @LastEditTime: 2024-09-25 01:40:49
 * @FilePath: \marketf:\web\liangda-navigator\src\views\indexPage\indexPage.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->

<template>
  <div class="index-page">
    <!-- 左侧按钮 -->
    <NavigationCom @navigationClick="navigationClick" />
    <!-- 右侧按钮 -->
    <OperateBtnCom :data="operateData" @operateBtnClick="operateBtnClick" />
    <!-- 点位详情页 -->
    <ContentCom
      :styleId="3"
      v-if="pointDetailsData"
      @closeBtnClick="pointDetailsData = null"
      @effectDisplay="effectDisplay"
      @sceneAnmClick="sceneAnmClick"
    >
      <GlobalTitle :title="pointDetailsData.name" style="margin-top: 3vh" />
      <details-content
        :data="pointDetailsData"
        :htmlBool="true"
        style="padding: 2vh 0; box-sizing: border-box"
      />
    </ContentCom>
    <!-- 详情页 -->
    <ContentCom v-if="swiperContentData.length != 0" @closeBtnClick="clearData">
      <GlobalTitle :title="theOperateData.type" style="margin-top: 3vh" />
      <SwiperCom
        :data="swiperContentData"
        @swiperSlideClick="swiperSlideClick"
      />
    </ContentCom>
    <!-- 轮播图页面 -->
    <ContentCom
      v-if="detailsContentData"
      @closeBtnClick="detailsContentData = null"
    >
      <GlobalTitle :title="detailsContentData.title" style="margin-top: 3vh" />
      <schoolContent :data="detailsContentData" />
    </ContentCom>
    <!-- 码上带走、操作引导、虚拟博物馆 -->
    <ContentCom
      :styleId="theOperateData?.styleId"
      v-if="
        theOperateData?.type == '码上带走' ||
        theOperateData?.type == '操作引导' ||
        theOperateData?.type == '虚拟博物馆'
      "
      @closeBtnClick="theOperateData = null"
    >
      <template v-if="theOperateData.type == '虚拟博物馆'">
        <GlobalTitle :title="theOperateData.type" style="margin-top: 3vh" />
        <museumContent />
      </template>
    </ContentCom>
    <!-- 卡通人物 -->
    <CartoonCom @sceneAnmClick="sceneAnmClick" />
    <div class="quit-style" @quitFunction="quitFunction"></div>
    <ShadowOverlay/>
  </div>
</template>
<script setup>
import bus from "@/utils/bus.js";
import { onMounted, ref, inject } from "vue";
import detailsContent from "./components/detailsContent.vue";
import schoolContent from "./components/schoolContent.vue";
import museumContent from "./components/museumContent.vue";
import ShadowOverlay from "./components/ShadowOverlay.vue";

import {
  RequestIntroductionList,
  RequestIntroductionType,
  RequestIntroductionId,
  RequestScenicId,
} from "@/network/PageRequest.js";

let mapDom = inject("mapDom");
const operateData = ref([
  { type: "校园概况" },
  { type: "计量历史" },
  { type: "量大精神" },
  { type: "行为文化" },
  { type: "虚拟博物馆", styleId: 0 },
  { type: "码上带走", styleId: 1 },
  { type: "操作引导", styleId: 2 },
]); //分类数据组
const theOperateData = ref(null); //记录当前点击分类的数据
const detailsContentData = ref(null); //详情页数据
const pointDetailsData = ref(null); //点位详情页数据
const swiperContentData = ref([]); //轮播图页面数据
const thePointData = ref(null);
onMounted(() => {
  RequestIntroductionList().then((res) => {
    res.data.forEach((item, index) => {
      operateData.value[index].typeId = item.type;
    });
  });

  bus.off();
  //监听场景是否加载成功
  bus.on("sceneLoadComplete", () => {
    setTimeout(() => {
      navigationClick(0);
    });
  });
  //接受点位点击的数据
  bus.on("pointClickComplete", (pointData) => {
    console.log("点位数据", pointData);
    thePointData.value = pointData;
    clearData(); //清除旧数据
    RequestScenicIdFun(pointData.index_code);
  });

  bus.on("roamEndComplete", () => {
    let effectAnmData = 163 + parseInt(thePointData.value.index_code);
    mapDom.value.callAction("hideEffect", effectAnmData.toString());
  });
});

//POI点位视角推进
// function pointViewSwitch(poiId){//要获取web端点击获得设备编号
//     mapDom.value.callAction("switchpointView",poiId);
// }
//POI点位视角返回
// function pointViewBack(poiId){//要获取web端点击获得设备编号
//     mapDom.value.callAction("backToPointView",poiId);
// }
//临时自定义点位
// function customPointSet(poiMessage){//poiMessage是一个web端传入的自定义点位的信息数组
//     //参数说明详见文档
//     mapDom.value.callAction("setCustomPoint",poiMessage);
// }
//线面绘制，先看特效显示的效果

//NavigationCom关联的点击事件
function navigationClick(index) {
  console.log(index);
  let viewId = ""; //视角id
  let type = { typeDatas: [] }; //类型数据
  if (index === 0) {
    //总览
    viewId = "3626";
    type.typeDatas = [""];
  } else if (index === 1) {
    //东校区
    viewId = "3627";
    type.typeDatas = ["1287"];
  } else if (index === 2) {
    //东生活区
    viewId = "3628";
    type.typeDatas = [""];
  } else if (index === 3) {
    //西校区
    viewId = "3629";
    type.typeDatas = ["1286"];
  } else if (index === 4) {
    //西生活区
    viewId = "3630";
    type.typeDatas = [""];
  } else if (index === 5) {
    //文化景点
    viewId = "3631";
    type.typeDatas = ["1288"];
  } else if (index === 6) {
    //道路
    viewId = "3632";
    type.typeDatas = ["1291"];
  }

  //切换场景视角
  if (viewId) mapDom.value.callAction("switchSceneView", viewId);
  mapDom.value.callAction("toggleTypePointVisibility", JSON.stringify(type));
}

//右侧分类点击
function operateBtnClick(itemData) {
  theOperateData.value = itemData;
  console.log("itemData", itemData);
  bus.emit("operateBtnClick");
  clearData();
  if (itemData.typeId) {
    RequestIntroductionType(itemData.typeId).then((res) => {
      if (res.data.length != 0) {
        if (itemData.type == "校园概况" || itemData.type == "行为文化") {
          //获取详情页数据
          RequestIntroductionIdFun(res.data[0].id);
        } else if (itemData.type == "计量历史" || itemData.type == "量大精神") {
          //展示轮播图页面数据
          swiperContentData.value = res.data;
        }
      }
    });
  }
}

//数据清除
function clearData() {
  detailsContentData.value = null; //详情页数据清除
  swiperContentData.value = []; //轮播图页面数据清除
  pointDetailsData.value = null; //点位详情页数据清除
}

//计量历史banner点击
function swiperSlideClick(itemData) {
  RequestIntroductionIdFun(itemData.id);
}

//通过id获取详情页数据
function RequestIntroductionIdFun(id) {
  if (id) {
    RequestIntroductionId(id).then((resData) => {
      detailsContentData.value = resData.data;
    });
  }
}

//通过id获取点位详情页数据
function RequestScenicIdFun(id) {
  if (id) {
    RequestScenicId(id).then((resData) => {
      resData.data.path = [resData.data.path];
      pointDetailsData.value = resData.data;
      console.log("pointDetailsData.value", pointDetailsData.value);
    });
  }
}

function sceneAnmClick() {
    let anmData = { roamId: 106 + parseInt(thePointData.value.index_code), IsLoop: "0" };
    
    console.log("anmData",JSON.stringify(anmData));
    mapDom.value.callAction("activateRoam", JSON.stringify(anmData));
}

function effectDisplay() {
  let effectAnmData0 = 163 + parseInt(thePointData.value.index_code);
  console.log("effectAnmData", effectAnmData0);
  // 东校区
  if (parseInt(thePointData.value.block_id) == 321) {
    mapDom.value.callAction("switchSceneView", "3627");
  }
  // 西校区
  else if (parseInt(thePointData.value.block_id) == 323) {
    mapDom.value.callAction("switchSceneView", "3629");
  }
  // 文化景点
  else if (parseInt(thePointData.value.block_id) == 325) {
    mapDom.value.callAction("switchSceneView", "3631");
  }
  // 道路
  else if (parseInt(thePointData.value.block_id) == 326) {
    mapDom.value.callAction("switchSceneView", "3632");
  }
  mapDom.value.callAction("displayEffect", effectAnmData0.toString());
}

</script>
<style lang="scss" scoped>
.index-page {
  width: 100%;
}
</style>