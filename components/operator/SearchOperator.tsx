import { SsvOperatorType } from "#/types/commonTypes";
import { ssvOperatorApi } from "#/utils/externalUrls";
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

  return (
    <div>
      <input
        type="text"
        placeholder="operator name"
        className="input input-bordered w-full max-w-xs"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <button className="btn" onClick={handleSearchClick}>
        Search
      </button>

      {results && (
        <ul>
          {results.map((operator) => (
            <li key={operator.id}>
              <div>{operator.name}</div>
              <input
                type="checkbox"
                className="checkbox"
                onChange={(e) => {
                  console.log(operator);
                  addSSVOperator(operator);
                }}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchOperator;
