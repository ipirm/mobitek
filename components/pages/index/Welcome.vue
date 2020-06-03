<template>
	<div class="index-page__welcome">
		<div v-swiper:mySwiper="swiperOption" class="index-page__welcome__bg">
			<div class="swiper-wrapper">
				<div class="swiper-slide" v-for="(item, i) in data" :key="i">
  					<img :src="`${$imagesUrl}/${item.image}`" :alt="item.title[$i18n.locale]">
				</div>
			</div>
		</div>
  		<div class="index-page__welcome__bottom">
  			<div class="index-page__welcome__bottom__item" v-for="(item, i) in data" :key="i" :class="{ active: activeIndex == i }" @click="mySwiper.slideTo(i)">
  				<span>{{ item.title[$i18n.locale] }}</span>
  			</div>
  		</div>
  	</div>
</template>

<script>
export default {
	props: ['data'],

	data() {
		return {
			swiperOption: {
				allowTouchMove: false,
				autoplay: true,
				init: false
			},
			activeIndex: 0
		}
	},

	mounted() {
		this.mySwiper.on('slideChange', () => {
            this.activeIndex = this.mySwiper.activeIndex;
        });

		this.mySwiper.init();
	}
}
</script>
