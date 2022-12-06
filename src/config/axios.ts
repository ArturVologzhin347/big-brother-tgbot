import axios from 'axios';

const SERVER_URL = process.env['SERVER_URL'];

const instance = axios.create({
    baseURL: SERVER_URL,
});

export default instance;
