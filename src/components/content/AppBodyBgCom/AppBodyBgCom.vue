<!--
 * @Author: zhangzhe 437050740@qq.com
 * @Date: 2024-09-22 14:30:54
 * @LastEditors: zhangzhe 437050740@qq.com
 * @LastEditTime: 2024-09-22 15:56:59
 * @FilePath: \marketf:\web\liangda-navigator\src\components\content\AppBodyBgCom\AppBodyBgCom.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <div class="app-top">
        <img src="./images/labelTop.png" class="app-top-bg" alt="">
        <div class="app-menu">
            <el-dropdown>
                <span class="el-dropdown-link">
                    {{ campusGroup[theCampusIndex] }}
                    <el-icon class="el-icon--right">
                        <arrow-down />
                    </el-icon>
                </span>
                <template #dropdown>
                    <div class="app-menu-view">
                        <div class="app-menu-view-child" v-for="(item, index) in campusGroup" :key="index"
                            @click="theCampusIndex = index; selectCampus(index)">{{ item }}</div>
                    </div>
                </template>
            </el-dropdown>
        </div>
        <!-- 时间信息展示 -->
        <div class="top-information">
            <div>
                <span>{{ yearMonthDay }}</span>
                <span style="margin: 0 1.6vh;">{{ DayOfWeek }}</span>
                <span>{{ hours }}:{{ minutes }}:{{ seconds }}</span>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ArrowDown } from '@element-plus/icons-vue'
import { onMounted, onUnmounted, ref } from "vue";
import { getTime, getTimeChinese, getDayOfWeek } from "@/utils/getTime";
import { inject } from "vue";
const theCampusIndex = ref(0);

let mapDom = inject("mapDom");

const campusGroup = ref(["东校区", "西校区"]);
var yearMonthDay = ref('00年00月00天')//年月日时间
var hours = ref('00')//小时
var minutes = ref('00')//分钟
var seconds = ref('00')//秒
var DayOfWeek = ref('星期一')


let setInTime//定义时间定时器
onMounted(() => {
    setInTime = setInterval(() => {
        let HMS = getTime()
        hours.value = HMS.hours
        minutes.value = HMS.minutes
        seconds.value = HMS.seconds

        let getYearMonthDay = getTimeChinese()
        yearMonthDay.value = getYearMonthDay.basicsTime

        DayOfWeek.value = getDayOfWeek()
    }, 1000);
});
//组件结束销毁定时器
onUnmounted(() => {
    window.clearInterval(setInTime)
})
//切换东西校区视角
function selectCampus(index) {
  if (index === 0) {
    console.log("东校区");
    mapDom.value.callAction("switchSceneView","3627");
  } else {
    console.log("西校区");
    mapDom.value.callAction("switchSceneView","3629");
  }
}
</script>
<style lang="scss">
.app-top {
    position: relative;
    top: 0;
    left: 0;

    .app-top-bg {
        width: 100%;
        position: relative;
    }

    .app-menu {
        position: absolute;
        left: 3vh;
        top: 5.4vh; /* Adjusted down */
        font-size: 1.5vh; /* Dropdown font size slightly reduced */
    }

    .top-information {
        display: flex;
        position: absolute;
        left: 15vh;
        top: 5.4vh; /* Adjusted down */

        span {
            font-size: 1.4vh; /* Original size for time and date display */
            font-weight: bold;
            color: #BDC655;
            margin-right: 1vh;
        }
    }
}

.el-dropdown-link {
    display: flex;
    align-items: center;
    font-weight: bold;
    font-size: 1.8vh;
    color: #BDC655;
}

.el-scrollbar .app-menu-view {
    width: 8vh;
    padding: 0.5vh 0;

    .app-menu-view-child {
        line-height: 2.8vh;
        font-size: 1.3vh;
        color: #1F4470;
        text-align: center;
        cursor: pointer;
    }

    .app-menu-view-child:hover {
        background: linear-gradient(0deg, #3ACAFF, #2486FF);
        color: #FFFFFF;
    }
}
</style>
