import axios from "axios"

const API_KEY ='c2246253d70ad82ac6c5a658c456b41f';

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/',
    headers:{
        'Content-Type': 'application/json;charset=utf-8'
    },
    params: {
        'api_key': API_KEY,
        'language': navigator.language || "es-ES"
    },
});

export { api } 