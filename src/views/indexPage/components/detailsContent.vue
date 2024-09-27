<template>
    <div class="details-content" v-if="data">
        <NormalSwiperCom :data="data.path" />
        <AudioPlayer :audioUrl="data.audio_url" style="margin:1.4vh 0;" />
        <img class="school-icon" src="../images/school-icon.png" alt="" />
        <img class="panorama-icon" src="../images/panorama-icon.png" alt="" @click="PageJump(data.panoramic)"
            v-if="data.panoramic" />
        <div class="content-html" v-html="data.info" v-if="data.info && htmlBool"></div>
    </div>
</template>

<script setup>
import { onMounted, onUnmounted, defineProps, inject } from "vue";
let PageJump = inject("PageJump");

defineProps({
    data: {
        type: Object,
        default: null
    },
    htmlBool: {
        type: Boolean,
        default: false
    },
});
onMounted(() => {
});
onUnmounted(() => {
})
</script>
<style lang="scss">
.details-content {
    position: relative;
    width: 38.9vh;
    height: 100%;
    overflow: hidden;
    overflow-y: scroll;
    display: flex;
    flex-direction: column;

    .school-icon {
        width: 14.9vh;
        height: 14.9vh;
        position: absolute;
        bottom: 0;
        left: 0;
    }

    .panorama-icon {
        width: 3.1vh;
        height: 3.1vh;
        position: absolute;
        top: .6vh;
        right: .6vh;
        z-index: 1;
        cursor: pointer;
    }

    .content-html {
        flex: 1;
        overflow: hidden;
        overflow-y: scroll;
        font-weight: normal;
        font-family: none;
        font-size: 1.5vh;
        color: #1F4470;
        line-height: 2.6vh;
    }

}
</style>