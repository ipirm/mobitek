<template>
    <div class="product-page">
        {{ product1.cat_id }}
        <ProductShowcase class="catalog-page__product-showcase"/>
        <div class="product-page__content container">
            <div class="product-page__content__row">
                <div class="product-page__sliders">
                    <div class="product-page__sliders__left">
                        <div v-swiper:leftSwiper="leftSwiperOption">
                            <div class="swiper-wrapper">
                                <div class="swiper-slide"
                                     v-for="(item, i) in JSON.parse(product1.images)"
                                     :key="i"
                                     @click="rightSwiper.slideTo(i)">
                                    <img :src="`https://mobitek.az/${item.url}`">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="product-page__sliders__right">
                        <div v-swiper:rightSwiper="rightSwiperOption">
                            <div class="swiper-wrapper">
                                <div
                                        class="swiper-slide"
                                        v-for="(item, i) in JSON.parse(product1.images)"
                                        :key="i"
                                >
                                    <img :src="`https://mobitek.az/${item.url}`">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <main class="product-page__product-info">
                    <h1>{{ product1.title[$i18n.locale]}}</h1>
                    <h2>{{product1.description[$i18n.locale]}}</h2>
                    <div class="product-page__product-info__reviews-price">
                        <div class="product-page__product-info__rating">
                            <div class="stars">
                                <img class="star" v-for="i in 5" :key="i" v-if="i <= product.stars"
                                     :src="i <= product.stars ? '/pics/svg/star.svg': ''" alt="star(s)">
                            </div>
                            <span>({{ product.reviews }} {{ getReviewsText(product.reviews) }})</span>
                        </div>
                        <div class="product-page__product-info__price">
                            <span>{{ product1.price }} azn</span>
                        </div>
                    </div>
                    <ul v-html="product1.text[$i18n.locale]">
                    </ul>
                </main>
            </div>
            <div class="product-page__content__row">
                <div class="product-page__props">
                    <h2>{{ $t('product.properties') }}</h2>
                    <div class="product-page__props__content">
                        <div class="product-page__props__col">
                            <span class="prop" v-for="(prop,i) in JSON.parse(product1.property[$i18n.locale])" :key="i">{{ prop.key }}:</span>
                        </div>
                        <div class="product-page__props__col">
                            <span class="value" v-for="(prop,i) in JSON.parse(product1.property[$i18n.locale])" :key="i">{{ prop.value }}</span>
                        </div>
                    </div>
                </div>
                <div class="product-page__input-area desktop-450">
                    <div class="product-page__input-area__top">
                        <div class="product-page__input-area__col">
                            <h2 class="product-page__input-area__title">{{ $t('product.fast-order') }}</h2>
                            <input type="text" name="name" maxlength="100" :placeholder="$t('product.enter-name')"
                                   v-model="name">
                            <input type="text" name="phone" maxlength="100" :placeholder="$t('product.enter-phone')"
                                   v-model="phone">
                        </div>
                        <div class="product-page__input-area__col">
                            <div class="product-page__input-area__colors">
                                <ColorChooser v-model="colors"/>
                            </div>
                            <input type="text" name="surname" maxlength="100" :placeholder="$t('product.enter-surname')"
                                   v-model="surname">
                            <input type="email" name="email" maxlength="320" :placeholder="$t('product.enter-email')"
                                   v-model="email">
                        </div>
                    </div>
                    <textarea :placeholder="$t('product.enter-address')" maxlength="500" v-model="address"></textarea>
                    <div class="product-page__input-area__bottom">
                        <button class="add">{{ $t('product.add-to-cart') }}</button>
                        <button class="buy">{{ $t('product.buy-now') }}</button>
                    </div>
                </div>
                <div class="product-page__input-area mobile">
                    <div class="product-page__input-area__top">
                        <h2 class="product-page__input-area__title">{{ $t('product.fast-order') }}</h2>
                        <div class="product-page__input-area__colors">
                            <ColorChooser v-model="colors"/>
                        </div>
                        <input type="text" name="name" maxlength="100" :placeholder="$t('product.enter-name')"
                               v-model="name">
                        <input type="text" name="surname" maxlength="100" :placeholder="$t('product.enter-surname')"
                               v-model="surname">
                        <input type="text" name="phone" maxlength="100" :placeholder="$t('product.enter-phone')"
                               v-model="phone">
                        <input type="email" name="email" maxlength="320" :placeholder="$t('product.enter-email')"
                               v-model="email">
                    </div>
                    <textarea :placeholder="$t('product.enter-address')" maxlength="500" v-model="address"></textarea>
                    <div class="product-page__input-area__bottom">
                        <button class="add">{{ $t('product.add-to-cart') }}</button>
                        <button class="buy">{{ $t('product.buy-now') }}</button>
                    </div>
                </div>
            </div>
        </div>
        <ProductSlider :data="catsProducts"/>
    </div>
</template>

