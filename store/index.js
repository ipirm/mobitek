import apiRequest from '~/utils/apiRequest'

export const state = () => ({
    welcome: [],
    banners: [],
    videos: [],
    about: [],
    certificates: []
})

export const mutations = {
    SET_WELCOME: (state, payload) => state.welcome = payload,
    SET_BANNERS: (state, payload) => state.banners = payload,
    SET_VIDEOS: (state, payload) => state.videos = payload,
    SET_ABOUT: (state, payload) => state.about = payload,
    SET_DOCS: (state, payload) => state.certificates = payload,
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
    }
}
