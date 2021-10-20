import axios from 'axios'

// Configuration pour axios
axios.defaults.baseURL = 'http://localhost:3000/api/';
let token = JSON.parse(localStorage.getItem('user'))?.token;
axios.defaults.headers.common [ "Authorization"] = 'Bearer ' + token;