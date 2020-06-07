<template>
	<div class="catalog-page">
		<ProductShowcase class="catalog-page__product-showcase" />
		<div class="catalog-page__inner container">
			<h1 class="catalog-page__title">{{ $t('catalog.search-for-products') }}</h1>
			<CatalogSearch @search="search" v-model="searchInput" />
			<div class="catalog-page__double">
				<aside class="catalog-page__filter">
					<button class="catalog-page__filter__mobile-toggler" @click="toggleMobileFilters()">
						<span>{{ $t('catalog.filters') }}</span>
					</button>
					<div class="catalog-page__filter__inner">
						<div class="catalog-page__filter__content">
							<h2 class="catalog-page__filter__section-title">{{ $t('catalog.color') }}</h2>
							<ColorChooser v-model="colors" />
							<h2 class="catalog-page__filter__section-title">{{ $t('catalog.brand') }}</h2>
							<div class="catalog-page__filter__brands">
								<div class="catalog-page__filter__choosable catalog-page__filter__brands__item" v-for="(brand,i) in brands" :key="i" @click="brand.chosen = !brand.chosen" :class="{ active: brand.chosen }">{{ brand.title }}</div>
							</div>
							<h2 class="catalog-page__filter__section-title">{{ $t('catalog.connector') }}</h2>
							<div class="catalog-page__filter__connectors">
								<div class="catalog-page__filter__choosable catalog-page__filter__connectors__item" v-for="(connector,i) in connectors" @click="connector.chosen = !connector.chosen" :class="{ active: connector.chosen }">{{ connector.title }}</div>
							</div>
							<PriceRangeSlider @setMin="setMinimumPrice($event)" @setMax="setMaximumPrice($event)" :prices="prices" />
						</div>
					</div>
				</aside>
				<main class="catalog-page__content">
					<div class="catalog-page__top-filters">
						<DropdownFilter v-model="filterByPrice" :options="filtersByPrice" class="filter-left" />
						<DropdownFilter v-model="filterByProductNewness" :options="filtersByProductNewness" class="filter-right" />
					</div>
					<div class="catalog-page__products">
						<div class="index-page__product-slider__card" v-for="(product,i) in products.slice((page-1)*perPage, Math.min(page*perPage, products.length))" :key="i">
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
					<Pagination v-model="page" :perPage="perPage" :totalElems="4" :emptyText="$t('catalog.empty')" />
				</main>
			</div>
		</div>
	</div>
</template>

<script>
import ProductShowcase from '~/components/pages/index/ProductShowcase';
import CatalogSearch from '~/components/pages/catalog/CatalogSearch';
import PriceRangeSlider from '~/components/pages/catalog/PriceRangeSlider';
import DropdownFilter from '~/components/global/DropdownFilter';
import Pagination from '~/components/global/Pagination';
import ColorChooser from '~/components/global/ColorChooser';

