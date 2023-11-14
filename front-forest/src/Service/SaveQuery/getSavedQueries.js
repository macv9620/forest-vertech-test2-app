import axios from 'axios'
const BASE_URL = 'http://localhost:8080/api/userQuery/getAll'

const getSavedQueries =
 () => {
   const config = {
     method: 'get',
     maxBodyLength: Infinity,
     url: BASE_URL,
     headers: {
       'Content-Type': 'application/json'
     }
   }

   return axios.request(config)
 }

export { getSavedQueries }
