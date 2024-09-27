<template>
	<div class="normal-swiper-com ">
		<div class="swiper-wrapper">
			<div class="swiper-slide" v-for="(item, index) in data" :key="index">
				<el-image class="swiper-slide-image" :src="item" fit="cover" />
			</div>
		</div>
	</div>
</template>
<script setup>
import Swiper from "swiper";
import "swiper/css";
import {
	onMounted,
	defineProps,
	defineExpose,
	onBeforeUnmount,
	ref,
	defineEmits,
} from "vue";
//props接受数据
defineProps({
	data: {
		type: Array,
		default: () => {
			return [];
		}, //默认值
	},
});
var swiper = null;
var swiperIndex = ref(0);
const emits = defineEmits(["slideChange"]);
onMounted(() => {
	if (swiper == null) {
		swiper = new Swiper(".normal-swiper-com", {
			slidesPerView: 1, //窗口内显示的个数
			spaceBetween: 0, //间距
			enabled: true,
			centeredSlides: true,
			// autoPlay:true,
			loop: true,
			on: {
				slideChange: function () {
					swiperIndex.value = this.realIndex;
					emits("slideChange", this.realIndex);
				},
			},
		});
	}
});
onBeforeUnmount(() => {
	swiper?.disable();
});

// eslint-disable-next-line no-unused-vars
function changeSlidesPerView(newSlidesPerView) {
	if (!swiper) return;
	swiper.params.slidesPerView = newSlidesPerView;
	swiper.update(); // 更新 swiper 实例
}

defineExpose({
	changeSlidesPerView,
});
</script>
<style lang="scss" scoped>
.normal-swiper-com {
	width: 100%;
	height: 21.3vh;
	overflow: hidden;

	.swiper-slide {
		width: 100%;
		height: 100%;
		background: #fefefe;

		.swiper-slide-images {
			width: 100%;
			height: 100%;
		}
	}
}
</style>
