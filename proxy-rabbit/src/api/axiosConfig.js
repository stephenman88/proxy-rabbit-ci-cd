import axios from 'axios';

const apiUrl = window.__ENV__?.REACT_APP_BASE_URL;

export default axios.create({
    baseURL: apiUrl,
    headers:{'Content-Type':'application/json'},
    withCredentials:true
})