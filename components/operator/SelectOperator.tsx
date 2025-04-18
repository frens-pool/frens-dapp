import { useState, useEffect, ChangeEvent, useMemo } from "react";
import { useNetwork } from "wagmi";
import { formatEther } from "viem";
import { ssvScanUrl, ssvOperatorListApi } from "#/utils/externalUrls";
import { SsvOperatorType } from "#/types/commonTypes";
import SearchOperator from "./SearchOperator";

export const SelectOperator = ({
  nextStep,
  setOperators,
}: {
  nextStep?: () => void;
  setOperators: any;
}) => {

  const [ssvOperators, setssvOperators] = useState<SsvOperatorType[]>([]);
  const [frenSsvOperatorIDs, setFrenSsvOperatorIDs] = useState([]);
  const [checkedOperators, setCheckedOperators] = useState<any[]>([]);
  const [filteredLength, setFilteredLength] = useState<number>(1);
  const { chain } = useNetwork();
  const [chooseOwnOperators, SetChooseOwnOperators] = useState(false);
  const [fetching, setFetching] = useState<boolean>(false);

  const fetchOperators = async () => {
    try {
      setFetching(true);
      const data = await fetch(ssvOperatorListApi(1, 5000, chain));
      const json = await data.json();
      console.log(`operators`, json);
      let pattern = /AP #/;

      // filter out permissioned Operators
      const filteredOperators =
        json.operators?.reduce(
          (acc: Array<SsvOperatorType>, item: SsvOperatorType) => {
            if (
              // !item.address_whitelist
              // && 
              chooseOwnOperators ||
              [169, 177, 191, 393].includes(item.id)
              // pattern.test(item.name)
              // true
            ) {
              acc.push(item);
            } else {
              console.log("excluding", item.name)
            }
            return acc;
          },
          []
        ) || [];

      // json.operators.reduce((coll,op)=>{ if (!op.address_whitelist) { coll.push(op) ; return coll;} },[]);
      setssvOperators(filteredOperators);
      setFilteredLength(filteredOperators.length);
      setFetching(false);
    } catch (e) {
      setFetching(false);

    }
  };

  useMemo(() => {
    console.log(`choose!`);
    setCheckedOperators([]);
    setssvOperators([]);
    setFilteredLength(0);
    fetchOperators().catch(console.error);
  }, [chooseOwnOperators]);

  const addSSVOperator = (searchOperator: SsvOperatorType) => {
    setssvOperators([...ssvOperators, searchOperator]);
    setCheckedOperators([...checkedOperators, searchOperator]);
  };

  const handleCheck = (
    e: { target: { checked: any } },
    item: SsvOperatorType
  ) => {
    setCheckedOperators(
      e.target.checked
        ? [...checkedOperators, item]
        : checkedOperators.filter((operator) => operator.id !== item.id)
    );
  };

  const handleOptionChange = (e: { target: { id: string } }) => {
    if (e.target.id === "choose") {
      SetChooseOwnOperators(true);
    } else {
      SetChooseOwnOperators(false);
    }
    console.log("chooseOwnOperators", chooseOwnOperators);
  };

  let operatorListRows = ssvOperators?.map((operator, index) => {
    return (
      <tr key={index}>
        <th>
          <label>
            {index < filteredLength ? (
              <input
                type="checkbox"
                className="checkbox"
                onChange={(e) => {
                  handleCheck(e, operator);
                }}
              />
            ) : (
              <input
                type="checkbox"
                className="checkbox"
                defaultChecked
                onChange={(e) => {
                  handleCheck(e, operator);
                }}
              />
            )}
          </label>
        </th>
        <td>
          <div className="flex items-center space-x-3">
            <div>
              <div className="font-bold">{operator.name}</div>
            </div>
          </div>
        </td>
        <td>
          <div className="flex items-center space-x-3">
            <div>
              <div className="font-bold">{operator.id}</div>
            </div>
          </div>
        </td>
        <td>
          {parseFloat(operator.performance["24h"]).toFixed(2)}%
          <br />
        </td>
        <td>{(operator.fee / 382640000000).toFixed(2)}</td>
        <td>{operator.validators_count}</td>
        {/* <td>{operator.address_whitelist ? "yes" : "no"}</td> */}
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
    <div className="w-full">
      <div className="flex items-center mb-2">
        <input
          id="default"
          type="radio"
          checked={!chooseOwnOperators}
          name="default-radio"
          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          onChange={handleOptionChange}
        />
        <label className="ms-2">Use default FRENS operators</label>
      </div>
      <div className="flex items-center mb-2">
        <input
          id="choose"
          type="radio"
          checked={chooseOwnOperators}
          name="default-radio"
          onChange={handleOptionChange}
          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
        />
        <label className="ms-2">Choose your own operators</label>
      </div>
      {fetching && (
        <div>
          <span className="loading loading-spinner loading-lg text-frens-main"></span>
        </div>
      )}
      {ssvOperators.length > 0 && (
        <>
          <SearchOperator chain={chain} addSSVOperator={addSSVOperator} />
          <div className="overflow-x-auto w-full">
            <table className="table w-full">
              <thead>
                <tr>
                  <th>
                    <label>
                      <input type="checkbox" className="checkbox" disabled />
                    </label>
                  </th>
                  <th>Name</th>
                  <th>ID</th>
                  <th>
                    <div>Performance</div>
                    <span className="badge badge-ghost badge-sm">last 24h</span>
                  </th>
                  <th>SSV Fee</th>
                  <th>
                    <div>Validator</div>
                    Count
                  </th>
                  {/* <th>Permissioned</th> */}
                  <th>ssvScan</th>
                </tr>
              </thead>
              <tbody>{operatorListRows}</tbody>
            </table>
          </div>
        </>
      )}
      <div className="flex flex-row items-end justify-end">
        <button
          className={`btn-medium blue-to-purple text-white ${checkedOperators.length !== 4 ? 'opacity-50' : ''}`}
          onClick={() => {
            setOperators(checkedOperators);
            nextStep && nextStep();
          }}
          disabled={checkedOperators.length !== 4}
        >
          confirm operators
        </button>
      </div>
    </div>
  );
};
