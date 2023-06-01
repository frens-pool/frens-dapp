import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { FrensContracts } from "utils/contracts";
import { Address, useAccount, useProvider } from "wagmi";
import { usePoolTokenIDs } from "../../hooks/read/usePoolTokenIDs";
import CardForNFT from "./CardForNFT";

interface Props {
  poolAddress: Address;
  poolBalance: number;
}


export const NftGallery = ({
  poolAddress,
  poolBalance
}: Props) => {
  const provider = useProvider();
  const { address: accountAddress, isConnected } = useAccount();
  const { data: poolNftIds } = usePoolTokenIDs({ poolAddress });
  const [poolNFTs, setPoolNFTs] = useState<any[]>([]);
  const [userNFTs, setUserNFTs] = useState<any[]>([]);
  const [shareIdNFTs, setShareIdNFTs] = useState<any[]>([]);

  useEffect(() => {
    console.log("XXX>XXXX>??>>>?????")
    const poolContract = new ethers.Contract(
      FrensContracts.FrensPoolShare.address,
      FrensContracts.FrensPoolShare.abi,
      provider
    );

    if (poolNftIds) {
      const poolIds: string[] = poolNftIds.map((x) => x.toString());
      setPoolNftArray(poolContract, poolIds);
      getUserNfts(poolContract, poolIds);
    }

  }, [poolNftIds, provider, poolBalance]); // refresh when poolbalance changes

  const setPoolNftArray = async (
    poolContract: ethers.Contract,
    poolNftIDs: string[]
  ) => {
    const poolNft = await Promise.all(
      poolNftIDs.map(async (nftID) => await jsonForNftId(poolContract, nftID))
    );
    setPoolNFTs(poolNft);
  };

  const getUserNfts = async (
    poolContract: ethers.Contract,
    poolNftIdsArray: string[]
  ) => {
    let userNftIDs = await getUserNftIds(poolContract, accountAddress);
    const userPoolNfts = poolNftIdsArray.filter((id) =>
      userNftIDs.includes(id)
    ); // intersection
    setUserNFTArray(poolContract, userPoolNfts);
  };

  const getUserNftIds = async (
    poolContract: ethers.Contract,
    ownerAddress: any
  ) => {
    let ownerBalance = await poolContract.balanceOf(ownerAddress);

    let nfts: string[] = [];
    for (var i = 0; i < ownerBalance.toNumber(); i++) {
      let nftId = await poolContract.tokenOfOwnerByIndex(ownerAddress, i);
      nfts.push(nftId.toString());
    }
    return nfts;
  };

  const setUserNFTArray = async (
    poolContract: ethers.Contract,
    userNftIDs: string[]
  ) => {
    const userWalletNFTs = await Promise.all(
      userNftIDs.map(async (nftID) => await jsonForNftId(poolContract, nftID))
    );
    setUserNFTs(userWalletNFTs);
  };

  const getShareIdNftArray = async (
    poolContract: ethers.Contract,
    shareIds: string[]
  ) => {
    const shareIdNfts = await Promise.all(
      shareIds.map(async (id) => await jsonForNftId(poolContract, id))
    );
    setShareIdNFTs(shareIdNfts);
  };

  const jsonForNftId = async (poolContract: ethers.Contract, nftID: string) => {
    const tokenURI = await poolContract.tokenURI(nftID);
    const jsonString = Buffer.from(tokenURI.substring(29), "base64").toString();
    let json = JSON.parse(jsonString);
    json.nftID = nftID;
    return json;
  };

  if (!isConnected) {
    if (shareIdNFTs.length !== 0) {
      return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {shareIdNFTs.map(({ name, image, nftID }) => (
            <div key={name}>
              <CardForNFT name={name} image={image} nftID={nftID} />
            </div>
          ))}
        </div>
      );
    }
  }

  if (poolNFTs.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center bg-white">
        <div className="mb-4">None 🧐</div>
      </div>
    );
  }

  return (
    <div className="bg-white">
      {!poolAddress ? (
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

      <div>Yours:</div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {userNFTs.map(({ name, image, nftID }) => (
          <div key={name}>
            <CardForNFT name={name} image={image} nftID={nftID} />
          </div>
        ))}
      </div>
      <div className="mt-6">All:</div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {poolNFTs.map(({ name, image, nftID }) => (
          <div key={name}>
            <CardForNFT name={name} image={image} nftID={nftID} />
          </div>
        ))}
      </div>
    </div>
  );
};
