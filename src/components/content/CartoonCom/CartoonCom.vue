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

    <div v-if="showChatBox" class="chat-box-modal" @click.stop>
      <div class="chat-box">
        <div class="input-container">
          <textarea
            v-model="userInput"
            placeholder="来试试和我聊天吧"
            rows="20"
            class="intput-box"
          ></textarea>
          <button class="send-button" @click="sendMessage">发送</button>
        </div>

        <div class="output-container">
          <textarea
            v-model="aiResponse"
            rows="20"
            class="output-box"
            readonly
          ></textarea>
          <div v-if="isLoading" class="loading-text">正在等待AI回复...</div>
        </div>
        <img
          src="./images/close-icon.png"
          class="close-button"
          @click="closeChatBox"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { ref, defineEmits, onMounted, onUnmounted, watch } from "vue";
import bus from "@/utils/bus.js";

// 定义响应式变量
const showTalkBool = ref(null); // 对话框显隐
const showPopup = ref(false);
const flag = ref(false); // 对话提示显隐，false间隔显示，true不显示

const showChatBox = ref(false); // 控制聊天框显隐
const userInput = ref(""); // 用户输入
const aiResponse = ref(""); // AI 回复
const isLoading = ref(false); // 加载状态

const emits = defineEmits(["sceneAnmClick"]);

// 监听 showTalkBool 的变化
watch(showTalkBool, (newVal) => {
  if (newVal === true) {
    showPopup.value = false; // 隐藏 popup-dialog
    
  }
});

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

  bus.on("operateBtnClick", () => {
    flag.value = true; // 监听到右侧导航栏点击，关闭自动显示提示
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
  bus.on("roamEndComplete", () => {
    console.log("漫游结束事件");
    flag.value = false;
    randomShowPopup();
  });
  emits("sceneAnmClick");
}

function talkWithAI() {
  showChatBox.value = true; // 显示聊天框
  showTalkBool.value = false; // 关闭对话框
  flag.value = true; // 显示聊天框后，关闭自动显示提示
}

function closeChatBox() {
  showChatBox.value = false; // 隐藏聊天框
  userInput.value = "";
  aiResponse.value = "";
  flag.value = false; // 关闭聊天框后，开启自动显示提示
  randomShowPopup();
}

async function sendMessage() {
  if (userInput.value.trim() === "") {
    return; // 如果输入为空，不发送请求
  }

  isLoading.value = true; // 开始加载
  try {
    const response = await fetchAIResponse(userInput.value);
    aiResponse.value = response;
  } catch (error) {
    aiResponse.value = "出错了，请稍后再试。";
  } finally {
    isLoading.value = false; // 结束加载
    userInput.value = "";
  }
}

async function fetchAIResponse(message) {
  const headers = {
    "X-Appbuilder-Authorization":
      "Bearer bce-v3/ALTAK-3w5g407AVbIwsCGACir4P/9908f731558420188d1837982a26aca93914c70d",
    "Content-Type": "application/json",
  };
  const raw = JSON.stringify({
    app_id: "de54f865-787d-4f58-beb6-cf8c3a4f2433",
    query: message,
    stream: false,
    conversation_id: "d35b19ec-d7cb-49a1-ad71-ebe615e0faa1",
    file_ids: [],
  });

  try {
    const response = await axios.post("/v2/app/conversation/runs", raw, {
      headers,
    });
    const parsedJson = response.data;
    if (parsedJson.answer != "") {
      const outputText = parsedJson.answer;
      return outputText;
    } else {
      return "没有获取到回答";
    }
  } catch (error) {
    console.error("获取 AI 回复时出错:", error);
    return "与 AI 通信时出错";
  }
}
</script>


<style lang="scss">
.cartoon-com {
  width: 32vh;
  height: 23.5vh;
  background-image: url("./images/cartoon-icon.png");
  background-size: 100% 100%;
  position: absolute;
  right: 110px;
  bottom: -20px;
  cursor: pointer;
  z-index: 1001;

  .popup-dialog {
    position: absolute;
    bottom: 25vh;
    right: 3vh;
    background-color: white;
    padding: 10px;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    font-size: 1.2em;
    transition: opacity 1s ease, visibility 1s ease;
    opacity: 0;
    visibility: hidden;

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
    font-size: 1.6vh;
    color: #1f4470;
    line-height: 2.5vh;
    padding: 2.3vh;
    box-sizing: border-box;

    .scene-anm-img {
      width: 9.8vh;
      height: 1.98vh;
      position: absolute;
      bottom: 4vh;
      right: 2.5vh;
      cursor: pointer;
    }

    .talk-to-me-img {
      width: 10vh;
      height: 2vh;
      position: absolute;
      bottom: 4vh;
      right: 15vh;
      cursor: pointer;
    }
  }

  .chat-box-modal {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-image: url("./images/talk-background-2.png");
    background-size: cover;
    background-position: center;
    width: 600px;
    height: 400px;
    border-radius: 10px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
    z-index: 1000;
    display: flex;
    padding: 20px; // 内边距

    .chat-box {
      display: flex;
      flex-direction: row;
      width: 100%;
      height: 100%;

      .input-container {
        margin-right: 20px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        width: 45%;
      }

      .output-container {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        width: 45%;

        .loading-text {
          margin-top: 10px;
          font-style: italic;
          color: #888;
        }
      }

      .input-box {
        width: 100%;
        border: 1px solid #ccc;
        border-radius: 5px;
        padding: 10px;
        resize: none;
        overflow-y: auto; 
        max-height: 100%;
      }

      .output-box {
        width: 100%;
        border: 1px solid #ccc;
        border-radius: 5px;
        padding: 10px;
        resize: none;
        overflow-y: auto; 
        max-height: 100%;
      }

      .send-button {
        background-color: #4caf50;
        color: white;
        border: none;
        border-radius: 5px;
        padding: 10px;
        cursor: pointer;

        &:hover {
          background-color: #45a049;
        }
      }

      .close-button {
        width: 3.7vh;
        height: 3.7vh;
        position: absolute;
        top: 0.5vh;
        right: 0.5vh;
        cursor: pointer;
      }
    }
  }
}
</style>
