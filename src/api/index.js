import http from '@/util/http-common.js'
import URLS from './config.js'

const moviesAPI = {}

moviesAPI.getMovies = async (page = 1) => {
  let response =  await http.get(URLS['DISCOVER_MOVIES'], {
    params: {
      page
    }
  })
  return response.data
}

moviesAPI.getConfig = async () => {
  let response =  await http.get(URLS['CONFIGURATION'])
  return response.data
}

moviesAPI.getDetailMovie = async (id) => {
  let response =  await http.get(`${URLS['MOVIE']}/${id}`)
  return response.data
}

moviesAPI.getSimilarMovies = async (id) => {
  let response =  await http.get(`${URLS['MOVIE']}/${id}/similar`)
  return response.data
}

moviesAPI.search = async (query) => {
  let response =  await http.get(`${URLS['SEARCH_MOVIE']}`, {
    params: { query }
  })

  return response.data
}

export {
  moviesAPI
};
