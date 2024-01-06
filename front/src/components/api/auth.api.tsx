import axios from 'axios';


const API_URL = 'http://localhost:8000/users/';

const Api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': true
    },
    withCredentials: true
});


export const register = async (username: string, email: string, password: string) => {
    try {
        const response = await Api.post('register', {
            username,
            email,
            password,
        });
        console.log(response)
        return response.status;
    } catch (error) {
        console.log(error);
    }
};

export const login = async (email: string, password: string) => {
    try {
        const response = await Api.post('login', {
            email,
            password,
        });
        localStorage.setItem('user', JSON.stringify(response.data));
        return response.status;
    } catch (error) {
        console.log(error);
    }
}
export const loginDiscord = async (username: string, email: string) => {
    try {
        const response = await Api.post('login/discord', {
            email,
            username

        })
        localStorage.setItem('user', JSON.stringify(response.data));
        return response.status;
    } catch (error) {
        console.log(error);
    }
}

export const updateUser = async (id: string, username: string, email: string, password: string, currency: string) => {
    console.log(currency)
    try {
        const response = await Api.put(`${id}`, {
            username,
            email,
            password,
            currency,
        });
        console.log(response.data)
        return response.status;
    } catch (error) {
        console.log(error);
    }
}

export const getUser = async (id: string) => {
    try {
        const response = await Api.get(`${id}`);
        return response.data[0];
    } catch (error) {
        console.log(error);
    }
}

export const logout = async () => {
    try {
        await Api.post('logout');
        localStorage.removeItem('user');
    } catch (error) {
        console.log(error);
    }
}
export default Api;

