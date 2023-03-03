import { useEffect, useState } from "react";
import { Address, useAccount, useProvider } from "wagmi";
import { ethers } from "ethers";
import { FrensContracts } from "utils/contracts";
import CardForNFT from "../staker/CardForNFT";

export const ShareList = () => {
  const { address: accountAddress } = useAccount();
  const provider = useProvider();
  const [userNFTids, setUserNFTids] = useState<string[]>([]);
  const [userNFT, setUserNFT] = useState<NFTJson[]>([]);

  type NFTJson = {
    "name": string,
    "description": String,
    "external_url": string,
    "attributes": [
        {
            "trait_type": "pool"| "deposit"|"claimable"|"pool state"| "pool creator",
            "value": Address
        }
    ],
    "image": string
    "nftID": string
}

  let FrensPoolShareContract = new ethers.Contract(
    FrensContracts.FrensPoolShare.address,
    FrensContracts.FrensPoolShare.abi,
    provider
  );

  useEffect(() => {
    getNFTidsForUser();
  }, []);

  useEffect(() => {
    setNFTforUser(userNFTids);
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

  const setNFTforUser = async (userNFTids: string[]) => {
    const userShares = await Promise.all(
      userNFTids.map(
        async (nftID) => await jsonForNftId(FrensPoolShareContract, nftID)
      )
    );
    setUserNFT(userShares);
  };

  const jsonForNftId = async (
    FrensPoolShareContract: ethers.Contract,
    nftID: string
  ) => {
    let tokenURI = await FrensPoolShareContract.tokenURI(nftID);
    const jsonString = Buffer.from(tokenURI.substring(29), "base64").toString();
    let json = JSON.parse(jsonString) as NFTJson;
    json.nftID = nftID;
    return json;
  };

  return (
    <div className="bg-white">
      <div>Your shares:</div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {userNFT.map((json) => (
          <div key={json.name}>
            <CardForNFT name={json.name} image={json.image} nftID={json.nftID} poolAddress={json.attributes.find(x => x.trait_type == "pool")!.value}/>
          </div>
        ))}
      </div>
    </div>
  );
};
