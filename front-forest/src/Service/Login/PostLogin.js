import axios from 'axios'
const BASE_URL = 'http://localhost:8080/api/users/login/'

const postLogin = (userName) => {
  const config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: BASE_URL + userName,
    headers: {
      'Content-Type': 'application/json'
    }
  }

  return axios.request(config)
}

export { postLogin }
