import axios from 'axios'
const BASE_URL = 'http://localhost:8080/api/query/getData'

const getByQueryData = (userQuery) => {
  const data = JSON.stringify(userQuery)

  console.log(data)

  const config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: BASE_URL,
    headers: {
      'Content-Type': 'application/json'
    },
    data: data
  }

  return axios.request(config)
}

export { getByQueryData }
