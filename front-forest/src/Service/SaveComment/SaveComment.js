import axios from 'axios'
const BASE_URL = 'http://localhost:8080/api/userComment/save'

const postComment = (commentInfo) => {
  const data = JSON.stringify(commentInfo)

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

export { postComment }
