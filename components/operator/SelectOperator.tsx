import { useState, useEffect, ChangeEvent } from "react";
import { useNetwork } from "wagmi";
import { formatEther } from "viem";
import { ssvScanUrl, ssvOperatorListApi } from "#/utils/externalUrls";
import { SsvOperatorType } from "#/types/commonTypes";
import SearchOperator from "./SearchOperator";

export const SelectOperator = ({
  nextStep,
  setOperators,
}: {
  nextStep: () => void;
  setOperators: any;
}) => {
  const [ssvOperators, setssvOperators] = useState<SsvOperatorType[]>([]);
  const [frenSsvOperatorIDs, setFrenSsvOperatorIDs] = useState([]);
  const [checkedOperators, setCheckedOperators] = useState<any[]>([]);
  const [filteredLength, setFilteredLength] = useState<number>(1);
  const { chain } = useNetwork();

  useEffect(() => {
    const fetchOperators = async () => {
      const data = await fetch(ssvOperatorListApi(1, 8, chain));
      const json = await data.json();

      // filter out permissioned Operators
      const filteredOperators =
        json.operators?.reduce(
          (acc: Array<SsvOperatorType>, item: SsvOperatorType) => {
            if (!item.address_whitelist) {
              acc.push(item);
            }
            return acc;
          },
          []
        ) || [];

      // json.operators.reduce((coll,op)=>{ if (!op.address_whitelist) { coll.push(op) ; return coll;} },[]);
      setssvOperators(filteredOperators);
      setFilteredLength(filteredOperators.length);
    };

    fetchOperators().catch(console.error);
  }, []);

  const addSSVOperator = (searchOperator: SsvOperatorType) => {
    setssvOperators([...ssvOperators, searchOperator]);
    setCheckedOperators([...checkedOperators, searchOperator]);
  };
  console.log(ssvOperators);
  console.log(checkedOperators);

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
    <div className="w-4/5 mx-auto my-2 p-2">
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
      <button
        className="mt-2 btn bg-gradient-to-r from-frens-blue to-frens-teal text-white"
        onClick={() => {
          setOperators(checkedOperators);
          nextStep();
        }}
      >
        Next
      </button>
    </div>
  );
};
