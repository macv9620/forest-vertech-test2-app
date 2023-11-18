import axios from 'axios'
const BASE_URL = import.meta.env.VITE_BASE_URL_FOREST_SERVICE
const ENDPOINT = '/userComment/save'

const postComment = (commentInfo) => {
  const data = JSON.stringify(commentInfo)

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

export { postComment }
