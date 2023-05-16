import { useState, useEffect } from "react";

export const SelectOperator = ({
  nextStep,
  setOperators,
}: {
  nextStep: () => void;
  setOperators: any;
}) => {
  const [ssvOperators, setssvOperators] = useState<any[]>([]);
  const [frenSsvOperatorIDs, setFrenSsvOperatorIDs] = useState([]);
  const [checkedOperators, setCheckedOperators] = useState<any[]>([]);

  useEffect(() => {
    const fetchOperators = async () => {
      const data = await fetch(
        "https://api.ssv.network/api/v3/prater/operators?page=1&perPage=10&ordering=performance.30d%3Adesc"
      );
      const json = await data.json();
      setssvOperators(json.operators);
    };

    // const fetchFrenOperator = async () => {
    //   const data = await fetch(
    //     "https://api.ssv.network/api/v1/operators/owned_by/0x9b18e9e9aa3dD35100b385b7035C0B1E44AfcA14?page=1&perPage=10"
    //   );
    //   const json = await data.json();
    //   setFrenSsvOperatorIDs(json.operators);
    // };

    fetchOperators().catch(console.error);

    // fetchFrenOperator().catch(console.error);
  }, []);

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
          <button className="btn btn-ghost btn-xs">details</button>
        </th>
      </tr>
    );
  });

  return (
    <div className="my-2 p-2">
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
