import apiRequest from '~/utils/apiRequest'

export const state = () => ({
    welcome: [],
    banners: [],
    videos: [],
    about: [],
    product1: {},
    certificates: [],
    productSlides: [],
    catsProducts: []
})

export const mutations = {
    SET_WELCOME: (state, payload) => state.welcome = payload,
    SET_BANNERS: (state, payload) => state.banners = payload,
    SET_VIDEOS: (state, payload) => state.videos = payload,
    SET_ABOUT: (state, payload) => state.about = payload,
    SET_DOCS: (state, payload) => state.certificates = payload,
    SET_PRODUCTS_SLIDER: (state, payload) => state.productSlides = payload,
    SET_PRODUCT: (state, payload) => state.product1 = payload,
    SET_CATS_PRODUCT: (state, payload) => state.catsProducts = payload,
}

export const actions = {
    async getSlides({commit}) {
        const data = await apiRequest.get(`slides`);
        commit('SET_WELCOME', data.data.products)
    },
    async getBanners({commit}) {
        const data = await apiRequest.get(`banners`)
        commit('SET_BANNERS', data.data.banners)
    },
    async getVideos({commit}) {
        const data = await apiRequest.get(`videos`)
        commit('SET_VIDEOS', data.data.videos)
    },
    async getAbout({commit}) {
        const data = await apiRequest.get(`about`)
        commit('SET_ABOUT', data.data.data)
    },
    async getCertificates({commit}) {
        const data = await apiRequest.get(`certificates`)
        commit('SET_DOCS', data.data.data)
    },
    async getProductsSlides({commit},body) {
        const data = await apiRequest.get(`products?type=${body.type}&lang=${body.lang}`)
        commit('SET_PRODUCTS_SLIDER', data.data.data)
    },
    async getProduct({commit},link) {
        const data = await apiRequest.get(`product/${link}`)
        commit('SET_PRODUCT', data.data.news)
    },

    async getCatsProducts({commit},id) {
        const data = await apiRequest.get(`products?cat=${id}&lang=en`)
        commit('SET_CATS_PRODUCT', data.data.data)
    },
}
