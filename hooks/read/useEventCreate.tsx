import { useContractEvent, useNetwork } from "wagmi";
import { FrensContracts } from "utils/contracts";

export function useEventCreate() {

    useContractEvent({
        address: FrensContracts.StakingPoolFactory.address,
        abi: FrensContracts.StakingPoolFactory.abi,
        eventName: 'Create',
        listener: (event) => {
            // console.log(event);
        },
    })

}
