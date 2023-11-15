import axios from 'axios'
const BASE_URL = 'http://localhost:8080/api/userQuery/save'

const postQuery = (queryInfo) => {
  const data = JSON.stringify(queryInfo)

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

export { postQuery }
