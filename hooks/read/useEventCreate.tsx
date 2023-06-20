import { FrensContracts } from "utils/contracts";
import { useContractEvent } from "wagmi";
import { useNetworkName } from "../useNetworkName";

export function useEventCreate() {
  const network = useNetworkName();

  useContractEvent({
    address: FrensContracts[network].StakingPoolFactory.address,
    abi: FrensContracts[network].StakingPoolFactory.abi,
    eventName: "Create",
    listener: (event) => {
      // console.log(event);
    },
  });
}
