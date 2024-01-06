import React, { useEffect } from 'react';
import styles from "./Wallet.module.scss";
import { useGlobalContext } from '../../context/context';
import { getWallet } from '../../components/api/wallet.api';



const Wallet: React.FC = () => {
    const {username,userId,setBalance,setBitcoin,balance,bitcoin} = useGlobalContext();

    useEffect(() => {
        const Wallet = async () => {
            try {   
                const response = await getWallet(userId);
                if (response) {
                    console.log(response);
                    setBalance(response[0].accountamount);
                    setBitcoin(response[0].btcamount);
                    console.log("request success", response[0].accountamount);
                } else {
                    console.log("Unexpected response", response);
                }
            } catch (error) {
                console.log(error);
            }
        }
        Wallet();
    }, [userId]);
    return (
        <div className={styles.wallet}>
            <div className={styles.wallet__title}>{username} Wallet</div>
            <div className={styles.wallet__balance}>
                <div className={styles.wallet__balance_item}>
                    <div className={styles.wallet__balance_item_currency}>USD:</div>
                    <div className={styles.wallet__balance_item_amount}>{balance}</div>
                </div>
                <div className={styles.wallet__balance_item}>
                    <div className={styles.wallet__balance_item_currency}>BTC:</div>
                    <div className={styles.wallet__balance_item_amount}>{bitcoin}</div>
                </div>
            </div>
        </div>
    );
};

export default Wallet;
