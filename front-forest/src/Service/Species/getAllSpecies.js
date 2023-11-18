import axios from 'axios'
const BASE_URL = import.meta.env.VITE_BASE_URL_FOREST_SERVICE
const ENDPOINT = '/species/getAll'

const getAllSpecies =
 () => {
   const config = {
     method: 'get',
     maxBodyLength: Infinity,
     url: BASE_URL + ENDPOINT,
     headers: {
       'Content-Type': 'application/json'
     }
   }

   return axios.request(config)
 }

export { getAllSpecies }
