import axios from 'axios'
const BASE_URL = import.meta.env.VITE_BASE_URL_FOREST_SERVICE
const ENDPOINT = '/query/getData'

const getByQueryData = (userQuery) => {
  const data = JSON.stringify(userQuery)

  const config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: BASE_URL + ENDPOINT,
    headers: {
      'Content-Type': 'application/json'
    },
    data
  }

  return axios.request(config)
}

export { getByQueryData }
