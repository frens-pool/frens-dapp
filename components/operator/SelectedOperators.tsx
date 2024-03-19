import { useState, useEffect } from "react";
import { useNetwork } from "wagmi";
import { ssvOperatorApi, ssvOperatorListApi } from "#/utils/externalUrls";
import { SsvOperatorType } from "#/types/commonTypes";
import SearchOperator from "./SearchOperator";

export const SelectedOperators = ({
  checkedOperators,
}: {
  checkedOperators: any;
}) => {
  let operatorListRows = checkedOperators?.map((item: any, i: any) => {
    return (
      <tr key={i}>
        <th>
          <label>
            <input type="checkbox" className="checkbox" onChange={(e) => {}} />
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
    </div>
  );
};
