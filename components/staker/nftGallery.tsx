import { useEffect, useState } from "react";
import { useAccount } from 'wagmi'
import { ethers } from "ethers";
import StakingPool from "../../utils/StakingPool.json";
import CardForNFT from "./cardForNFT";

import { useNftBalance } from '../../hooks/read/useNftBalance';
import { useNftTokenID } from '../../hooks/read/useNftTokenID';
import { useNftTokenURI } from '../../hooks/read/useNftTokenURI';

type Props = {
    poolAddress: string
}

export const NftGallery = ({ poolAddress }: Props) => {
    const { address:accountAddress } = useAccount();
    const [walletNFTs, setWalletNFTs] = useState<any[]>([]);
    let provider;
    let signer;
    let FrensPoolContract;

    useEffect(() => {
        const { ethereum } = window;
        if (ethereum) {
            provider = new ethers.providers.Web3Provider(ethereum as any);
            signer = provider.getSigner();
            
            FrensPoolContract = new ethers.Contract(
                poolAddress,
                StakingPool.abi,
                signer
            );
        }
        getUserNft();
    }, []);

    const getUserNft = async () => {
        let userNftIDs = await getUserNftIds()
        setUserNFTs(userNftIDs)
    }

    const getUserNftIds = async () => {
        let userNFTsByIDArray: number[] = []

        const { ethereum } = window;
        if (ethereum) {
            let totalSupply = await FrensPoolContract.totalSupply()
           
            for (var i = 1; i <= totalSupply.toNumber(); i++) {
                let nftOwner = await FrensPoolContract.ownerOf(i);
                if(nftOwner === accountAddress) {
                    userNFTsByIDArray.push(i)
                }
            }
        }
        return userNFTsByIDArray
    }

    const setUserNFTs = async (userNftIDs: number[]) => {
        let userWalletNFTs: any[] = []

        const { ethereum } = window;
        if (ethereum) {
            for (var nftID of userNftIDs) {
                let tokenURI = await FrensPoolContract.tokenURI(nftID);
                const json = atob(tokenURI.substring(29));
                const nftMetaData = JSON.parse(json);
                userWalletNFTs.push(nftMetaData)
            }
            setWalletNFTs(userWalletNFTs)  
        }
    }

    if(walletNFTs.length === 0) {
        return <div className="flex flex-col items-center justify-center">
            <div className="">None 🧐</div>
        </div>
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {walletNFTs.map(({ name, image }) => (
                <div key={name}>
                    <CardForNFT name={name} image={image}/>
                </div>
            ))}
        </div>
    )

    // with wagmi - single token only

    // const { data: nftTokenID } = useNftTokenID({ poolAddress: poolAddress as string, ownerAddress: accountAddress as string, tokenId: 0 as number });
    // const { data: nftTokenURI } = useNftTokenURI({ poolAddress: poolAddress as string, tokenId: nftTokenID });

    // if (nftTokenURI) {
    //     const jsonNFT = atob(nftTokenURI.substring(29));
    //     const resultNFT = JSON.parse(jsonNFT);

    //     return (
    //         <div className="w-full md:w-3/5 mt-4">
    //             <div className="flex flex-col items-center">
    //                 {resultNFT ?
    //                     <img src={resultNFT.image} alt="NFT" className="rounded-lg" />
    //                     : <div>loading nft</div>
    //                 }
    //             </div>
    //         </div>
    //     )
    // }
};