import { useNetworkName } from "#/hooks/useNetworkName";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { FrensContracts } from "utils/contracts";
import { Address, useAccount, usePublicClient } from "wagmi";
import CardForNFT from "../staker/CardForNFT";
import Pool from "#/pages/pool/[pool]";


interface Props {
}

export const ShareList = ({ }: Props) => {
  const { address: accountAddress, isConnected } = useAccount();
  const [userNFTs, setUserNFTs] = useState<any[]>();
  const [totalDeposit, setTotalDeposit] = useState<number>(0);
  const [totalClaimable, setTotalClaimable] = useState<number>(0);
  const network = useNetworkName();
  const publicClient = usePublicClient();

  useEffect(() => {
    if (isConnected) {
      getUserNfts();
    }
  }, [isConnected]); // TODO: refresh when poolbalance changes

  const getUserNfts = async (
  ) => {
    let userNftIDs = await getUserNftIds(accountAddress);
    setUserNFTArray(userNftIDs);
  };

  const getUserNftIds = async (
    ownerAddress: any
  ) => {
    let ownerBalance = await publicClient.readContract({
      address: FrensContracts[network].FrensPoolShare.address,
      abi: FrensContracts[network].FrensPoolShare.abi,
      functionName: 'balanceOf',
      args: [ownerAddress]
    })

    let nfts: string[] = [];
    for (var i = 0; i < Number(ownerBalance); i++) {
      let nftId_ = await publicClient.readContract({
        address: FrensContracts[network].FrensPoolShare.address,
        abi: FrensContracts[network].FrensPoolShare.abi,
        functionName: 'tokenOfOwnerByIndex',
        args: [ownerAddress, i]
      })
      const nftId = nftId_ as BigInt;
      nfts.push(nftId.toString());
    }
    return nfts;
  };

  const setUserNFTArray = async (
    userNftIDs: string[]
  ) => {
    const userWalletNFTs = await Promise.all(
      userNftIDs.map(async (nftID) => await jsonForNftId(nftID))
    );
    if (userWalletNFTs) {
      setTotalDeposit(userWalletNFTs.reduce((total, n) => total + n.deposit, 0))
      setTotalClaimable(userWalletNFTs.reduce((total, n) => total + n.claimable, 0))
      setUserNFTs(userWalletNFTs);
    }
  };

  const jsonForNftId = async (nftID: string) => {

    let tokenURI_ = await publicClient.readContract({
      address: FrensContracts[network].FrensPoolShare.address,
      abi: FrensContracts[network].FrensPoolShare.abi,
      functionName: 'tokenURI',
      args: [nftID]
    })

    const tokenURI = tokenURI_ as string;

    const jsonString = Buffer.from(tokenURI.substring(29), "base64").toString();
    let json = JSON.parse(jsonString);
    json.nftID = nftID;
    json.poolAddress = getAttributeValue(json, "pool");
    json.deposit = parseFloat(getAttributeValue(json, "deposit").replace(" Eth", ""));
    json.claimable = parseFloat(getAttributeValue(json, "claimable").replace(" Eth", ""));
    return json;
  };

  const getAttributeValue = (json: any, name: string) => {
    if (!json.attributes) return null;
    const v = json.attributes.find((a: any) => { return a.trait_type === name });
    return v?.value;
  }

  if (!userNFTs) {
    return (
      <div className="flex flex-col items-center justify-center bg-white">
        <div className="mb-4">Loading...</div>
      </div>
    );
  }


  if (userNFTs.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center bg-white">
        <div className="mb-4">You don&apos;t have shares in a pool 🧐</div>
      </div>
    );
  }

  return (
    <div className="bg-white">
      {!userNFTs ? (
        <div className="flex justify-center">
          <div className="mr-2">updating</div>
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
            <span className="sr-only">Updating...</span>
          </div>
        </div>
      ) : (
        <div></div>
      )}
      <div className="pb-4">
        <div className="w-full flex justify-between">


          <div className="w-1/3 text-center p-4 border rounded shadow-lg mr-4">
            <div className="text-5xl font-bold">{userNFTs.length}</div>
            <div className="text-lg mt-2">Pool shares</div>
          </div>
          <div className="w-1/3 text-center p-4 border rounded shadow-lg mr-4">
            <div className="text-5xl font-bold">{totalDeposit.toFixed(4).toString()}</div>
            <div className="text-lg mt-2">ETH deposited</div>
          </div>

          <div className="w-1/3 text-center p-4 border rounded shadow-lg">
            <div className="text-5xl font-bold">{totalClaimable.toFixed(4).toString()}</div>
            <div className="text-lg mt-2">ETH claimable</div>
          </div>


        </div>
      </div>
      <div className="grid grid-cols-3 gap-4">

        {userNFTs.map(({ name, image, nftID, poolAddress }) => (
          <div key={name}>
            <CardForNFT name={name} image={image} nftID={nftID} poolAddress={poolAddress} />
          </div>
        ))}
      </div>
    </div>
  );
};
