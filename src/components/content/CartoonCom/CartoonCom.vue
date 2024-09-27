<template>
    <div class="cartoon-com" @click="showTalkBool = !showTalkBool">
        <div class="talk-style" v-if="showTalkBool" @click.stop>
            导航路线已经出来啦，量量可以带你去呦。
            <img src="./images/scene-anm.png" alt="" @click.stop="sceneAnmClick" />
        </div>
    </div>
</template>

<script setup>
import { ref, defineEmits } from "vue";
const showTalkBool = ref(false);//对话框显隐
const emits = defineEmits(["sceneAnmClick"]);
function sceneAnmClick(){
    showTalkBool.value = false;
    emits("sceneAnmClick");
}
</script>
<style lang="scss">
.cartoon-com {
    width: 32vh;
    height: 23.5vh;
    background-image: url("./images/cartoon-icon.png");
    background-size: 100% 100%;
    position: absolute;
    right: 0;
    bottom: 0;
    cursor: pointer;

    .talk-style {
        width: 26.8vh;
        height: 12.4vh;
        background-image: url("./images/talk-background.png");
        background-size: 100% 100%;
        position: absolute;
        top: 1vh;
        right: -6vh;
        transform: translate(-100%, -100%);
        font-size: 1.5vh;
        color: #1F4470;
        line-height: 2.2vh;
        font-family: none;
        padding: 2.3vh;
        box-sizing: border-box;

        img {
            width: 7vh;
            height: 1.6vh;
            position: absolute;
            bottom: 3.8vh;
            right: 1.9vh;
            cursor: pointer;

        }
    }
}
</style>