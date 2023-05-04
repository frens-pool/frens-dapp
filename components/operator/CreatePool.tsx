import { useContractEvent, useAccount, useNetwork, Address } from "wagmi";
import { useConnectModal } from "@rainbow-me/rainbowkit";

import { useCreatePool } from "../../hooks/write/useCreatePool";
import { FrensContracts } from "utils/contracts";
import { etherscanUrl } from "#/utils/externalUrls";
import { useEffect, useState } from "react";
import { AdvancedOptions } from "./AdvancedOptions";
import web3 from "web3";

export const CreatePool = ({
  setStep,
  setPoolContract,
  setAllowedAddresses
}: {
  setStep: any;
  setPoolContract: any;
  setAllowedAddresses: (addresses: Address[]) => void
}) => {
  const { address: accountAddress } = useAccount();
  const { openConnectModal } = useConnectModal();
  const { chain } = useNetwork();

  const [frensLocked, setFrensLocked] = useState<boolean>(false);
  const [poolMin, setPoolMin] = useState<string>(web3.utils.toWei("0", 'ether'));
  const [poolMax, setPoolMax] = useState<string>(web3.utils.toWei("32", 'ether'));
  const [merkleRoot, setMerkleRoot] = useState<any>();
  const [addresses, setAddresses] = useState<Address[]>([]);

  useEffect(() => setFrensLocked(merkleRoot != undefined), [merkleRoot]);
  const setAvancedOptions = (min: string, max: string, root: any, addresses: Address[]) => {
    setPoolMin(min)
    setPoolMax(max)
    setMerkleRoot(root)
    setAddresses(addresses)
  }

  const { data, isLoading, write: createPool } = useCreatePool(false, frensLocked, poolMin, poolMax, merkleRoot);
  let etherscanLink = "";

  function onCreatePool(): void {
    // const INVITATION_TOKEN_LENGTH = 9
    // const inviteToken = Math.random().toString(36).substring(2, INVITATION_TOKEN_LENGTH);
    // setTokenCode(inviteToken);
    console.log("Creating pool:", false, frensLocked, poolMin, poolMax, merkleRoot)
    if (createPool) createPool();
  }

  useEffect(() => {
    if (addresses)
      setAllowedAddresses(addresses);
  }, [addresses]);

  const [showAdvanced, setShowAdvanced] = useState<boolean>(false);
  const toggleAddvanced = () => setShowAdvanced(!showAdvanced)

  useContractEvent({
    address: FrensContracts.StakingPoolFactory.address,
    abi: FrensContracts.StakingPoolFactory.abi,
    eventName: "Create",
    listener: (node) => {
      setPoolContract(node);
      setStep(2);
    },
  });

  if (data) {
    etherscanLink = `${etherscanUrl(chain)}/tx/${data.hash}`;

    return (
      <div>
        <div className="my-2">
          You will get a link to your own personal staking pool
        </div>
        <div className="flex items-center justify-center mt-4 mb-2">
          <div>
            <div className="my-2">just a sec ... pool is getting created</div>
            <div className="flex justify-center">
              <div role="status">
                <svg
                  aria-hidden="true"
                  className="mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-frens-main"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
                <span className="sr-only">Loading...</span>
              </div>
              <a
                className="underline text-frens-main pt-1"
                href={etherscanLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                view tx on etherscan
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const showAdvancedButton = () => (<label className="relative inline-flex items-center cursor-pointer">
    <input type="checkbox" value="" className="sr-only peer" onClick={toggleAddvanced} />
    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
    <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">Advanced options</span>
  </label>)

  const advancedOptions = () => (
    <>
      <h2 className="text-3xl font-bold">Advanced options</h2>
      <AdvancedOptions setAvancedOptions={setAvancedOptions} />
    </>
  )

  return (
    <div>
      <div className="my-2">
        You will get a link to your own personal staking pool
      </div>
      <div className="flex items-center justify-center mt-4 mb-2">
        <div>
          {isLoading ? (
            <button disabled className="btn text-white">
              Loading ...
            </button>
          ) : (
            <>
              <div>
                {accountAddress ? (
                  <button
                    className="btn text-white bg-gradient-to-r from-frens-blue to-frens-teal"
                    onClick={() => onCreatePool()}
                  >
                    Create Pool
                  </button>
                ) : (
                  <button
                    className="btn text-white bg-gradient-to-r from-frens-blue to-frens-teal"
                    onClick={() => {
                      if (openConnectModal) openConnectModal();
                    }}
                  >
                    Create Pool
                  </button>
                )}
              </div>
              <div>
                {showAdvancedButton()}
                <div className={`${showAdvanced ? "block" : "hidden"}`}>
                  <div className="text-center flex flex-col items-center border-2 border-slate-400 rounded-md mb-4 p-3 bg-white">
                    {showAdvanced && advancedOptions()}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
