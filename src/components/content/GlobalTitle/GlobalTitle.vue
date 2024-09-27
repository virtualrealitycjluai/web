<!--
 * @Author: zhangzhe 437050740@qq.com
 * @Date: 2024-09-23 11:32:58
 * @LastEditors: zhangzhe 437050740@qq.com
 * @LastEditTime: 2024-09-23 15:12:58
 * @FilePath: \marketf:\web\liangda-navigator\src\components\content\GlobalTitle\GlobalTitle.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <div class="global-title">
        {{ title }}
        <img src="./images/left-icon.png" style="left:-0.5vh;" alt="">
        <img src="./images/right-icon.png" style="right:-0.5vh;" alt="">
    </div>
</template>

<script setup>
import { onMounted, onUnmounted, defineProps } from "vue";
defineProps({
    title: {
        type: String,
        default: "标题"
    },
});
onMounted(() => {
});
onUnmounted(() => {
})
</script>
<style lang="scss">
.global-title {
    height: 3vh;
    background: linear-gradient(90deg, rgba(0, 0, 0, 0) 0%, rgba(122, 211, 255, 0.4) 50%, rgba(0, 0, 0, 0) 100%);
    font-size: 1.6vh;
    color: #1F4470;
    text-align: center;
    line-height: 3.5vh;
    box-sizing: border-box;
    padding: 0 3vh;
    position: relative;
    img{
        width: 1.3vh;
        height: 1.6vh;
        position: absolute;
        top:50%;
        transform: translateY(-50%);
    }
}
</style>