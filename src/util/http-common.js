import axios from 'axios';

let baseURL = 'https://api.themoviedb.org/3/'
const API_KEY = '28ccef7684be721ce1d24401a4e74706'

const http = axios.create({
  baseURL: baseURL,
  timeout: 4000,
  headers: {
    'Content-Type': 'application/json'
  }
});

http.defaults.params = {
  'api_key':  API_KEY
}

export default http;
