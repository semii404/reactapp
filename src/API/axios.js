import axios from 'axios';

export const api1 =axios.create({
    baseURL: 'http://localhost:3002',
});