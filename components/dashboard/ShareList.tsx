import { useEffect, useState } from "react";
import { useAccount, useProvider } from "wagmi";
import { ethers } from "ethers";
import { FrensContracts } from "utils/contracts";
import CardForNFT from "../staker/CardForNFT";

export const ShareList = () => {
  const { address: accountAddress } = useAccount();
  const provider = useProvider();
  const [userNFTids, setUserNFTids] = useState<any[]>([]);
  const [userNFT, setUserNFT] = useState<any[]>([]);

  let FrensPoolShareContract = new ethers.Contract(
    FrensContracts.FrensPoolShareTokenURI.address,
    FrensContracts.FrensPoolShareTokenURI.abi,
    provider
  );

  useEffect(() => {
    getNFTidsForUser();
  }, []);

  useEffect(() => {
    setNFTforUser();
  }, [userNFTids]);

  const getNFTidsForUser = async () => {
    let nftIDs = [];
    let ownerBalance = await FrensPoolShareContract.balanceOf(accountAddress);
    for (var i = 0; i < ownerBalance.toNumber(); i++) {
      let nftId = await FrensPoolShareContract.tokenOfOwnerByIndex(
        accountAddress,
        i
      );
      nftIDs.push(nftId.toNumber());
    }
    setUserNFTids(nftIDs);
  };

  const setNFTforUser = async () => {
    const userShares = await Promise.all(
      userNFTids.map(
        async (nftID) => await jsonForNftId(FrensPoolShareContract, nftID)
      )
    );
    console.log(userShares);
    setUserNFT(userShares);
  };

  const jsonForNftId = async (
    FrensPoolShareContract: ethers.Contract,
    nftID: string
  ) => {
    let tokenURI = await FrensPoolShareContract.tokenURI(nftID);
    const jsonString = Buffer.from(tokenURI.substring(29), "base64").toString();
    let json = JSON.parse(jsonString);
    json.nftID = nftID;
    return json;
  };

  return (
    <div className="bg-white">
      <div>Your shares:</div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {userNFT.map(({ name, image, nftID }) => (
          <div key={name}>
            <CardForNFT name={name} image={image} nftID={nftID} />
          </div>
        ))}
      </div>
    </div>
  );
};
