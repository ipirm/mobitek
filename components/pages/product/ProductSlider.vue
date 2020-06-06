<template>
	<div class="product-page__product-slider">
		<div class="product-page__product-slider__content container">
			<h3 class="product-page__product-slider__title">{{ $t('product.also-buy') }}</h3>
		</div>
		<div class="product-page__product-slider__content container">
			<div v-swiper:mySwiper="mySwiperOptions">
	      <div class="swiper-wrapper">
	        <div class="swiper-slide" v-for="(product, i) in data" :key="i">
						<div class="index-page__product-slider__card">
							<nuxt-link :to="product.link" class="index-page__product-slider__card__inner">
								<div class="editors-choice" v-show="product.editorsChoice">
									<img src="/pics/img/editors-choice.png" alt="Editor's choice">
								</div>
								<div class="pic">
									<img :src="product.pic" :alt="product.title">
								</div>
								<div class="info">
									<div class="top">
										<div class="stars">
											<img src="~/static/pics/svg/star.svg" alt="Star" v-for="rating in 5" :key="rating" :class="{ active: rating < product.rating }">
										</div>
										<span>({{ product.reviews }} {{ getReviewsText(product.reviews) }})</span>
									</div>
									<div class="title">{{ product.title }}</div>
									<div class="description">{{ product.description }}</div>
								</div>
								<div class="price">{{ product.price }} azn</div>
							</nuxt-link>
						</div>
		      </div>
		    </div>
	    </div>
	    <button class="index-page__product-slider__arrow-left" @click="mySwiper.slidePrev()">
	      <img class="half" src="~/static/pics/svg/index/slider-arrow-right.svg" alt="Go left">
	      <img class="full" src="~/static/pics/svg/slider-round-arrow-right.svg" alt="Go left">
	    </button>
	    <button class="index-page__product-slider__arrow-right" @click="mySwiper.slideNext()">
	      <img class="half" src="~/static/pics/svg/index/slider-arrow-right.svg" alt="Go right">
	      <img class="full" src="~/static/pics/svg/slider-round-arrow-right.svg" alt="Go right">
	    </button>
	  </div>
	</div>
</template>

<script>
export default {
	props: ['data'],

	data() {
    return {
      mySwiperOptions: {
		slidesPerView: 'auto',
		spaceBetween: 15,
		loop: true,
		observer: true,
		observeParents: true,
		centeredSlides: true,

		breakpoints: {
			1151: {
				slidesPerView: 4,
				centeredSlides: false
			},
			901: {
				slidesPerView: 3,
				centeredSlides: false
			},
			651: {
				slidesPerView: 2,
				centeredSlides: false
			},
			451: {
				spaceBetween: 25,
				slidesPerView: 'auto',
				centeredSlides: true
			}
		}
      }
    }
  },

	methods: {
		getReviewsText(reviewCount) {
			if (this.$i18n.locale == 'en') {
				if (reviewCount % 10 == 1)
					return 'review';
				else return 'reviews';
			} else if (this.$i18n.locale == 'ru') {
				return 'ревью';
			} else if (this.$i18n.locale == 'az') {
				return 'revyu';
			}

			return '';
		}
	}
}	
</script>
