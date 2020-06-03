<template>
    <div class="about-page">
        <main class="about-page__about">
            <PageTitle :title="about.title[$i18n.locale]"/>
            <p class="about-page__text">
                {{about.text[$i18n.locale]}}
            </p>
            <div class="about-page__pics container content">
                <img v-for="(item,i) in JSON.parse(about.images)" :key="i"
                     :class="[{'left': i === 0, 'right-top': i === 1,'right-bottom': i ===2}]"
                     :src="`https://mobitek.az${item.url}`"
                     :alt="item.url">
            </div>
            <div class="about-page__bottom-text">
                <p> {{about.quote[$i18n.locale]}}</p>
            </div>
            <img class="about-page__bg" src="/pics/svg/about/bg.svg">
        </main>
        <div class="about-page__certificates">
            <PageTitle :title="$t('about.certificates')"/>
            <div class="about-page__certificates__inner">
                <div class="about-page__certificates__item" @click="showCertificate(1)">
                    <img src="/pics/img/about/c1.png" alt="Devia Accessories Authorization Certificate">
                    <img class="onhover" src="/pics/img/about/c1h.png">
                    <button class="about-page__certificates__show"><span>Show</span></button>
                </div>
                <div class="about-page__certificates__item" @click="showCertificate(2)">
                    <img src="/pics/img/about/c2.png" alt="Joyroom Authorization Certificate">
                    <img class="onhover" src="/pics/img/about/c2h.png">
                    <button class="about-page__certificates__show"><span>Show</span></button>
                </div>
                <div class="about-page__certificates__item" @click="showCertificate(3)">
                    <img src="/pics/img/about/c3.png" alt="Rock Accessories Authorization Certificate">
                    <img class="onhover" src="/pics/img/about/c3h.png">
                    <button class="about-page__certificates__show"><span>Show</span></button>
                </div>
            </div>
        </div>
        {{ certificates }}
        <div
                class="about-page__certificates__modal"
                v-show="certificateShown > 0"
                @click="showCertificate(-1)">
            <img src="/pics/img/about/c1.jpg" alt="faafafaf"
                 v-show="certificateShown == 1">
            <img src="/pics/img/about/c2.jpg" alt="Joyroom Authorization Certificate" v-show="certificateShown == 2">
            <img src="/pics/img/about/c3.jpg" alt="Rock Accessories Authorization Certificate"
                 v-show="certificateShown == 3">
        </div>
    </div>
</template>

<script>
    import PageTitle from '~/components/global/PageTitle';
    import {mapState} from 'vuex'

    export default {
        async fetch({store}) {
            await store.dispatch('getAbout');
            await store.dispatch('getCertificates');
        },

        components: {
            PageTitle
        },

        data() {
            return {
                certificateShown: -1
            }
        },
        computed: {
            ...mapState(['about', 'certificates']),
        },
        methods: {
            showCertificate(i) {
                this.certificateShown = i;
            }
        }
    }
</script>
