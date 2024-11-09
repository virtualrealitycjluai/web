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

    <div v-if="showChatBox" class="chat-box-modal">
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

        <div class="output-container" v-if="aiResponse">
          <textarea
            v-model="aiResponse"
            rows="20"
            class="output-box"
            readonly
          ></textarea>
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
import { ref, defineEmits, onMounted, onUnmounted } from "vue";
import bus from "@/utils/bus.js";
const showTalkBool = ref(null); //对话框显隐
const showPopup = ref(false);
const flag = ref(false); // 对话提示显隐，false间隔显示，true不显示

const showChatBox = ref(false); // 控制聊天框显隐
const userInput = ref(""); // 用户输入
const aiResponse = ref(""); // AI 回复

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

function talkWithAI() {
  showChatBox.value = true; // 显示聊天框
}

function closeChatBox() {
  showChatBox.value = false; // 隐藏聊天框
  userInput.value = "";
  aiResponse.value = "";
}

function sendMessage() {
  fetchAIResponse(userInput.value).then((response) => {
    aiResponse.value = response; //
    userInput.value = "";
  });
}

// async function get_conversation_id(){
//   const headers = {
//     'X-Appbuilder-Authorization': 'Bearer bce-v3/ALTAK-3w5g407AVbIwsCGACir4P/9908f731558420188d1837982a26aca93914c70d',
//     'Content-Type': 'application/json'
//   };
//   var raw = JSON.stringify({
//     app_id: "de54f865-787d-4f58-beb6-cf8c3a4f2433",
//   });
//   const response = await axios.post('/v2/app/conversation', raw, { headers });
//   const parsedJson = response.data
//   console.log(parsedJson.conversation_id)
//   return parsedJson.conversation_id
// }

async function fetchAIResponse(message) {
  // const c_id = get_conversation_id()
  const headers = {
    'X-Appbuilder-Authorization': 'Bearer bce-v3/ALTAK-3w5g407AVbIwsCGACir4P/9908f731558420188d1837982a26aca93914c70d',
    'Content-Type': 'application/json'
  };
  var raw = JSON.stringify({
    app_id: "de54f865-787d-4f58-beb6-cf8c3a4f2433",
    query: message,
    stream: false,
    conversation_id: 'd35b19ec-d7cb-49a1-ad71-ebe615e0faa1',
    file_ids: [],
  });

  try {
    const response = await axios.post('/v2/app/conversation/runs', raw, { headers });
    const parsedJson = response.data
    if (parsedJson.answer != '') {
      const outputText = parsedJson.answer;
      return outputText;
    } else {
      return '响应格式异常';
    }
  } catch (error) {
    console.error('获取 AI 回复时出错:', error);
    return '与 AI 通信时出错';
  }
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
        align-items: center;
        justify-content: flex-start;
        width: 45%;
      }

      .input-box {
        width: 100%;
        border: 1px solid #ccc;
        border-radius: 5px;
        padding: 10px;
        resize: none;
        overflow-y: auto; // 超出部分出现垂直滚动条（未实现）
        max-height: 100%;
      }

      .output-box {
        width: 100%;
        border: 1px solid #ccc;
        border-radius: 5px;
        padding: 10px;
        resize: none;
        overflow-y: auto; // 超出部分出现垂直滚动条（未实现）
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
        top: 1.5vh;
        right: 1.5vh;
        cursor: pointer;
      }
    }
  }
}
</style>