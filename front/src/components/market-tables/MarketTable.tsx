import marketTableData from "./market-table-one.json";
import MarketTableSingle from "./MarketTableSingle.js";
import"./MarketTable.Module.scss"
export default function MarketTable (){
    return (
        <div className="market__table bg--white pt--140 pb--120">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12 table-responsive">
                        <table className="market_table">
                            <thead>
                            <tr>
                                <th className="market-no">
                                    <span className="nobr">#No</span>
                                </th>
                                <th className="market-symbol">Name &amp; SYmble</th>
                                <th className="market-prize">
                                    <span className="nobr">Price</span>
                                </th>
                                <th className="market-volume">
                                    <span className="nobr">Volume</span>
                                </th>
                                <th className="market-dat">
                                    <span className="nobr">%7day</span>
                                </th>
                            </tr>
                            </thead>
                            <tbody>
                            {marketTableData &&
                                marketTableData.map((single, key) => {
                                    return <MarketTableSingle data={single} key={key} />;
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

