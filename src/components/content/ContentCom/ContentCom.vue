<!--
 * @Author: zhangzhe 437050740@qq.com
 * @Date: 2024-09-22 16:36:55
 * @LastEditors: zhangzhe 437050740@qq.com
 * @LastEditTime: 2024-09-25 00:49:00
 * @FilePath: \marketf:\web\liangda-navigator\src\components\content\ContentCom\contentCom.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <div v-if="showContent" :class="`content-com content-com-size${styleId}`">
        <img src="./images/close-icon.png" class="close-btn" @click="closeBtnClick" alt="">
        <slot />
        <img v-if="styleId === 3" src="./images/scene-anm.png" class="scene-exploration" alt="" @click.stop="effectDisplay"/>
    </div>
    <CartoonCom v-if="styleId === 3" @sceneAnmClick="sceneAnmClick"/>
</template>

<script setup>
import { ref, onMounted, onUnmounted, defineProps, defineEmits, inject, watch } from "vue";
import bus from '@/utils/bus.js'
let mapDom = inject("mapDom");
const showContent = ref(true); // 控制 <div> 的显示
const id = ref("");//存储id
defineProps({
    styleId: {
        type: Number,
        default: 0
    },
});

const emits = defineEmits(["closeBtnClick", "sceneAnmClick", "switchSceneView", "effectDisplay"]);
const handlePointClickComplete = (pointData) => {
    console.log("Contencom点位id", pointData.index_code);
    id.value = pointData.index_code; // id是全局变量，可以在后面使用
    console.log("bus:", id);
};

onMounted(() => {
    //接受点位点击的数据
    bus.on('pointClickComplete', (pointData) => {
        console.log("Contencom点位id",pointData.index_code);
        id.value = pointData.index_code;//id是全局变量，可以在后面使用
        console.log("bus:",id);
    });
});
onUnmounted(() => {
    bus.off('pointClickComplete', handlePointClickComplete);
});


watch(id, (newId) => {
    console.log("更新的 id:", newId);
});

onUnmounted(() => {
    bus.off('pointClickComplete');
})

function closeBtnClick(){
    emits("closeBtnClick");
}

function effectDisplay(){
    console.log("开启特效");
    console.log("bus:",id);
    showContent.value = false; // 隐藏 <div>
    if(id.value==="31"){
        mapDom.value.callAction("switchSceneView", "2843");
        mapDom.value.callAction("displayEffect", "139");
    }
    mapDom.value.callAction("switchSceneView", "2843");//放在条件判断中，这是东校区中转视角，还有个西校区的
    mapDom.value.callAction("displayEffect", "139");
}

function sceneAnmClick(){
    console.log("开启场景漫游");

    console.log(id.value);
    let anmData = {roamId: 94 + parseInt(id.value), IsLoop: "0"};

    emits("sceneAnmClick");
    mapDom.value.callAction("activateRoam", JSON.stringify(anmData));
    mapDom.value.callAction("hideEffect", "139");
    emits("closeBtnClick");
    
}

</script>



<style lang="scss">
.content-com-size0 {
    height: 58vh;
    width: 98.4vh;
    background-image: url("./images/content-bg0.png");
}

.content-com-size1,
.content-com-size2 {
    height: 29.6vh;
    width: 59.2vh;
}

.content-com-size3 {
    height: 68.5vh;
    width: 44.4vh;
    background-image: url("./images/content-bg3.png");
}

.content-com-size1 {
    background-image: url("./images/content-bg1.png");
}

.content-com-size2 {
    background-image: url("./images/content-bg2.png");
}

.content-com {
    background-size: 100% 100%;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    align-items: center;

    .close-btn {
        width: 3.7vh;
        height: 3.7vh;
        position: absolute;
        top: 1.5vh;
        right: 1.5vh;
        cursor: pointer;
    }
    .scene-exploration {
    width: 8.75vh;
    height: 2vh;
    position: absolute;
    bottom: 3.8vh;
    right: 1.9vh;
    cursor: pointer;
}

}
</style>