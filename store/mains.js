import apiRequest from '../utils/apiRequest'

export const state = () => ({
    slides: [],
    banners: [],
    videos: []
})

export const mutations = {
    SET_SLIDES: (state, payload) => state.slides = payload,
    SET_BANNERS: (state, payload) => state.banners = payload,
    SET_VIDEOS: (state, payload) => state.videos = payload,
}

export const actions = {
    async getSlides({commit}) {
        const data = await apiRequest.get(`slides`);
        commit('SET_SLIDES', data.data.products)
    },
    async getBanners({commit}) {
        const data = await apiRequest.get(`banners`)
        commit('SET_BANNERS', data.data.banners)
    },
    async getVideos({commit}) {
        const data = await apiRequest.get(`videos`)
        commit('SET_VIDEOS', data.data.videos)
    }
}
