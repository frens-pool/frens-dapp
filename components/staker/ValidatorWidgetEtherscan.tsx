import Link from "next/link";
import { useState, useEffect } from "react";
import { Address } from "wagmi";
import { FrensContracts } from "utils/contracts";
import Web3 from "web3";

const apiToken = process.env.NEXT_PUBLIC_ETHERSCAN_KEY
const etherscan_url = "https://api-goerli.etherscan.io"
const deposit_address = FrensContracts.DepositContract.address

type Props = {
  poolAddress: Address;
};

export const ValidatorWidget = ({ poolAddress }: Props) => {
  const [publicKeys, setPublicKeys] = useState<string[]>([]);

  useEffect(() => {
    if (apiToken)
      fetchValidatorPublicKeysFromEtherscan(poolAddress)
  }, [poolAddress]);

  const fetchValidatorPublicKeysFromEtherscan = async (poolAddress: Address) => {
    const stake_transactions = await getStake_transactions(poolAddress)
    const publicKeys = await getPublicKeys(stake_transactions)
    setPublicKeys(publicKeys)
  };

  const getStake_transactions = async (poolAddress: Address) => {
    const url = `${etherscan_url}/api?module=account&action=txlist&address=${poolAddress}&startblock=0&apikey=${apiToken}`
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(response.statusText)
    }
    const json = await response.json()
    const transactions = json.result;
    return transactions.filter((t: any) => t.functionName.startsWith("stake("))
  }

  const getPublicKeys = async (stake_transactions: any) : Promise<string[]> => {
    return Promise.all(stake_transactions.map(async (t: any) => {
      const blockNumber = t.blockNumber
      const url = `${etherscan_url}/api?module=logs&action=getLogs&fromBlock=${blockNumber}&toBlock=${blockNumber}&address=${deposit_address}&apikey=${apiToken}`
      const response = await fetch(url)
      if (!response.ok) {
        throw new Error(response.statusText)
      }
      const json = await response.json()
      const data = json.result[0].data


      if (false) {
        const web3 = new Web3();
        const decoded = web3.eth.abi.decodeParameters(
          ["bytes", "bytes", "bytes", "bytes", "bytes"],
          data
        );      
        console.log("decoded: ", decoded);
      }

      //TODO: there must be a better way to extract the "PublicKey" from the data. Deposit Contract ABI?
      const publicKey = data.slice(2).slice(96 * 4, 96 * 5)
      return publicKey;
    }))
  }

  if (publicKeys.length == 0)
    return <></>

  return (
    <div className="z-20 w-11/12 md:w-2/3 border-2 border-slate-400 rounded-md bg-white mt-6">
      <div className="flex justify-center align-middle bg-white rounded-xl p-8 md:p-0 ">
        <div className="py-6 px-8 text-center md:text-left space-y-2">
          <blockquote>
            <h1 className="text-lg font-medium">{publicKeys.length} active Ethereum Validators</h1>
          </blockquote>
          <div className="font-medium mb-2">
            {publicKeys.map((publicKey, index) => (
              <div key={publicKey}>
                <Link
                  href={`https://prater.beaconcha.in/validator/${publicKey}`}
                  className="underline text-frens-main"
                >
                  {`Validator performance information on Beaconcha.in`}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
