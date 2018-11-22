
import Vue from 'vue'
import Vuex from 'vuex'
import Movies from './modules/movies'
Vue.use(Vuex);



const store = new Vuex.Store({
  modules: {
    movies: Movies
  }
})

export default store;
