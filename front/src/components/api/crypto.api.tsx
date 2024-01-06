import axios from 'axios';
import {getWallet} from "./wallet.api.tsx";

const API_URL = 'http://localhost:8000/cryptos/';
const WALLET_URL = 'http://localhost:8000/wallet/';

const Api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': true
    },
    withCredentials: true
});

const ApiWallet = axios.create({
    baseURL: WALLET_URL,
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': true
    },
    withCredentials: true
});
export const GetCryptosUser = async () => {
    try {
        const response = await Api.get('');
        return response.data;
    } catch (error) {
        console.log(error);
    }
};
export const GetCryptosHistory = async (cryptoId:string) => {
    try {
        const response = await Api.get(`${cryptoId}/history/:minute`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
};
export const GetCryptoValue = async (name: string) => {
    try {
        const response = await Api.get(name);
        return response.data;
    } catch (error) {
        console.log(error);
    }
};
export const UpdateWalletMoney = async (userId: number, euroenmoinssurlecompte: string, btcAmount: string) => {
    try {
        const walletAmount = await getWallet(userId)
        if (walletAmount[0].accountamount - parseInt(euroenmoinssurlecompte) < 0) {
            console.log('Amount is not enough')
            return;
        }
        const responseBitcoin = await ApiWallet.put(`deposit/bitcoin/${userId}`, {
            euroenmoinssurlecompte,
            btcAmount
        });
        console.log("request success", responseBitcoin);
        return responseBitcoin.data;
    } catch (error) {
        console.log(error);
    }
}
export const SellBitcoins = async (userId: number, euroenmoinssurlecompte: string, btcAmount: string) => {
    try {
        const walletAmount = await getWallet(userId)
        if (walletAmount[0].btcamount - parseInt(btcAmount) < 0) {
            return;
        }
        euroenmoinssurlecompte = "-" + euroenmoinssurlecompte
        btcAmount = "-" + btcAmount
        const responseBitcoin = await ApiWallet.put(`deposit/bitcoin/${userId}`, {
            euroenmoinssurlecompte,
            btcAmount
        });
        console.log("request success", responseBitcoin);
        return responseBitcoin.data;
    } catch (error) {
        console.log(error);
    }
}

export const UpdateWallet = async (userId: number, amount: string) => {
    try {
        const responseMoney = await ApiWallet.put(`deposit/money/${userId}`, {
            amount
        });
        console.log("request success", responseMoney);
        return responseMoney.data;
    } catch (error) {
        console.log(error);
    }
}
