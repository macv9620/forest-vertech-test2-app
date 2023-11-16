import axios from 'axios'
const BASE_URL = 'http://localhost:8080/api/users/create'

const postUser = (userInfo) => {
  const data = JSON.stringify(userInfo)

  const config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: BASE_URL,
    headers: {
      'Content-Type': 'application/json'
    },
    data
  }

  return axios.request(config)
}

export { postUser }