export default {
	components: {
		ProductShowcase,
		CatalogSearch,
		DropdownFilter,
		Pagination,
		ColorChooser,
		PriceRangeSlider
	},

	data() {
		return {
			searchInput: '',

			mobileFiltersShown: false,
			
			minPrice: 0,
			maxPrice: 500,

			filterByPrice: 'ascending',
			filterByProductNewness: 'new',

			page: 1,
			perPage: 3,

			filtersByPrice: [
				'ascending',
				'descending'
			],

			filtersByProductNewness: [
				'new',
				'old'
			],

			colors: [
				{
					color: 'red',
					chosen: false	
				},
				{
					color: 'yellow',
					chosen: false
				},
				{
					color: 'purple',
					chosen: false
				},
				{
					color: 'black',
					chosen: false
				},
				{
					color: 'gray',
					chosen: false
				}
			],

			brands: [
				{
					title: 'Baseus',
					chosen: false
				},
				{
					title: 'Samsung',
					chosen: false
				},
				{
					title: 'RAVpower',
					chosen: false
				},
				{
					title: 'Apple',
					chosen: false
				},
				{
					title: 'Joyroom',
					chosen: false
				},
				{
					title: 'Anker',
					chosen: false
				},
				{
					title: 'Milli',
					chosen: false
				},
				{
					title: 'Remax',
					chosen: false
				},
			],

			connectors: [
				{
					title: 'Lightning',
					chosen: false
				},
				{
					title: 'Micro',
					chosen: false
				},
				{
					title: 'Type-C',
					chosen: false
				},
				{
					title: 'Power Delivery (PD)',
					chosen: false
				}
			],

			products: [
        {
          reviews: 79,
          title: 'PD Pioneer 20000mAh Portable Charger',
          description: 'Substantial 60W PD output means it can charge your MacBook Pro perfectly, just as good as the original charger',
          rating: 5,
          pic: 'pics/img/product.png',
          link: '/product/xz',
          price: 45
        },
        {
          reviews: 79,
          title: 'Anker PowerWave Pad & Stand 7.5W',
          description: 'Qi-Certified 7.5W for iPhone Xs Max XR XS X 8/8 Plus, 10W Fast Charging Samsungs',
          rating: 5,
          pic: 'pics/img/product.png',
          link: '/product/xz',
          price: 45
        },
        {
          reviews: 79,
          title: 'Anker PowerPort Speed PD 5',
          description: 'Premium 60W 5-Port Desktop Charger with One 30W Power Delivery',
          rating: 5,
          pic: 'pics/img/product.png',
          link: '/product/xz',
          editorsChoice: true,
          price: 45
        },
        {
          reviews: 79,
          title: 'Baseus Encok True Wireless Earphones W07',
          description: 'Automatic Switching of Primary and Secondary Earphone;Dual Mic noise reduction design',
          rating: 5,
          pic: 'pics/img/product.png',
          link: '/product/xz',
          price: 45
        }
			],

			prices: [0,25,50,100,500],

			category: null,
			type: null,
			title: null
		}
	},

	watch: {
		minPrice(n,o) {
			this.updateQuery();
		},

		maxPrice(n,o) {
			this.updateQuery();
		},

		filterByPrice(n,o) {
			this.updateQuery();
		},

		filterByProductNewness(n,o) {
			this.updateQuery();
		},

		colors(n,o) {
			this.updateQuery();
		},

		brands(n,o) {
			this.updateQuery();
		},

		connectors(n,o) {
			this.updateQuery();
		},

		page(n,o) {
			this.updateQuery(true);
		}
	},

	watchQuery(n, o) {
    this.search();
  },

  created() {
  	this.readURLQuery();
  	this.search();
  },

  mounted() {
  	window.addEventListener('resize', this.onResize, false);
  	this.onResize();
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
		},

		setMinimumPrice(price) {
			this.minPrice = price;
		},

		setMaximumPrice(price) {
			this.maxPrice = price;
		},

		search() {
			// this.VUEX_FUNCTION_TO_SEARCH(this.getSearchQuery());
		},

		readURLQuery() {
			let cur;

			if (this.$route.query.brand) {
				this.$route.query.brand.forEach(brand => {
					cur = this.brands.find(b => b.title == brand);
					if (cur)
						cur.chosen = true;
				});
			}

			if (this.$route.query.color) {
				this.$route.query.color.forEach(color => {
					cur = this.colors.find(c => c.title == color);
					if (cur)
						cur.chosen = true;
				});
			}

			if (this.$route.query.connector) {
				this.$route.query.connector.forEach(connector => {
					cur = this.connectors.find(c => c.title == connector);
					if (cur)
						cur.chosen = true;
				});
			}

			if (this.$route.query.title)
				this.title = this.$route.query.title;

			if (this.$route.query.type)
				this.type = this.$route.query.type;

			if (this.$route.query.cat)
				this.category = this.$route.query.cat;

			if (this.$route.query.min_price)
				this.minPrice = this.$route.query.min_price;

			if (this.$route.query.max_price)
				this.maxPrice = this.$route.query.max_price;

			if (this.$route.query.order == 'asc')
				this.filterByPrice = 'ascending';
			else if (this.$route.query.order == 'desc')
				this.filterByPrice = 'descending';
		},

		updateQuery(savePage) {
			if (!savePage)
          this.curPage = 1;
      this.$router.push({ query: this.getURLQuery() });
		},

		getURLQuery() {
			// brand=Anker&color=%23A1A1A1&title=PowerDrive&type=editor_choice&cat=19&lang=en&min_price=10&max_price=60&order=asc&connector=lightning
			
			let query = {};

			this.colors.forEach(item => {
				if (item.chosen) {
					if (!query.color)
						query.color = [];
					query.color.push(item.color);			
				}
			});

			this.brands.forEach(item => {
				if (item.chosen) {
					if (!query.brand)
						query.brand = [];
					query.brand.push(item.title);
				}
			});

			this.connectors.forEach(item => {
				if (item.chosen) {
					if (!query.connector)
						query.connector = [];
					query.connector.push(item.title);
				}
			});

			if (this.filterByPrice == 'ascending')
				query.order = 'asc';
			else if (this.filterByPrice == 'descending')
				query.ord = 'desc';

			if (this.category)
				query.cat = this.category;

			if (this.type)
				query.type = this.type;

			if (this.title)
				query.title = this.title;

			query.min_price = this.minPrice;
			query.max_price = this.maxPrice;

			query.page = this.page;

			return query;
		},

	    getSearchQuery() {
	      let query = this.getURLQuery();

	      if (this.$i18n)
	        query.lang = this.$i18n.locale;
	      query.per_page = this.perPage;

	      return query;
	    },

	    toggleMobileFilters() {
	    	this.mobileFiltersShown = !this.mobileFiltersShown;

	    	let filters = this.$el.querySelector('.catalog-page__filter__inner');
			
			if (this.mobileFiltersShown)
				filters.style.height = filters.scrollHeight + 'px';
			else
				filters.style.height = 0;
	    },

	    onResize() {
	    	if (!document.querySelector('.catalog-page')) {
	    		window.removeEventListener('resize', this.onResize, false);
	    		return;
	    	}

	    	if (window.innerWidth > 650) {
	    		if (!this.mobileFiltersShown)
	    			this.mobileFiltersShown = true;
	    		this.$el.querySelector('.catalog-page__filter__inner').style.height = '';    		
	    	} else {
	    		if (this.mobileFiltersShown)
	    			this.toggleMobileFilters();
	    	}
	    }
	}
}
</script>
