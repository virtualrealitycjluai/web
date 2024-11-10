<template>
    <div v-if="showContent" :class="`content-com content-com-size${styleId}`">
        <img src="./images/close-icon.png" class="close-btn" @click="closeBtnClick" alt="">
        <slot />
        <img v-if="styleId === 3" src="./images/scene-anm.png" class="scene-exploration" alt="" @click.stop="effectDisplay"/>
    </div>
    <!-- <CartoonCom @sceneAnmClick="sceneAnmClick"/> -->
</template>

<script setup>
import { ref, onMounted, onUnmounted, defineProps, defineEmits } from "vue";
import bus from "@/utils/bus.js";
const showContent = ref(null); // 控制 <div> 的显示
defineProps({
    styleId: {
        type: Number,
        default: 0
    },
});

const emits = defineEmits(["closeBtnClick", "sceneAnmClick", "effectDisplay"]);

onMounted(() => {
    showContent.value = true;
});
onUnmounted(() => {
    showContent.value = false;
});

function closeBtnClick(){
    emits("closeBtnClick");
    bus.emit("closeContent");
}

// 显示路线特效
function effectDisplay(){
    showContent.value = false; // 隐藏 <div>
    emits("effectDisplay");
}

// // 场景漫游
// function sceneAnmClick(){
//     emits("sceneAnmClick");
//     emits("closeBtnClick");
// }


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
        width: 5vh;
        height: 5vh;
        position: absolute;
        top: 3.5vh;
        right: 4vh;
        cursor: pointer;
    }
    .scene-exploration {
    width: 8.75vh;
    height: 2vh;
    position: absolute;
    bottom: 8vh;
    right: 5vh;
    cursor: pointer;
}

}
</style>