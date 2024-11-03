<template>
  <div class="cartoon-com" @click="showTalkBool = !showTalkBool">
    <div class="talk-style" v-if="showTalkBool" @click.stop>
      量量可以带你场景漫游呦。（请先选择目的地后再点击“开始漫游”哦）
      <img
        src="./images/scene-anm-2.png"
        alt=""
        class="scene-anm-img"
        @click.stop="sceneAnmClick"
      />
      <img
        src="./images/talk-to-me.png"
        alt=""
        class="talk-to-me-img"
        @click.stop="talkWithAI"
      />
    </div>
    <div class="popup-dialog" :class="{ show: showPopup }">
      点击我可以与我对话哦
    </div>
  </div>
</template>

<script setup>
import { ref, defineEmits, onMounted, onUnmounted } from "vue";
import bus from "@/utils/bus.js";
const showTalkBool = ref(null); //对话框显隐
const showPopup = ref(false);
const flag = ref(false); // 对话提示显隐，false间隔显示，true不显示
const emits = defineEmits(["sceneAnmClick"]);

onMounted(() => {
  showTalkBool.value = false; // 对话框初始不显示

  bus.on("pointClickComplete", () => {
    showTalkBool.value = true; // 监听到点位点击，显示对话框
    flag.value = true; // 展示点位信息，停止自动显示提示
    console.log(flag.value);
  });

  bus.on("closeContent", () => {
    showTalkBool.value = false; // 监听到关闭点位，隐藏对话框
    flag.value = false; // 监听到关闭点位，开启自动显示提示
    randomShowPopup();
    console.log(flag.value);
  });
  if (!flag.value) {
    console.log(flag.value);
    randomShowPopup();
  }
});

onUnmounted(() => {
  showPopup.value = false;
});

function randomShowPopup() {
  const randomDelay = Math.random() * 5000 + 5000; // 5到10秒间隔
  setTimeout(() => {
    console.log(flag.value);
    showPopup.value = true;
    setTimeout(() => {
      showPopup.value = false;
      if (!flag.value) {
        randomShowPopup(); // 循环调用
      }
    }, 4000); // 显示4秒后隐藏
  }, randomDelay);
}

function sceneAnmClick() {
  showTalkBool.value = false; // 漫游，隐藏对话框
  emits("sceneAnmClick");
}
</script>
<style lang="scss">
.cartoon-com {
  width: 32vh;
  height: 23.5vh;
  background-image: url("./images/cartoon-icon-2.png");
  background-size: 100% 100%;
  position: absolute;
  right: 100px;
  bottom: 0;
  cursor: pointer;
  .popup-dialog {
    position: absolute;
    bottom: 25vh;
    right: 5vh;
    background-color: white;
    padding: 10px;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    font-size: 1.2em;
    transition: opacity 1s ease, visibility 1s ease;
    opacity: 0;
    visibility: hidden;
  }

  .popup-dialog {
    &.show {
      opacity: 1;
      visibility: visible;
    }
  }

  .talk-style {
    width: 26.8vh;
    height: 18.4vh;
    background-image: url("./images/talk-background.png");
    background-size: 100% 100%;
    position: absolute;
    top: 1vh;
    right: -6vh;
    transform: translate(-100%, -100%);
    font-size: 1.5vh;
    color: #1f4470;
    line-height: 2.2vh;
    font-family: none;
    padding: 2.3vh;
    box-sizing: border-box;

    .scene-anm-img {
      width: 10vh;
      height: 2vh;
      position: absolute;
      bottom: 5vh;
      right: 1.9vh;
      cursor: pointer;
    }

    .talk-to-me-img {
      width: 10vh;
      height: 2vh;
      position: absolute;
      bottom: 5vh;
      right: 14vh;
      cursor: pointer;
    }
  }
}
</style>