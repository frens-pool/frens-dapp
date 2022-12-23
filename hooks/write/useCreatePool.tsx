import {
  usePrepareContractWrite,
  useContractWrite,
  useNetwork,
  useAccount
} from "wagmi";
import StakingPoolFactory from "../../utils/StakingPoolFactory.json";

const StakingPoolFactoryAddress = "0x38ED69e7635ADB2083B06c5d00B9fb9C7e55CD34"

export function useCreatePool({ ownerAddress } : { ownerAddress: string }) {
  const { chain } = useNetwork();
  // const { address: ownerAddress } = useAccount()
  
  const contractAddr =
  chain?.name === "Goerli"
  ? StakingPoolFactoryAddress
  : "0x0000000000000000000000000000000000000000";
  
  const { config } = usePrepareContractWrite({
    addressOrName: contractAddr,
    contractInterface: StakingPoolFactory.abi,
    functionName: 'create',
    args: [ ownerAddress ],
  })
  const { data, isLoading, isSuccess, write } = useContractWrite(config)

  return { data, isLoading, isSuccess, write };
}
