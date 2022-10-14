import axios from 'axios'

const myAxios = axios.create({
  baseURL: 'http://localhost:3000'
})
axios.defaults.withCredentials=true
export default myAxios
