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
			if (n.path.toLowerCase() == '/about' || n.path.toLowerCase() == `/${this.$i18n.locale}/about`)
				document.body.style.background = 'white';
            if (n.path.toLowerCase() == '/catalog' || n.path.toLowerCase() == `/${this.$i18n.locale}/catalog`)
                document.body.style.overflow = 'visible';
			else {
                document.body.style.overflow = '';
				document.body.style.background = '#EDEDED';
            }
		}
	},

	mounted() {
		if (this.$route.path.toLowerCase() == '/about' || this.$route.path.toLowerCase() == `/${this.$i18n.locale}/about`)
            document.body.style.background = 'white';
        if (this.$route.path.toLowerCase() == '/catalog' || this.$route.path.toLowerCase() == `/${this.$i18n.locale}/catalog`)
            document.body.style.overflow = 'visible';
        (function() {
            var s = document['createElement']('script');
            s.type = 'text/javascript';
            s.async = true;
            s.charset = 'utf-8';
            s.src = '//cleversite.ru/cleversite/widget_new.php?supercode=1&referer_main='+encodeURIComponent(document.referrer)+'&clid=65205ASTQY&siteNew=85200';
            var ss = document['getElementsByTagName']('script')[0];
            if(ss) {
                ss.parentNode.insertBefore(s, ss);
            } else {
                document.documentElement.firstChild.appendChild(s);
            };
        })();
    }
}
</script>
