import axios from 'axios';



const API_URL = 'http://localhost:8000/wallet/';

const Api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': true
    },
    withCredentials: true
});


export const getWallet = async (userId: number) => {
    try {
        const response = await Api.get(`${userId}`);
        console.log("request success");
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export default Api;

