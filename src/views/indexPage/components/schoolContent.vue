<!--
 * @Author: zhangzhe 437050740@qq.com
 * @Date: 2024-09-23 16:47:39
 * @LastEditors: zhangzhe 437050740@qq.com
 * @LastEditTime: 2024-09-24 18:29:23
 * @FilePath: \marketf:\web\liangda-navigator\src\views\indexPage\components\schoolContent.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <div class="school-content" v-if="data">
        <div class="content-right">
            <details-content :data="data" />
        </div>
        <div class="content-left">
            <GlobalSmallTitle style="margin-bottom:1vh;" title="简介" />
            <div class="content-html" v-html="data.info">
            </div>
        </div>
    </div>
</template>

<script setup>
import detailsContent from './detailsContent.vue';
import { onMounted, onUnmounted, defineProps } from "vue";
defineProps({
    data: {
        type: Object,
        default: null
    }
});
onMounted(() => {
});
onUnmounted(() => {
})
</script>
<style lang="scss">
.school-content {
    width: 100%;
    flex: 1;
    padding: 2vh;
    box-sizing: border-box;
    position: relative;
    display: flex;
    overflow: hidden;

    .content-right {
        margin-right: 3.1vh;
    }

    .content-left {
        flex: 1;
        display: flex;
        flex-direction: column;

        .content-html {
            flex: 1;
            height: 100%;
            overflow: hidden;
            overflow-y: scroll;
            font-weight: normal;
            font-family: none;
            font-size: 1.5vh;
            color: #1F4470;
            line-height: 2.6vh;
        }
    }

}
</style>