<!--
 * @Author: zhangzhe 437050740@qq.com
 * @Date: 2024-09-22 16:05:32
 * @LastEditors: zhangzhe 437050740@qq.com
 * @LastEditTime: 2024-09-23 15:45:16
 * @FilePath: \marketf:\web\liangda-navigator\src\views\indexPage\components\navigationCom.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <div class="navigation-com">
        <div :class="['navigation-child', { 'navigation-child-sel': navIndex == index }]"
            v-for="(item, index) in navData" :key="index" @click="navigationClick(index)">
            <img :src="require(`./images/nav-icon${index}.png`)" alt="">
            {{ item }}
        </div>
    </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref, defineEmits } from "vue";
const navData = ["楼宇", "道路", "景观", "文化景点", "寝室楼", "校园餐厅"];
const navIndex = ref(0);
const emits = defineEmits(["navigationClick"]);
onMounted(() => {
});
onUnmounted(() => {
});
function navigationClick(index) {
    navIndex.value = index;
    emits("navigationClick", index);
}
</script>
<style lang="scss">
.navigation-com {
    width: 20.4vh;
    height: 57.4vh;
    padding: 4vh 0;
    box-sizing: border-box;
    background-image: url("./images/navigation-bg.png");
    background-size: 100% 100%;
    position: fixed;
    top: 50%;
    left: 4vh;
    transform: translateY(-50%);
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .navigation-child {
        height: 5.6vh;
        display: flex;
        align-items: center;
        cursor: pointer;
        font-size: 1.9vh;
        color: #1F4470;

        img {
            width: 2vh;
            height: auto;
            margin-right: 1.5vh;
            margin-left: 2.5vh;
        }
    }

    .navigation-child-sel {
        color: #FFFFFF;
        background: linear-gradient(0deg, #3ACAFF, #2486FF);
    }
}
</style>