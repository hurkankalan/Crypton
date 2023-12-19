import axios from "axios";
import { Crypto } from "../types/crypto";
import cryptoModels from "../models/cryptos.model";
import cron from "node-cron";

const getCryptoData = async (): Promise<Crypto[]> => {
    try {
        const cryptosList = await cryptoModels.getAll();
        const cryptosIds = cryptosList.map((crypto: Crypto) => crypto.id).join(",");

        // 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&ids=bitcoin,ethereum,litecoin,ripple,bitcoin-cash,chainlink,binancecoin,polkadot,cardano,bitcoin-sv,stellar,usd-coin,monero,wrapped-bitcoin,tron,tezos,neo,cosmos,vechain,ethereum-classic,yearn-finance,huobi-token,leo-token,okb,cdai,compound-ether,compound-usd-coin,compound-governance-token,compound-basic-attention-token,compound-dai,compound-uniswap,compound-wrapped-btc,compound-usdt,compound-0x,compound-augur,compound-chainlink,compound-bat,compound-zrx,compound-tether,compound-maker,compound-paxos-standard,compound-yfi,compound-sai,compound-dai-old,compound-true-usd,compound-kyber-network,compound-lend,compound-omg-network,compound-etherscan-io,compound-aave,compound-uma,compound-sushi,compound-celo,compound-curve-dao-token,compound-binance-usd,compound-hedera-hashgraph,compound-ampleforth,compound-republic-protocol,compound-celo-euro,compound-celo-dollar,compound-ankr,compound-1inch,compound-eth-2-0-staking,compound-curve-fi-ydai-yusdc-yusdt-ytusd,compound-uma,'
        const apiUrl = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&ids=${cryptosIds}`;
        const response = await axios.get(apiUrl);
        const cryptos = response.data;

        const cryptoData: Crypto[] = cryptos.map((crypto: any) => ({
            id: crypto.id,
            name: crypto.name,
            currentPrice: crypto.current_price,
            openingPrice: crypto.current_price - crypto.price_change_24h,
            lowestPrice: crypto.low_24h,
            highestPrice: crypto.high_24h,
            imageUrl: crypto.image
        }));

        return cryptoData;
    } catch (error) {
        console.error("Error fetching crypto data:", error);
        return [];
    }
};

const updateCrypto = async () => {
    try {
        const cryptoData = await getCryptoData();
        cryptoData.forEach(async (crypto: Crypto) => {
            await cryptoModels.create(crypto);

            const timestamp = new Date();
            await cryptoModels.saveHistory(crypto.id, 'minute', crypto.openingPrice, crypto.highestPrice, crypto.lowestPrice, crypto.currentPrice, timestamp);
        });
        console.log("Crypto data updated");
    } catch (error) {
        console.error("Error updating crypto data:", error);
    }
}

cron.schedule("*/1 * * * *", updateCrypto);

export const getCrypto = (): Crypto[] => [];