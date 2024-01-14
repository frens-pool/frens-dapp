import { useState, useEffect } from "react";
import { useNetwork } from "wagmi";
import { ssvOperatorApi, ssvOperatorListApi } from "#/utils/externalUrls";
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
      const data = await fetch(ssvOperatorListApi(1, 8, chain));
      const json = await data.json();
      setssvOperators(json.operators);
    };

    fetchOperators().catch(console.error);
  }, []);

  const addSSVOperator = (searchOperator: SsvOperatorType) => {
    setssvOperators([searchOperator, ...ssvOperators]);
  };

  let operatorListRows = ssvOperators?.map((item, i) => {
    return (
      <tr key={i}>
        <th>
          <label>
            <input
              type="checkbox"
              className="checkbox"
              onChange={(e) => {
                setCheckedOperators(
                  e.target.checked
                    ? [...checkedOperators, item]
                    : checkedOperators.filter(
                        (operator) => operator.id !== item.id
                      )
                );
              }}
            />
          </label>
        </th>
        <td>
          <div className="flex items-center space-x-3">
            <div>
              <div className="font-bold">{item.name}</div>
              <div className="text-sm opacity-50">verified</div>
            </div>
          </div>
        </td>
        <td>
          {parseFloat(item.performance["30d"]).toFixed(4)}%
          <br />
          <span className="badge badge-ghost badge-sm">last 30d</span>
        </td>
        <th>
          <a
            href={`https://ssvscan.io/operator/${item.id}`}
            className="btn btn-ghost btn-xs"
            target="_blank"
          >
            details
          </a>
        </th>
      </tr>
    );
  });

  return (
    <div className="w-2/5 mx-auto my-2 p-2">
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
              <th>Performance</th>
              <th></th>
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
