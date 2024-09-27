<!--
 * @Author: zhangzhe 437050740@qq.com
 * @Date: 2024-09-22 16:36:55
 * @LastEditors: zhangzhe 437050740@qq.com
 * @LastEditTime: 2024-09-25 00:49:00
 * @FilePath: \marketf:\web\liangda-navigator\src\components\content\ContentCom\contentCom.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <div :class="`content-com content-com-size${styleId}`">
        <img src="./images/close-icon.png" class="close-btn" @click="closeBtnClick" alt="">
        <slot />
    </div>
</template>

<script setup>
import { onMounted, onUnmounted, defineProps, defineEmits } from "vue";
defineProps({
    styleId: {
        type: Number,
        default: 0
    },
});
const emits = defineEmits(["closeBtnClick"]);
onMounted(() => {
});
onUnmounted(() => {
})
function closeBtnClick(){
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
}
</style>