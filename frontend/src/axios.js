import axios from 'axios'

// Configuration pour axios
axios.defaults.baseURL = 'http://localhost:3000/api/'
//axios.defaults.headers.common [ "Authorization"] = 'Bearer' + localStorage.getItem('token')