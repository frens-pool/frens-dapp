import { SsvOperatorType } from "#/types/commonTypes";
import { ssvOperatorApi, ssvScanUrl } from "#/utils/externalUrls";
import React, { useState, useEffect } from "react";

interface SearchOperatorProps {
  chain: any;
  addSSVOperator: (newOperator: SsvOperatorType) => void;
}

const SearchOperator = ({ chain, addSSVOperator }: SearchOperatorProps) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SsvOperatorType[]>([]);

  const fetchData = async () => {
    try {
      const response = await fetch(ssvOperatorApi(1, 8, query, chain));
      const data = await response.json();
      setResults(data.operators);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSearchClick = () => {
    fetchData();
  };

  let operatorListRows = results?.map((operator, index) => {
    return (
      <tr key={index}>
        <th>
          <label>
            <input
              type="checkbox"
              className="checkbox"
              onChange={(e) => {
                addSSVOperator(operator);
                setResults([]);
                setQuery("");
              }}
            />
          </label>
        </th>
        <td>
          <div className="flex items-center space-x-3">
            <div>
              <div className="font-bold">{operator.name}</div>
            </div>
          </div>
        </td>
        <td>id: {operator.id}</td>

        <td>
          <a
            href={ssvScanUrl(operator.id, chain)}
            className="btn btn-ghost btn-xs"
            target="_blank"
          >
            details
          </a>
        </td>
      </tr>
    );
  });

  return (
    <div>
      <input
        type="text"
        placeholder="filter by operator name"
        className="input input-bordered w-full max-w-xs"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <button className="ml-2 btn" onClick={handleSearchClick}>
        Search
      </button>

      {results && (
        <div className="flex justify-center content-center">
          <div className="overflow-x-auto w-full">
            <table className="table w-full">
              <tbody>{operatorListRows}</tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchOperator;
