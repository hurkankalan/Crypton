import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import "./Currency.module.scss"
import styles from "./Currency.module.scss"
import {SyntheticEvent} from 'react';

import {ChangeEvent, useState, useEffect, useContext} from 'react';
import {GetCryptoValue, SellBitcoins, UpdateWallet, UpdateWalletMoney} from "../api/crypto.api.tsx";
import {MyGlobalContext} from "../../context/context.ts";
import ShortPopup from './ShortPopUp.tsx';


const CurrencyBuy = () => {

    //GLOBAL
    const [activeTab, setActiveTab] = useState('BuyCrypto');
    const [isPopupOpen, setPopupOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const exchangeRateToEuro = 0.90;
    const exchangeRateToDollar = 1.10;
    const openPopup = () => setPopupOpen(true);
    const closePopup = () => setPopupOpen(false);
    const {userId} = useContext(MyGlobalContext);
    function isFloat(value:string) {
        return !Number.isInteger(parseInt(value));
    }
    useEffect(() => {
        fetchCryptoPrice()
    }, []);
    const handleTabSelect = (key: string | null, e: SyntheticEvent<unknown>) => {
        // Reset the error message when switching tabs
        setErrorMessage('');
        console.log(e);
        // Update the active tab
        setActiveTab(key || '');
    };
    const fetchCryptoPrice = async (obj?: string) => {
        try {
            if (!obj) {
                obj = selectedValue;
            }
            const bitcoinValue = await GetCryptoValue('bitcoin');
            switch (obj) {
                case 'Dollar':
                    setCryptoValue(bitcoinValue.currentprice);
                    break;
                case 'Euro':
                    setCryptoValue((bitcoinValue.currentprice * exchangeRateToEuro).toString());
                    break;
            }
            return;
        } catch (error) {
            setErrorMessage('Error occurred while fetching data.');
            return;
        }
    };
    //WALLET FILL
    const [fillAmount, setFillAmount] = useState('0');
    const handleFillAmount = (event: ChangeEvent<HTMLInputElement>) => {
        setFillAmount(event.target.value);
    };
    const handleFillWallet = async () => {
        try {
            if (!fillAmount) {
                return;
            }
            await UpdateWallet(userId, fillAmount)
            openPopup()
        } catch (error) {
            console.error('Error:', error);
        }
    }
    //CRYPTO BUY
    const [selectedValue, setSelectedValue] = useState('Dollar');
    const [CryptoValue, setCryptoValue] = useState('');
    const [amountOfMoney, setAmmountOfMoulla] = useState('0');
    const [amountOfBitcoins, setAmountOfBitcoins] = useState('0');
    const [blockFirstInput, setBlockFirstInput] = useState(false);
    const [blockSecondInput, setBlockSecondInput] = useState(false);
    const [blockClick, setBlockClick] = useState(true);
    const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setErrorMessage('');
        setSelectedValue(event.target.value);
        const amount = parseInt(amountOfMoney)
        fetchCryptoPrice(event.target.value);
        if (event.target.value == "Dollar") {
            setAmmountOfMoulla((amount * exchangeRateToDollar).toString());
        } else {
            setAmmountOfMoulla((amount * exchangeRateToEuro).toString());
        }
    };
    const handleMoneyValue = (event: ChangeEvent<HTMLInputElement>) => {
        setErrorMessage('');
        setBlockSecondInput(true);
        const inputValue = event.target.value;
        const newValue = parseInt(inputValue) < 0 ? "0" : inputValue;
        setAmmountOfMoulla(newValue);
        setAmountOfBitcoins(`${parseInt(newValue) / parseInt(CryptoValue)}`)
        if (!event.target.value) {
            setBlockSecondInput(false);
            setBlockClick(true);
        } else {
            setBlockClick(false);
        }
    };
    const handleCryptoValue = (event: ChangeEvent<HTMLInputElement>) => {
        setErrorMessage('');
        setBlockFirstInput(true);
        setAmountOfBitcoins(event.target.value);
        setAmmountOfMoulla(`${parseInt(event.target.value) * parseInt(CryptoValue)}`)
        if (!event.target.value || event.target.value == "0") {
            setBlockFirstInput(false);
            setBlockClick(true);
        } else {
            setBlockClick(false);
        }
    };

    const handleCryptoBuy = async () => {
        try {
            setErrorMessage('');
            if (!amountOfMoney || parseInt(amountOfMoney) < 1) {
                setAmmountOfMoulla('');
                setAmountOfBitcoins('');
                setErrorMessage('The money field must be valid');
                return;
            }
            if (!amountOfBitcoins || parseInt(amountOfBitcoins) < 1) {
                setErrorMessage('The bitcoin field must be valid');
                return;
            }

            let amountOfDollars;
            if (selectedValue == "Dollar") {
                if(isFloat(amountOfBitcoins)){
                    setAmountOfBitcoins(Math.floor(parseInt(amountOfBitcoins)).toString())
                    setAmmountOfMoulla(`${Math.floor(parseInt(amountOfBitcoins)) * parseInt(CryptoValue)}`);
                }
                amountOfDollars = amountOfMoney;
            } else {
                if(isFloat(amountOfBitcoins)){
                    setAmountOfBitcoins(Math.floor(parseInt(amountOfBitcoins)).toString())
                    setAmmountOfMoulla(`${Math.floor(parseInt(amountOfBitcoins)) * parseInt(CryptoValue)}`);
                }
                amountOfDollars = (parseInt(amountOfMoney) * exchangeRateToDollar).toString();
            }
            const response = await UpdateWalletMoney(userId, amountOfDollars, amountOfBitcoins)
            setBlockClick(true);
            if (response) {
                openPopup()
            } else {
                setErrorMessage('Exchange failed, amount of money is not enough');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }
    //CRYPTO SELL
    const [amountOfBitcoinsToSell, setAmountOfBitcoinsToSell] = useState('0');
    const [amountOfDollarsRecieved, setAmountOfDollarsRecieved] = useState('0');
    const [blockClickSell, setBlockClickSell] = useState(true);
    const handleChangeBitcoinSell = (event: ChangeEvent<HTMLInputElement>) => {
        const inputValue = parseInt(event.target.value, 10);
        // Check if the entered value is greater than or equal to the minimum allowed value
        if (!isNaN(inputValue) && inputValue >= 0) {
            setAmountOfBitcoinsToSell(event.target.value);
            setAmountOfDollarsRecieved(`${parseInt(event.target.value) * parseInt(CryptoValue)}`)
            setBlockClickSell(false);
        } else {
            setAmountOfDollarsRecieved('')
        }
    };
    const handleCryptoSell = async () => {
        try {
            if (!amountOfBitcoinsToSell || parseInt(amountOfBitcoinsToSell) < 1) {
                setErrorMessage('The bitcoin field must be valid');
                return;
            }
            const response = await SellBitcoins(userId, amountOfDollarsRecieved, amountOfBitcoinsToSell)
            setBlockClick(true);
            if (response) {
                openPopup()
            } else {
                setErrorMessage('Exchange failed, amount of Bitcoins is not enough');

            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    return (
        <div className="dg__account section-padding--xl">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <Tab.Container activeKey={activeTab} onSelect={handleTabSelect}>
                            <Nav variant="pills"
                                 className="acount__nav justify-content-center"
                            >
                                <Nav.Item>
                                    <Nav.Link eventKey="BuyCrypto">Buy Crypto</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="SellCrypto">Sell Crypto</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="BuyMoney">Fill you wallet</Nav.Link>
                                </Nav.Item>
                            </Nav>
                            <Tab.Content>
                                <Tab.Pane eventKey="BuyMoney">
                                    <div className="main">
                                        <h6>Get some digital cash</h6>
                                        <div className="form-field">
                                            <label>How much do you want?</label>
                                            <input type="number" className="dollar" onChange={handleFillAmount}/></div>
                                        <button onClick={handleFillWallet} className={styles['btn-crypto-buy']}>
                                            free money
                                        </button>
                                        {isPopupOpen && <ShortPopup onClose={closePopup}/>}

                                    </div>
                                </Tab.Pane>
                                <Tab.Pane eventKey="BuyCrypto">
                                    <div className="main">
                                        <div className="form-field">
                                            <h6>Buy currency</h6>
                                            <label htmlFor="dropdown">Select currency:</label>
                                            <select id="dropdown" value={selectedValue}
                                                    onChange={handleSelectChange}>
                                                <option value="Dollar">Dollar</option>
                                                <option value="Euro">Euro</option>
                                            </select>
                                            <label>Pay</label>
                                            <p>{`Current value of the bitcoin is: 1 bitcoin for ${CryptoValue} ${selectedValue}`}
                                            </p>
                                            <input type="number" className="dollar" onChange={handleMoneyValue}
                                                   disabled={blockFirstInput}
                                                   placeholder={amountOfMoney + " " + selectedValue}/>
                                        </div>
                                        <div className="form-field">
                                            <label>Number of bitcoins</label>
                                            <input type="number" className="bitcoin" onChange={handleCryptoValue}
                                                   disabled={blockSecondInput}
                                                   placeholder={amountOfBitcoins}/>
                                        </div>
                                        <button onClick={handleCryptoBuy}
                                                disabled={blockClick}
                                                className={styles['btn-crypto-buy']}>
                                            Buy crypto
                                        </button>
                                        {isPopupOpen && <ShortPopup onClose={closePopup}/>}
                                        {errorMessage && (
                                            <div style={{color: 'red', marginTop: '10px'}}>{errorMessage}</div>
                                        )}
                                    </div>
                                </Tab.Pane>
                                <Tab.Pane eventKey="SellCrypto">
                                    <div className="main">
                                        <h6>Sell currency</h6>
                                        <div className="form-field">
                                            <label>Amount of bitcoins do sell</label>
                                            <input type="number" className="bitcoin" onChange={handleChangeBitcoinSell}
                                                   placeholder={amountOfBitcoinsToSell + " BTC"}/>
                                        </div>
                                        <div className="form-field">
                                            <label>Receive</label>
                                            <input type="number" className="bitcoin"
                                                   disabled={true}
                                                   placeholder={amountOfDollarsRecieved + '$'}/>
                                        </div>
                                        <button onClick={handleCryptoSell}
                                                disabled={blockClickSell}
                                                className={styles['btn-crypto-buy']}>
                                            Sell Your Bitcoins
                                        </button>
                                        {isPopupOpen && <ShortPopup onClose={closePopup}/>}
                                        {errorMessage && (
                                            <div style={{color: 'red', marginTop: '10px'}}>{errorMessage}</div>
                                        )}
                                    </div>
                                </Tab.Pane>
                            </Tab.Content>
                        </Tab.Container>
                    </div>
                </div>
            </div>
        </div>

    )
}
export default CurrencyBuy;