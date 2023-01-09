import { usePrepareContractWrite, useContractWrite, useNetwork } from "wagmi";
import SSVToken from "../../utils/SSVToken.json";

export function useAllowance({
  spender,
  value,
}: {
  spender: string;
  value: string;
}) {
  const { chain } = useNetwork();

  const SSVTokenContractAddr =
    chain?.name === "Goerli"
      ? "0x3a9f01091C446bdE031E39ea8354647AFef091E7"
      : "0x00000000000000000000000000000000deadb33f";

  const registerContractAddr =
    chain?.name === "Goerli"
      ? "0xb9e155e65B5c4D66df28Da8E9a0957f06F11Bc04"
      : "0x00000000000000000000000000000000deadb33f";

  const { config } = usePrepareContractWrite({
    address: SSVTokenContractAddr,
    abi: SSVToken.abi,
    functionName: "approve",
    args: [registerContractAddr, "21342395400000000000"],
  });

  const { data, isLoading, isSuccess, write } = useContractWrite(config);

  return { data, isLoading, isSuccess, write };
}
