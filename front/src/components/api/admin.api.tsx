import axios from 'axios';

const API_URL = 'http://localhost:8000/';

const Api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': true
    },
    withCredentials: true
});

const getRssLinks = async () => {
    try {
        const response = await Api.get('rss');
        return response.data;
    } catch (error) {
        console.log(error);
    }
  };
  
const createRssLink = async (url: string) => {
    try {
        const link = { url };
        await Api.post('rss', link); // send the entire link object
        return link;
    } catch (error) {
        console.error(error);
    }
};

const deleteRssLink = async (id: string) => {
    try {
        await Api.delete(`rss/${id}`);
    } catch (error) {
        console.error(error);
    }
};

const getVisibleArticles = async () => {
    try {
        const response = await Api.get('articles/visibileArticles');
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

const setVisibility = async (id: string, isVisibleToGuests: boolean) => {
    try {
        await Api.put(`articles/visibility/`, { id, isVisibleToGuests });
    } catch (error) {
        console.error(error);
    }
}

const getVisibleCryptos = async () => {
    try {
        const response = await Api.get('cryptos');
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

const setCryptoVisibility = async (id: string, isVisibleToGuests: boolean) => {
    try {
        await Api.put(`cryptos/visibility/`, { id, isVisibleToGuests });
    } catch (error) {
        console.error(error);
    }
}

export default { getRssLinks, createRssLink, deleteRssLink, getVisibleArticles, setVisibility, getVisibleCryptos, setCryptoVisibility};