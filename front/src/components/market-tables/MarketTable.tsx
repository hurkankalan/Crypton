import {MarketTableData} from "./MarketTableSingle.js";
import MarketTableSingle from "./MarketTableSingle.js";
import "./MarketTable.Module.scss"
import {GetCryptosUser} from "../api/crypto.api.tsx";
import {useEffect, useState} from "react";
import {useGlobalContext} from "../../context/context.ts";

export default function MarketTable() {
    const [CryptosUser, setCryptosUser] = useState([{}]);
    const {role} = useGlobalContext();
    useEffect(() => {
        fetchCryptoData()
    }, []);
    const fetchCryptoData = async () => {
        try {
            const value = await GetCryptosUser();
            setCryptosUser(value);
            return;
        } catch (error) {
            console.error('Error:', error);
        }
    };
    return (
        <div className="market__table bg--white pt--140 pb--120">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12 table-responsive">
                        <table className="market_table">
                            <thead>
                            <tr>
                                <th className="market-symbol">
                                </th>
                                <th className="market-name">Name &amp; SYmble</th>
                                <th className="market-current-price">
                                    <span className="nobr">Current Price</span>
                                </th>
                                <th className="market-highest-price">
                                    <span className="nobr">Highest Price</span>
                                </th>
                                <th className="market-lowest-price">
                                    <span className="nobr">Lowest Price</span>
                                </th>
                            </tr>
                            </thead>
                            <tbody>
                            {CryptosUser &&
                                CryptosUser.map((single, key) => {
                                    return <MarketTableSingle data={single as MarketTableData} key={key} role={role}/>;
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}


