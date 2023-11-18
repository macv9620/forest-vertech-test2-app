import axios from 'axios'

const BASE_URL = import.meta.env.VITE_BASE_URL_FOREST_SERVICE
const ENDPOINT = '/users/login/'

const postLogin = (userName) => {
  const config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: BASE_URL + ENDPOINT + userName,
    headers: {
      'Content-Type': 'application/json'
    }
  }

  return axios.request(config)
}

export { postLogin }
