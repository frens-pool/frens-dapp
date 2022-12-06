import { useContractEvent, useNetwork } from "wagmi";
import StakingPoolFactory from "../../utils/StakingPoolFactory.json";
  
export function useEventCreate() {
    const { chain } = useNetwork();
    const contractAddr =
        chain?.name === "Goerli"
        ? "0xFf9A6f5E9e30a72AF79f69C5EA09465004Efb40d"
        : "0x00000000000000000000000000000000deadb33f"; // TODO :)

    useContractEvent({
        addressOrName: contractAddr,
        contractInterface: StakingPoolFactory.abi,
        eventName: 'Deposit',
        listener: (event) => {
            console.log(event);
        },
    })

}
  