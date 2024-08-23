// src/axios.js
import axios from 'axios';
import router from './router';



// Create an Axios instance
const instance = axios.create({
    baseURL: 'http://localhost:3000', // Setting the base URL
    timeout: 10000, // Set request timeout
});

// Configuring request interceptors
instance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        console.log(token)
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

instance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response && (error.response.status === 401 || error.response.status === 403)) {
            // clean invalid token
            localStorage.removeItem('token');

            router.push('/login');
        }
        return Promise.reject(error);
    }
);

export default instance;
