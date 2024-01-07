import React from "react";
export interface MarketTableData {
    imageurl: string;
    name:string;
    currentprice: number;
    highestprice: number;
    lowestprice: number;
    isvisibletoguests:boolean;
}

const MarketTableSingle: React.FC<{ data: MarketTableData; role: string  }> = ({ data,role }) => {
    if ((role === "guest"||role ==="user") && !data.isvisibletoguests) {
        return null; // Return nothing for non-visible data to guests
    }
    return (
        <tr>
            <th className="market-symbol">
                <img src={data.imageurl} width="50px" alt="Icon" />
            </th>
            <th className="market-name">{data.name}</th>
            <th className="market-current-price">${data.currentprice}
            </th>
            <th className="market-highest-price">
                ${data.highestprice}
            </th>
            <th className="market-lowest-price">
                ${data.lowestprice}
            </th>
        </tr>
    );
};

export default MarketTableSingle;
