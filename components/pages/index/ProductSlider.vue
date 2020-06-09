<template>
    <div class="index-page__product-slider">
        <div class="index-page__product-slider__top container container--page">
            <div class="index-page__product-slider__top__item" v-for="(item, i) in types" :key="i"
                 @click="showSection(i,item)"
                 :class="{ active: currentSlider == i, center: i == Math.floor(data.length / 2) }">
                <span>{{ item.name }}</span>
            </div>
        </div>
        <div class="index-page__product-slider__middle container container--page">
            <div v-swiper:sectionSwiper="sectionSwiperOption">
                <div class="swiper-wrapper">
                    <div class="swiper-slide" v-for="(section, i) in productSlides" :key="i" style="width: 100% !important;">
                        <ProductInnerSlider :data="section" :index="i"/>
                    </div>
                </div>
            </div>
            <button class="index-page__product-slider__arrow-left" @click="slidePrevProduct()">
                <img class="half" src="~/static/pics/svg/index/slider-arrow-right.svg" alt="Go left">
                <img class="full" src="~/static/pics/svg/slider-round-arrow-right.svg" alt="Go left">
            </button>
            <button class="index-page__product-slider__arrow-right" @click="slideNextProduct()">
                <img class="half" src="~/static/pics/svg/index/slider-arrow-right.svg" alt="Go right">
                <img class="full" src="~/static/pics/svg/slider-round-arrow-right.svg" alt="Go right">
            </button>
        </div>
        <div class="index-page__product-slider__bottom container container--page">
            <nuxt-link to="/catalog">
                <span>{{ $t('index.product-slider.see-more') }}</span>
            </nuxt-link>
        </div>
    </div>
</template>

<script>
    import ProductInnerSlider from '~/components/pages/index/ProductInnerSlider';
    import {mapState} from 'vuex'

    export default {
        props: ['data'],

        components: {
            ProductInnerSlider
        },
        async created() {
            let body = {
                lang: this.$i18n.locale,
                item: this.types[1]
            }
            await this.$store.dispatch('getProductsSlides', body);
        },
        data() {
            return {
                sectionSwiperOption: {
                    spaceBetween: 10,
                    allowTouchMove: false,
                    observer: true,
                    observeParents: true
                },

                currentSlider: 1,
                types: [
                    {type: 'top_rated', name: 'Top rated products'},
                    {type: 'editor_choice', name: 'Editor’s Choices'},
                    {type: 'best_sellers', name: 'Best Sellers'},
                ]
            }
        },
        mounted() {
            this.showSection(this.currentSlider);
        },
        // 'top_rated' => 'Top rated products',
        //       'editor_choice' => 'Editor’s Choices',
        //       'best_sellers' => 'Best Sellers',
        methods: {
            showSection(i, item) {
                this.currentSlider = i;
                let body = {
                    lang: this.$i18n.locale,
                    item: item
                }
                this.$store.dispatch('getProductsSlides', body);
                this.sectionSwiper.slideTo(this.currentSlider);
            },

            slideNextProduct() {
                this.$bus.$emit('product-slide', {
                    index: this.currentSlider,
                    left: false
                });
            },

            slidePrevProduct() {
                this.$bus.$emit('product-slide', {
                    index: this.currentSlider,
                    left: true
                });
            }
        },
        computed: {
            ...mapState(['productSlides']),
        },
    }
</script>
