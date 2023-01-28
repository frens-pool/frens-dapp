import { useState, useEffect } from "react";
import { useEventCreate } from "../../hooks/read/useEventCreate";
import { useCreatePool } from "../../hooks/write/useCreatePool";

export const SelectOperator = ({ setStep }: { setStep: any }) => {
  const [ssvOperators, setssvOperators] = useState([]);
  const [operatorList, setOperatorList] = useState(<></>);
  const [frenSsvOperatorIDs, setFrenSsvOperatorIDs] = useState([]);

  const { data, write: createPool } = useCreatePool();
  // console.log(data)
  useEventCreate();

  useEffect(() => {
    const fetchOperators = async () => {
      const data = await fetch(
        "https://api.ssv.network/api/v1/operators/graph?page=1&perPage=10"
      );
      const json = await data.json();
      setssvOperators(json.operators);
    };

    const fetchFrenOperator = async () => {
      const data = await fetch(
        "https://api.ssv.network/api/v1/operators/owned_by/0x9b18e9e9aa3dD35100b385b7035C0B1E44AfcA14?page=1&perPage=10"
      );
      const json = await data.json();
      setFrenSsvOperatorIDs(json.operators);
    };

    fetchOperators().catch(console.error);

    fetchFrenOperator().catch(console.error);
  }, []);

  // function onCreatePool(): void {
  //     const inviteToken = Math.random().toString(36).substring(2, INVITATION_TOKEN_LENGTH);
  //     setTokenCode(inviteToken);

  //     setStep(2);

  //     createPool();
  // }

  let operatorListLines = ssvOperators?.map((item, i) => {
    return (
      <tr key={i}>
        <td>
          <input type="checkbox" />
          &nbsp;&nbsp;
        </td>
        {/* <td>{item.name} &nbsp;&nbsp;&nbsp;</td>
        <td>{parseFloat(item.performance["24h"]).toFixed(2)}%</td> */}
      </tr>
    );
  });

  let operatorListTable = (
    <table>
      <tr>
        <th></th>
        <th>Name</th>
        <th>24h performance</th>
      </tr>
      {operatorListLines}
    </table>
  );

  // setOperatorList(operatorListTable);

  // console.log(frenSsvOperatorIDs)

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
          <tbody>
            <tr>
              <th>
                <label>
                  <input type="checkbox" className="checkbox" checked />
                </label>
              </th>
              <td>
                <div className="flex items-center space-x-3">
                  <div>
                    <div className="font-bold">FREN 1</div>
                    <div className="text-sm opacity-50">United States</div>
                  </div>
                </div>
              </td>
              <td>
                99%
                <br />
                <span className="badge badge-ghost badge-sm">verified</span>
              </td>
              <th>
                <button className="btn btn-ghost btn-xs">details</button>
              </th>
            </tr>
            <tr>
              <th>
                <label>
                  <input type="checkbox" className="checkbox" checked />
                </label>
              </th>
              <td>
                <div className="flex items-center space-x-3">
                  <div>
                    <div className="font-bold">Blox 1</div>
                    <div className="text-sm opacity-50">China</div>
                  </div>
                </div>
              </td>
              <td>
                95%
                <br />
                <span className="badge badge-ghost badge-sm">verified</span>
              </td>
              <th>
                <button className="btn btn-ghost btn-xs">details</button>
              </th>
            </tr>
            <tr>
              <th>
                <label>
                  <input type="checkbox" className="checkbox" checked />
                </label>
              </th>
              <td>
                <div className="flex items-center space-x-3">
                  <div>
                    <div className="font-bold">FREN 2</div>
                    <div className="text-sm opacity-50">Russia</div>
                  </div>
                </div>
              </td>
              <td>
                97%
                <br />
                <span className="badge badge-ghost badge-sm">verified</span>
              </td>
              <th>
                <button className="btn btn-ghost btn-xs">details</button>
              </th>
            </tr>
            <tr>
              <th>
                <label>
                  <input type="checkbox" className="checkbox" checked />
                </label>
              </th>
              <td>
                <div className="flex items-center space-x-3">
                  <div>
                    <div className="font-bold">Blox 2</div>
                    <div className="text-sm opacity-50">Brazil</div>
                  </div>
                </div>
              </td>
              <td>
                98%
                <br />
                <span className="badge badge-ghost badge-sm">verified</span>
              </td>
              <th>
                <button className="btn btn-ghost btn-xs">details</button>
              </th>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="font-bold">- temporary static -</div>
      <button
        className="mt-2 btn bg-gradient-to-r from-frens-blue to-frens-teal text-white"
        onClick={() => {
          setStep(4);
        }}
      >
        Next
      </button>
    </div>
    // <div>
    //   {/* <div>Create a SSV operated Validator</div> */}
    //   <div>
    //     3. Select three other operators to run you DVT secured validator
    //   </div>
    //   <div className="flex justify-center">
    //     <div>{operatorListTable ? operatorListTable : ""}</div>
    //   </div>
    //   {/* <button className='btn btn-primary' onClick={() => onCreatePool()}>
    //             Deposit ETH to Beacon chain
    //         </button> */}
    // </div>
  );
};
