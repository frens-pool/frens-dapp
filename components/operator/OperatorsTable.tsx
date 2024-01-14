import { useNetwork } from "wagmi";
import { SsvOperatorType } from "#/types/commonTypes";
import { ssvScanUrl } from "#/utils/externalUrls";

export const OperatorsTable = ({
  operator,
  index,
}: {
  operator: SsvOperatorType;
  index: number;
}) => {
  const { chain } = useNetwork();

  return (
    <tr key={index}>
      <th>
        <label>
          {index < 6 ? (
            <input
              type="checkbox"
              className="checkbox"
              onChange={(e) => {
                // handleCheck(e, item);
              }}
            />
          ) : (
            <input
              type="checkbox"
              className="checkbox"
              defaultChecked
              onChange={(e) => {
                // handleCheck(e, item);
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
        {parseFloat(operator.performance["30d"]).toFixed(4)}%
        <br />
      </td>
      <td>{operator.validators_count}</td>
      <td>{operator.address_whitelist ? "yes" : "no"}</td>
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
};
