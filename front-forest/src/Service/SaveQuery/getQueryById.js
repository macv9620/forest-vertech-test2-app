import axios from 'axios'

const BASE_URL = import.meta.env.VITE_BASE_URL_FOREST_SERVICE
const ENDPOINT = '/userQuery/getById/'

const getQueryById =
 (queryId) => {
   const config = {
     method: 'get',
     maxBodyLength: Infinity,
     url: BASE_URL + ENDPOINT + queryId,
     headers: {
       'Content-Type': 'application/json'
     }
   }

   return axios.request(config)
 }

export { getQueryById }
