<template>
  <div class="index-page">
    <Welcome :data="welcome" />
    <ProductShowcase />
    <ProductSlider :data="productSlides" :types="types" />
    <Banners :data="banners" />
    <VideoSlider :data="videos" />
    <BottomFeatures />
  </div>
</template>

<script>
import Welcome from '~/components/pages/index/Welcome';
import ProductShowcase from '~/components/pages/index/ProductShowcase';
import ProductSlider from '~/components/pages/index/ProductSlider';
import Banners from '~/components/pages/index/Banners';
import VideoSlider from '~/components/pages/index/VideoSlider';
import BottomFeatures from '~/components/pages/index/BottomFeatures';

import {mapState} from 'vuex';

export default {
  components: {
    Welcome,
    ProductShowcase,
    ProductSlider,
    Banners,
    VideoSlider,
    BottomFeatures
  },

  async fetch({store}) {
    await store.dispatch('getSlides');
    await store.dispatch('getBanners');
    await store.dispatch('getVideos');
  },

  async created() {
    await this.$store.dispatch('getProductsSlides', {
      lang: this.$i18n.locale,
      type: this.types[1].type
    });
  },
  
  computed: {
    ...mapState(['welcome','banners','videos','productSlides'])
  },

  data() {
    return {
      types: [
        {type: 'top_rated', name: 'index.product-slider.top-rated'},
        {type: 'best_sellers', name: 'index.product-slider.best-sellers'},
        {type: 'editor_choice', name: 'index.product-slider.editors-choice'}
      ]
    }
  }
}
</script>
