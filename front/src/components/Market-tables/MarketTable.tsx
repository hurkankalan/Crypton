import {MarketTableData} from "./MarketTableSingle.js";
import MarketTableSingle from "./MarketTableSingle.js";
import "./MarketTable.Module.scss"
import {GetCryptosUser, GetFavoriteCryptosUser} from "../api/crypto.api.tsx";
import {useEffect, useState} from "react";
import {useGlobalContext} from "../../context/context.ts";

export default function MarketTable() {
    const [CryptosUser, setCryptosUser] = useState([{
        name:''
}]);

    const {role} = useGlobalContext();
    const [searchQuery, setSearchQuery] = useState("");
    const [favoriteCryptos, setFavoriteCryptos]= useState([{
        name:''
    }]);
    type ArrayOfObjects = {
        id: number; // Adjust the type of 'id' accordingly
        name: string; // Adjust the type of 'name' accordingly
        // Add other properties as needed
    };
    const excludeObjectsWithSameId = (
        array1: ArrayOfObjects[],
        array2: ArrayOfObjects[]
    ): ArrayOfObjects[] => {
        const idsToRemove = new Set(array1.map(obj => obj.id));
        return array2.filter(obj => !idsToRemove.has(obj.id));
    };
    useEffect(() => {
        fetchCryptoData()

    }, []);
    const fetchCryptoData = async () => {
        try {
            let value = await GetCryptosUser();
            const cryptosFromStorage = JSON.parse(localStorage.getItem("favoriteCrypto") || "[]");
            // const cryptosFromStorage = "bitcoin,ethereum,dogecoin";

            const result = await GetFavoriteCryptosUser(cryptosFromStorage);
            if(!result){
                setCryptosUser(value);
                return;
            }
            value=excludeObjectsWithSameId(result,value)
            setCryptosUser(value);
            setFavoriteCryptos(result);
            return;
        } catch (error) {
            console.error('Error:', error);
        }
    };
    const filteredFavoriteCryptos = favoriteCryptos.filter((crypto) =>
        crypto.name?.toLowerCase().includes(searchQuery.toLowerCase())
    );
    const filteredCryptos = CryptosUser.filter((crypto) =>
        crypto.name?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="market__table bg--white pt--140 pb--120">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12 table-responsive">
                        <div className="search-bar">
                            <label htmlFor="search">Search: </label>
                            <input
                                type="text"
                                id="search"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        <table className="market_table">
                            <thead>
                            <tr>
                                <th className="market-symbol">
                                </th>
                                <th className="market-name">Name &amp; Symbole</th>
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
                            {filteredFavoriteCryptos &&
                                filteredFavoriteCryptos.map((single, key) => {
                                    return <MarketTableSingle data={single as MarketTableData} key={key} role={"admin"} />;
                                })}
                            {filteredCryptos &&
                                filteredCryptos.map((single, key) => {
                                    return <MarketTableSingle data={single as MarketTableData} key={key} role={role} />;
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}


