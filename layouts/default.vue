<template>
  <div>
  	<Preloader />

  	<Header />
    <nuxt />
    <Footer />

    <GoToTop />
  </div>
</template>

<script>
import Header from '~/components/global/Header';
import Footer from '~/components/global/Footer';
import GoToTop from '~/components/global/GoToTop';
import Preloader from '~/components/global/Preloader';

export default {
	components: {
		Header,
		Footer,
		GoToTop,
		Preloader
	},

	watch: {
		$route(n, o) {
			if (n.path.toLowerCase() == '/about')
				document.body.style.background = 'white';
			else
				document.body.style.background = '#EDEDED';
		}
	},

	mounted() {
		if (this.$route.path.toLowerCase() == '/about')
			document.body.style.background = 'white';
	}
}
</script>