<script>
    import ProductShowcase from '~/components/pages/index/ProductShowcase';
    import ProductSlider from '~/components/pages/product/ProductSlider';
    import ColorChooser from '~/components/global/ColorChooser';
    import {mapState} from 'vuex'

    export default {
        components: {
            ProductShowcase,
            ProductSlider,
            ColorChooser
        },
        async fetch({store,route}) {
            await store.dispatch('getProduct',route.params.id).then( async ()=>{
                await store.dispatch('getCatsProducts', store.state.product1.cat_id)
            })
        },
        mounted() {
            this.rightSwiper.on('slideChange', () => {
                this.leftSwiper.slideTo(this.rightSwiper.activeIndex);
            });

            this.leftSwiper.init(this.leftSwiperOption);
            this.rightSwiper.init(this.rightSwiperOption);

            for (let i = 0; i < this.product.colors.length; i++) {
                this.colors.push({
                    color: this.product.colors[i],
                    chosen: false
                });
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
        },
        computed: {
            ...mapState(['product1','catsProducts'])
        },
        data() {
            return {
                name: '',
                surname: '',
                phone: '',
                email: '',
                address: '',
                colors: [],

                activeSlide: 0,

                leftSwiperOption: {
                    slidesPerView: 4,
                    spaceBetween: 10,
                    freeMode: true,
                    direction: 'horizontal',
                    init: false,
                    observer: true,
                    observeParents: true,

                    breakpoints: {
                        1201: {
                            direction: 'vertical',
                            slidesPerView: 'auto',
                            spaceBetween: 15
                        },

                        1001: {
                            slidesPerView: 4,
                            spaceBetween: 15
                        },

                        901: {
                            slidesPerView: 3,
                            spaceBetween: 10
                        },

                        701: {
                            slidesPerView: 6,
                            spaceBetween: 15
                        },

                        571: {
                            slidesPerView: 5,
                            spaceBetween: 10
                        }
                    }
                },

                rightSwiperOption: {
                    spaceBetween: 10,
                    init: false,
                    observer: true,
                    observeParents: true,
                },

                product: {
                    pics: [
                        '/pics/img/product.png',
                        '/pics/img/product.png',
                        '/pics/img/product.png',
                        '/pics/img/product.png',
                        '/pics/img/product.png',
                        '/pics/img/product.png',
                        '/pics/img/product.png',
                        '/pics/img/product.png'
                    ],
                    price: 45,
                    stars: 5,
                    reviews: 79,
                    title: 'Anker PowerWave Pad & Stand 7.5W',
                    subtitle: 'Qi-Certified 7.5W for iPhone Xs Max XR XS X 8/8 Plus, 10W Fast Charging Samsung Galaxy S10 S9 S8, Note 10 Note 9 (No AC Adapter)',
                    bullets: [
                        'Charging for home and office: place and charge with the pad at home, or get more options at your work desk with horizontal and vertical charging MODES.',
                        'Wide Compatibility: Support for all Qi-enabled devices including iPhone X, XS, XR, XS Max, 8, 8 Plus as well as Samsung Galaxy S10, S9, S8, Note 10, Note 9, Note 8.',
                        'The Need for Speed: A high-efficiency chipset provides 10W high-speed charging for Samsung Galaxy, while iPhones get a boosted 7. 5W charge. For best results, use a quick charge 2. 0 or 3. 0 adapter (9V/2a) for Samsung Galaxy and iPhone charging.'
                    ],
                    props: [
                        {
                            title: 'Model Number',
                            value: 'A2503 & A2524'
                        },
                        {
                            title: 'Input',
                            value: '5V-2A / 9V-2A'
                        },
                        {
                            title: 'Output',
                            value: '5W / 7.5W / 10W'
                        },
                        {
                            title: 'Compatibility',
                            value: 'All Qi-enabled phones and devices'
                        },
                        {
                            title: 'Charging cable',
                            value: 'Micro'
                        }
                    ],
                    colors: ['red', 'yellow', 'purple', 'black', 'gray']
                },

                otherProducts: [
                    {
                        reviews: 79,
                        title: 'PD Pioneer 20000mAh Portable Charger',
                        description: 'Substantial 60W PD output means it can charge your MacBook Pro perfectly, just as good as the original charger',
                        rating: 5,
                        pic: '/pics/img/product.png',
                        link: '/product/xz',
                        price: 45
                    },
                    {
                        reviews: 79,
                        title: 'Anker PowerWave Pad & Stand 7.5W',
                        description: 'Qi-Certified 7.5W for iPhone Xs Max XR XS X 8/8 Plus, 10W Fast Charging Samsungs',
                        rating: 5,
                        pic: '/pics/img/product.png',
                        link: '/product/xz',
                        price: 45
                    },
                    {
                        reviews: 79,
                        title: 'Anker PowerPort Speed PD 5',
                        description: 'Premium 60W 5-Port Desktop Charger with One 30W Power Delivery',
                        rating: 5,
                        pic: '/pics/img/product.png',
                        link: '/product/xz',
                        editorsChoice: true,
                        price: 45
                    },
                    {
                        reviews: 79,
                        title: 'Baseus Encok True Wireless Earphones W07',
                        description: 'Automatic Switching of Primary and Secondary Earphone;Dual Mic noise reduction design',
                        rating: 5,
                        pic: '/pics/img/product.png',
                        link: '/product/xz',
                        price: 45
                    }
                ]
            }
        }
    }
</script>
