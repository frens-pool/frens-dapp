import { useState, useEffect, ChangeEvent } from "react";
import { useNetwork } from "wagmi";
import { ssvScanUrl, ssvOperatorListApi } from "#/utils/externalUrls";
import { SsvOperatorType } from "#/types/commonTypes";
import SearchOperator from "./SearchOperator";
import { SelectedOperators } from "./SelectedOperators";

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
  const { chain } = useNetwork();

  useEffect(() => {
    const fetchOperators = async () => {
      const data = await fetch(ssvOperatorListApi(1, 6, chain));
      const json = await data.json();
      setssvOperators(json.operators);
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

  let operatorListRows = ssvOperators?.map((item, i) => {
    console.log("i", i);
    return (
      <tr key={i}>
        <th>
          <label>
            {i < 6 ? (
              <input
                type="checkbox"
                className="checkbox"
                onChange={(e) => {
                  handleCheck(e, item);
                }}
              />
            ) : (
              <input
                type="checkbox"
                className="checkbox"
                defaultChecked
                onChange={(e) => {
                  handleCheck(e, item);
                }}
              />
            )}
          </label>
        </th>
        <td>
          <div className="flex items-center space-x-3">
            <div>
              <div className="font-bold">{item.name}</div>
            </div>
          </div>
        </td>
        <td>
          {parseFloat(item.performance["30d"]).toFixed(4)}%
          <br />
        </td>
        <td>{item.validators_count}</td>
        <td>{item.address_whitelist ? "yes" : "no"}</td>
        <td>
          <a
            href={ssvScanUrl(item.id, chain)}
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
    <div className="w-3/5 mx-auto my-2 p-2">
      <SelectedOperators checkedOperators={checkedOperators} />
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
              <th>
                <div>Validator</div>
                Count
              </th>
              <th>Permissioned</th>
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
