<template>
	<header class="header" :class="{ 'header--floating': isExactPage('/'), 'header--transparent': isExactPage('/') && transparent }">
		<div class="header__content__wrapper">
			<div class="header__content container container--header">
				<div class="header__left desktop-1000">
					<nuxt-link to="/" class="header__logo">
						<img src="~/static/pics/svg/header/logo.svg">
					</nuxt-link>
				</div>
				<div class="header__mobile__bg" :class="{active: mobileMenuBgActive, visible: mobileMenuBgVisible}" @click="hideMobileMenu()"></div>
				<div class="header__left mobile">
					<button class="header__left__mobile__menu__button" @click="showMobileMenu()">
						<img src="/pics/img/header/mobile-menu-button.png">
					</button>
					<div class="header__mobile__menu" :class="{active: mobileMenuShown}">
						<a href="/" @click.prevent="mobileLink('/')" class="header__mobile__menu__logo" v-body-scroll-lock="mobileMenuShown">
							<img src="/pics/svg/header/logo-raw.svg">
						</a>
						<div class="header__mobile__menu__content">
							<ul>
								<li>
									<a href="/" @click.prevent="mobileLink('/')" :class="{ active: isExactPage('/') }">{{ $t('header.home') }}</a>
								</li>
								<li>
									<a href="/catalog" @click.prevent="mobileLink('/catalog')" :class="{ active: isExactPage('/catalog') }">{{ $t('header.catalog') }}</a>
								</li>
								<li>
									<a href="/about" @click.prevent="mobileLink('/about')" :class="{ active: isExactPage('/about') }">{{ $t('header.about') }}</a>
								</li>
								<li>
									<a href="/contacts" @click.prevent="mobileLink('/contacts')" :class="{ active: isExactPage('/contacts') }">{{ $t('header.contacts') }}</a>
								</li>
							</ul>
							<div class="header__mobile__menu__close" @click="hideMobileMenu()">
								<img src="/pics/svg/header/close.svg">
							</div>
						</div>
					</div>
				</div>
				<nav class="header__middle desktop-1000">
					<ul>
						<li>
							<nuxt-link to="/" :class="{ active: isExactPage('/') }">{{ $t('header.home') }}</nuxt-link>
						</li>
						<li>
							<nuxt-link to="/catalog" :class="{ active: isExactPage('/catalog') }">{{ $t('header.catalog') }}</nuxt-link>
						</li>
						<li>
							<nuxt-link to="/about" :class="{ active: isExactPage('/about') }">{{ $t('header.about') }}</nuxt-link>
						</li>
						<li>
							<nuxt-link to="/contacts" :class="{ active: isExactPage('/contacts') }">{{ $t('header.contacts') }}</nuxt-link>
						</li>
					</ul>
				</nav>
				<div class="header__middle mobile">
					<nuxt-link to="/" class="header__logo" :class="{ active: searchBarShown }">
						<img src="~/static/pics/svg/header/logo.svg">
					</nuxt-link>
				</div>
				<div class="header__right">
					<div class="header__search" :class="{aside: langsShown}">
						<button class="header__search__button" @click="searchBarShown = !searchBarShown">
							<img alt="Search" src="/pics/img/header/search.png">
						</button>
						<div class="header__search__outer">
							<div class="header__search__inner" :class="{active: searchBarShown}">
								<div class="header__search__wrapper">
									<input type="text" name="search">
								</div>
							</div>
						</div>
					</div>
					<div class="header__langs desktop-500">
						<button class="header__langs__button" @click="langsShown = !langsShown">
							<img alt="Languages" src="/pics/img/header/langs.png">
						</button>
						<div class="header__langs__outer">
							<div class="header__langs__inner" :class="{active: langsShown}">
								<div class="header__langs__wrapper">
									<button class="header__langs__item" @click="chooseLang('ru')">RU</button>
									<button class="header__langs__item" @click="chooseLang('az')">AZ</button>
									<button class="header__langs__item" @click="chooseLang('en')">EN</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</header>
</template>

<script>
export default {
	data() {
		return {
			searchBarShown: false,
			langsShown: false,
			transparent: false,
			mobileMenuShown: false,
			mobileMenuBgActive: false,
			mobileMenuBgVisible: false
		}
	},

	mounted() {
		window.addEventListener('scroll', this.onScroll, false);
		this.onScroll();
	},

	methods: {
		chooseLang(lang) {
			this.langsShown = false;
			setTimeout(() => {
				this.$router.push(this.switchLocalePath(lang));
			}, 200);
		},

		isExactPage(page) {
			return this.$route.path.toLowerCase() == page || this.$route.path.toLowerCase() == page + this.$i18n.locale;
		},

		showMobileMenu() {
			this.mobileMenuShown = true;
			this.mobileMenuBgActive = true;
			setTimeout(() => {
				this.mobileMenuBgVisible = true;
			}, 1);
		},

		hideMobileMenu() {
			this.mobileMenuBgVisible = false;
			this.mobileMenuShown = false;
			setTimeout(() => {
				if (!this.mobileMenuBgVisible)
					this.mobileMenuBgActive = false;
			}, 250);
		},

		mobileLink(link) {
			this.hideMobileMenu();
			this.$router.push(link);
		},

		onScroll() {
			if (!document.querySelector('.index-page')) {
        return;
      }

      let scrollTop = window.scrollY || document.body.scrollTop || document.documentElement.scrollTop;
      if (scrollTop > window.innerHeight) {
      	this.transparent = false;
      } else {
      	this.transparent = true;
      }
    }
	}
}
</script>
