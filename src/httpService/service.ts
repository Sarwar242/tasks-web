import axios from 'axios';
import { reactLocalStorage } from 'reactjs-localstorage';
import { baseUrl } from '../config/config'
import store from '../store';

export const HTTP = axios.create({ baseURL: baseUrl });
HTTP.interceptors.request.use(
    async config => {
        let token = reactLocalStorage.get('Token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        config.headers.post= {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Origin, Content-Type, X-XSRF-TOKEN',
        };
        return config;
    },
    error => {
        Promise.reject(error);
    }
);


HTTP.interceptors.response.use(undefined, function (error) {
    
    if (error) {
        console.log(error);
        const originalRequest = error.config;
        if ((error.response.status === 401 || error.response.status === 403) && !originalRequest._retry) {
            originalRequest._retry = true;
            store.dispatch({ type: "OPEN-SIGN-IN" });
        }
       
    }
    return Promise.reject(error);
});


export function GET(url: string, queryPayload = {}) {
    return HTTP.get(`${baseUrl}${url}`, queryPayload);
}

export function POST(url: string, body: any) {
    return HTTP.post(`${baseUrl}${url}`, body);
}

export function PUT(url: string, body: any) {
    return HTTP.put(`${baseUrl}${url}`, body);
}

export function DELETE(url: string, queryPayload = {}) {
    return HTTP.delete(`${baseUrl}${url}`, queryPayload);
}
