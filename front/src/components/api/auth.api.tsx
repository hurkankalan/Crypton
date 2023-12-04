import axios from 'axios';



const API_URL = 'http://localhost:5000/users/';

const Api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    });


export const register = async (username: string, email: string, password: string) => {
    try {
        const response = await Api.post('register', {
            username,
            email,
            password,
        });
        console.log(response.data);

    } catch (error) {
        console.log(error);
    }
};

export const login = async (username: string, password: string) => {
    try {
        const response = await Api.post('login', {
            username,
            password,
        });
        if (response.data.accessToken) {
            localStorage.setItem('user', JSON.stringify(response.data));
        }
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export const logout = async () => {
    try {
        await Api.post('logout');
    } catch (error) {
        console.log(error);
    }
}
export default Api;

