import { moviesAPI } from '../../api'
import { showError } from '@/util/showNotification'

const state = {
  list: [],
  total_pages: 0,
  baseImageUrl: localStorage.getItem('baseImageUrl') || '',
  imageSize: 'w342'
}

const mutations = {
  setListMovies: (state, list) => state.list = list,
  setTotalPages: (state, total_pages) => state.total_pages = Math.min(total_pages, 1000), // 1000 pages - restriction of API
  setBaseImageUrl(state, config) {
    state.baseImageUrl = config.images.base_url
    localStorage.setItem('baseImageUrl', config.images.base_url)
  },
  clearMovie: state => state.list = []
}

const actions = {
  async fetchMovies({ commit, getters, state }, page){

    if (state.list.length) return

    try {
      let data = await moviesAPI.getMovies(page);
      // Transform image url
      data.results.forEach(el => {
        let poster_path = el.poster_path;
        if (poster_path) {
          el.poster_path = `${getters.getBaseImageUrl}${poster_path}`
        }
      })

      commit('setListMovies', data.results)
      commit('setTotalPages', data.total_pages)

    } catch (e) {
      showError(e)
    }
  },

  async fetchDetailMovie(_, id) {
    try {
      return await moviesAPI.getDetailMovie(id);
    } catch (e) {
      showError(e)
      return {}
    }
  },

  async fetchSimilarMovies(_, id) {
    try {
      return await moviesAPI.getSimilarMovies(id);
    } catch (e) {
      showError(e)
      return {}
    }
  },

  async searchMovie(_, query) {
    if (!query) return {}

    try {
      return await moviesAPI.search(query);
    } catch (e) {
      return {}
    }
  },

  async fetchConfig({ commit }){
    try {
      let data = await moviesAPI.getConfig();
      commit('setBaseImageUrl', data)
    } catch (e) {
      showError(e)
    }
  }
}

const getters = {
  getList: state => state.list,
  getTotalPages: state => state.total_pages,
  getBaseImageUrl: state => `${state.baseImageUrl}/${state.imageSize}`,
}


export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
