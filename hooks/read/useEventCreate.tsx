import { FrensContracts } from "utils/contracts";
import { useContractEvent } from "wagmi";

export function useEventCreate() {
  useContractEvent({
    address: FrensContracts.StakingPoolFactory.address,
    abi: FrensContracts.StakingPoolFactory.abi,
    eventName: "Create",
    listener: (event) => {
      // console.log(event);
    },
  });
}
