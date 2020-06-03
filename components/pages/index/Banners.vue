<template>
    <div class="index-page__banners">
        <div class="content container">
            <div :class="[{'how': i === 0, 'apple': i === 1,'smart': i ===2},'flip-card']" v-for="(item, i) in data"
                 :key="item.id">
                <div class="flip-card__inner">
                    <div class="flip-card__front">
                        <img src="~/static/pics/img/index/banner-how.png" :alt="$t('index.banners.how.alt')">
                    </div>
                    <div class="flip-card__back f-white b-dark">
                        <h2>{{ item.title[$i18n.locale] }}</h2>
                        <p>{{ item.text[$i18n.locale] }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        props: ['data'],
        computed: {}
    }
</script>
