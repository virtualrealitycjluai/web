<!--
 * @Author: zhangzhe 437050740@qq.com
 * @Date: 2024-09-22 16:58:07
 * @LastEditors: zhangzhe 437050740@qq.com
 * @LastEditTime: 2024-09-24 18:44:50
 * @FilePath: \marketf:\web\liangda-navigator\src\components\common\SwiperCom\SwiperCom.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
	<div class="swiper-com">
		<img class="operate-btn" style="left: 0; transform: translate(-150%, -50%)" src="./images/left-icon.png" @click="swiper?.slidePrev()" alt="" />
		<img class="operate-btn" style="right: 0; transform: translate(150%, -50%)" src="./images/right-icon.png" @click="swiper?.slideNext()" alt="" />
		<div class="swiper-com-tip">
            <img src="./images/tip-icon.png" alt="" />
            触屏左右滑动切换
        </div>
		<div class="mySwiper">
			<div class="swiper-wrapper">
				<div class="swiper-slide" v-for="(item, index) in data" :key="index" @click="swiperSlideClick(item)">
					<div :class="[
                        'my-swiper-content',
                        { 'my-swiper-content-sel': index == swiperIndex },
                    ]">
						<GlobalSmallTitle style="margin-top: 2vh;" :title="index + 1 < 10 ? `0${index + 1}` : `${index + 1}`" />
						<el-image class="swiper-content-image" :src="item.cover_url" fit="cover" />
						<div class="swiper-content-text">【{{ item.title }}】</div>
					</div>

				</div>
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
	const emits = defineEmits(["slideChange","swiperSlideClick"]);
	onMounted(() => {
		if (swiper == null) {
			swiper = new Swiper(".mySwiper", {
				slidesPerView: 3, //窗口内显示的个数
				spaceBetween: 70, //间距
				enabled: true,
				centeredSlides: true,
				// autoPlay:true,
				loop: true,
				on: {
					slideChange: function() {
						swiperIndex.value = this.realIndex;
						emits("slideChange", this.realIndex);
					},
				},
			});
		}
	});
	onBeforeUnmount(() => {
		swiper ?.disable();
	});

	// eslint-disable-next-line no-unused-vars
	function changeSlidesPerView(newSlidesPerView) {
		if (!swiper) return;
		swiper.params.slidesPerView = newSlidesPerView;
		swiper.update(); // 更新 swiper 实例
	}

	function swiperSlideClick(itemData){
		emits("swiperSlideClick", itemData);
	}

	defineExpose({
		changeSlidesPerView,
	});
</script>
<style lang="scss" scoped>
	.swiper-com {
		width: 74%;
		height: 33.3vh;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);

		.operate-btn {
			position: absolute;
			top: 50%;
			cursor: pointer;
		}

		.mySwiper {
			width: 100%;
			height: 100%;
			overflow: hidden;

			.swiper-slide {
				position: relative;
				cursor: pointer;
			}

			.my-swiper-content {
				width: 100%;
				height: 85%;
				background: greenyellow;
				position: absolute;
				top: 50%;
				left: 50%;
				transform: translate(-50%, -50%);
				transition: all 0.5s;
				background: url("./images/slider-bg.png");
				background-size: 100% 100%;
				display: flex;
				flex-direction: column;
				align-items: center;

				.swiper-content-image {
					width: 16.7vh;
					height: 16.7vh;
					border-radius: 0.5vh;
					margin-top: 2vh;
				}

				.swiper-content-text {
					font-weight: bold;
					font-size: 1.3vh;
					color: #1f4470;
					margin-top: 2vh;
				}
			}

			.my-swiper-content-sel {
				transform: translate(-50%, -50%) scale(1.17);
			}
		}

		.swiper-com-tip {
			font-size: 1.9vh;
			color: #3f648a;
			text-align: center;
			position: absolute;
			bottom: -5vh;
            left: 50%;
            transform: translate(-50%,100%);
            display: flex;
            align-items: center;
            justify-content: center;

			img {
				width: 1.6vh;
				height: 2.1vh;
                margin-right: 1vh;
                transform: translateY(-20%);
			}
		}
	}
</style>
