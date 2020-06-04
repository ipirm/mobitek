<template>
	<div v-swiper:productSwiper="productSwiperOption" class="index-page__product-slider__inner">
		<div class="swiper-wrapper">
			<div class="swiper-slide" v-for="(product, i) in data.products" :key="i">
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
</template>

<script>
export default {
	props: ['data', 'index'],

	data() {
		return {
			productSwiperOption: {
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

	mounted() {
		this.$bus.$on('product-slide', data => {
			if (data.index == this.index) {
				if (data.left)
					this.productSwiper.slidePrev();
				else this.productSwiper.slideNext();
			}
		});
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
