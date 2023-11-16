import axios from 'axios'
const BASE_URL = 'http://localhost:8080/api/userQuery/getById/'

const getQueryById =
 (queryId) => {
   const config = {
     method: 'get',
     maxBodyLength: Infinity,
     url: BASE_URL + queryId,
     headers: {
       'Content-Type': 'application/json'
     }
   }

   return axios.request(config)
 }

export { getQueryById }
