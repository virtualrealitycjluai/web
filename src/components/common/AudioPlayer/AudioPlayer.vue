<template>
	<div>
		<audio @timeupdate="updateProgress" controls ref="audioRef" style="display: none">
			<source :src="audioUrl" type="audio/mpeg" />
			您的浏览器不支持音频播放
		</audio>
		<div class="audio_right">
			<div class="slider_box_view">
				<div class="audio_time">
					<span class="audio_time_tip">语音讲解</span>
					<span>{{ audioStart }}/{{ durationTime }}</span>
				</div>
				<el-slider v-model="currentProgress" :show-tooltip="false" @input="handleProgressChange" style="transform: translateY(-20%);" />
			</div>


			<img v-if="!audioIsPlay" @click="playAudio" class="audio_icon" src="./images/play.png" alt="播放" />
			<img v-if="audioIsPlay" @click="playAudio" class="audio_icon" src="./images/pause.png" alt="暂停" />

			<!-- <div class="volume">
				<div class="volume_progress" v-show="audioHuds">
					<el-slider vertical height="100px" class="volume_bar" v-model="audioVolume" :show-tooltip="false"
						@change="handleAudioVolume" />
				</div>
				<img class="volume_icon" v-if="audioVolume <= 0" @click.stop="audioHuds = !audioHuds"
					src="./images/audio_mute.png" alt="" />
				<img class="volume_icon" v-if="audioVolume > 0" @click.stop="audioHuds = !audioHuds"
					src="./images/audio_high.png" alt="" />
			</div> -->
		</div>
	</div>
</template>

<script setup>
import { ref, onMounted, watch, defineProps } from "vue";
const props = defineProps({
	audioUrl: {
		type: String,
		default: ''
	},
	isPauseTtsAudio: {
		type: Boolean,
		default: false
	},
});
const audioIsPlay = ref(true); //音频是否在播放
const audioStart = ref("00:00");
const durationTime = ref("00:00"); //音频的总时长，显示的时间格式
const duration = ref(0); //音频的总时长
// eslint-disable-next-line no-unused-vars
const audioVolume = ref(80); //音量的默认值是0.8
// eslint-disable-next-line no-unused-vars
const audioHuds = ref(false); //是否显示音量slider
const audioRef = ref(null);
const currentProgress = ref(0);


watch(() => props.isPauseTtsAudio, (newVal) => {
	if (newVal) {
		// 如果 isPauseTtsAudio 为 true，试听暂停
		handleCloseMusic();
	}
});
function handleCloseMusic() {
	audioRef.value.pause();
	audioIsPlay.value = true;
}
onMounted(() => {
	calculateDuration();
});
// 获取音频时长
function calculateDuration() {
	var myVid = audioRef.value;
	myVid.loop = false;
	myVid.src = props.audioUrl;
	// 监听音频播放完毕
	myVid.addEventListener(
		"ended",
		function () {
			audioIsPlay.value = true;
			currentProgress.value = 0;
			audioStart.value = "00:00";
		},
		false
	);
	if (myVid != null) {
		myVid.oncanplay = function () {
			duration.value = myVid.duration; // 计算音频时长
			durationTime.value = transTime(myVid.duration); //换算成时间格式
		};
		myVid.volume = 0.8; // 设置默认音量50%
		// 进入页面默认开始播放
		// audioRef.value.play();
		// audioIsPlay.value = false;
	}
}
// 音频播放时间换算
function transTime(duration) {
	const minutes = Math.floor(duration / 60);
	const seconds = Math.floor(duration % 60);
	const formattedMinutes = String(minutes).padStart(2, "0"); //padStart(2,"0") 使用0填充使字符串长度达到2
	const formattedSeconds = String(seconds).padStart(2, "0");
	return `${formattedMinutes}:${formattedSeconds}`;
}
// 播放暂停控制
function playAudio() {
	if (audioRef.value.paused) {
		audioRef.value.play();
		audioIsPlay.value = false;
	} else {
		audioRef.value.pause();
		audioIsPlay.value = true;
	}
}
// 根据当前播放时间，实时更新进度条
function updateProgress(e) {
	var value = e.target.currentTime / e.target.duration;
	if (audioRef.value?.play) {
		currentProgress.value = value * 100;
		audioStart.value = transTime(audioRef.value.currentTime);
	}
}
//调整播放进度
const handleProgressChange = (val) => {
	console.log(val);
	if (!val) {
		return;
	}
	let currentTime = duration.value * (val / 100);
	// 更新音频的当前播放时间
	audioRef.value.currentTime = currentTime;
};
//调整音量
// eslint-disable-next-line no-unused-vars
const handleAudioVolume = (val) => {
	audioRef.value.volume = val / 100;
};
</script>

<style lang="scss" scoped>
.audio_right {
	width: 100%;
	height: 5.9vh;
	display: flex;
	align-items: center;
	background: #fff;
	border-radius: .5vh;
	padding: 0 1.8vh;
	box-sizing: border-box;

	.slider_box_view {
		flex: 1;
		height: 100%;
	}

	.audio_icon {
		width: 3.2vh;
		height: 3.2vh;
		cursor: pointer;
		margin-left: 2vh;
	}

	.audio_time {
		color: #B7BBBE;
		overflow: hidden;
		font-size: 12px;
		display: flex;
		justify-content: space-between;
		margin-top: 1.4vh;

		.audio_time_tip {
			font-size: 1.5vh;
			color: #1F4470;
		}
	}
}

.volume {
	position: relative;

	.volume_progress {
		width: 32px;
		height: 140px;
		position: absolute;
		top: -142px;
		right: -4px;
	}

	.volume_bar {
		background: #fff;
		border-radius: 4px;
	}

	.volume_icon {
		width: 24px;
		height: 24px;
		cursor: pointer;
	}
}
</style>
<style lang="scss">
.el-slider__button-wrapper {
	display: flex;
	justify-content: center;
	align-items: center;
}

.slider_box,
.volume_bar {
	.el-slider__button {
		width: 8px;
		height: 8px;
		border: none;
	}

	.el-slider__bar {
		background: #00db15;
	}
}

.slider_box {
	.el-slider__button-wrapper {
		width: 8px;
	}
}

.volume_bar {
	.el-slider__runway {
		margin: 0 14px !important;
	}
}
</style>