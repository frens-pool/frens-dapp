import { useEffect, useState } from "react";
import { useAccount } from 'wagmi'
import { ethers } from "ethers";
import { useRouter } from 'next/router';
import StakingPool from "../../utils/StakingPool.json";
import FrensPoolShare from "../../utils/FrensPoolShare.json";
import CardForNFT from "./cardForNFT";

import { useNftBalance } from '../../hooks/read/useNftBalance';
import { useNftTokenID } from '../../hooks/read/useNftTokenID';
import { useNftTokenURI } from '../../hooks/read/useNftTokenURI';

export const NftGallery = ({isDepositing}) => {
    const router = useRouter()
    const poolAddress = router.query.pool ? router.query.pool : "0xB5a38976c8B39d481737354e4DE888eFB7A7fF75"

    const { address:accountAddress } = useAccount();
    const [poolNFTs, setPoolNFTs] = useState<any[]>([]);
    const [walletNFTs, setWalletNFTs] = useState<any[]>([]);
    let provider;
    let signer;
    let StakingPoolContract;
    let FrensPoolShareContract;

    useEffect(() => {
        const { ethereum } = window;
        if (ethereum) {
            provider = new ethers.providers.Web3Provider(ethereum as any);
            signer = provider.getSigner();

            StakingPoolContract = new ethers.Contract(
                poolAddress.toString(),
                StakingPool.abi,
                signer
            );

            FrensPoolShareContract = new ethers.Contract(
                "0x7Dd2DaD96D8c0C26Bf76C57f933fE9370009Cecc",
                FrensPoolShare.abi,
                signer
            );
        }
        getPoolNft();
    }, [router.query.pool]);

    const getPoolNft = async () => {
        let poolNftIds = await getAllPoolNftIds();
        setPoolNftArray(poolNftIds);
    }

    const getAllPoolNftIds = async () => {
        let poolNFTsByIDArray: number[] = []

        const { ethereum } = window;
        if (ethereum) {
            let poolTotalDeposits = await StakingPoolContract.totalDeposits();
            let poolTotalDepositsString = poolTotalDeposits.toString();

            if(poolTotalDepositsString !== "0") {
                let poolTotalDepositsInt = poolTotalDepositsString / 1000000000000000;
                for (var i = 0; i < poolTotalDepositsInt; i++) {
                    let poolNftId = await StakingPoolContract.idsInThisPool(i);
                    poolNFTsByIDArray.push(poolNftId.toNumber());
                }
            }
        }
        return poolNFTsByIDArray;
    }

    const setPoolNftArray = async (poolNftIDs: number[]) => {
        let poolNft: any[] = []
        let userWalletNFTs: any[] = []

        const { ethereum } = window;
        if (ethereum) {
            for (var nftID of poolNftIDs) {
                let tokenURI = await FrensPoolShareContract.tokenURI(nftID);
                const json = atob(tokenURI.substring(29));
                const nftMetaData = JSON.parse(json);
                poolNft.push(nftMetaData);

                let nftOwner = await FrensPoolShareContract.ownerOf(nftID);
                if(nftOwner === accountAddress) {
                    userWalletNFTs.push(nftMetaData);
                }
            }
            setPoolNFTs(poolNft)
            setWalletNFTs(userWalletNFTs)  
        }
    }

    const getUserNftIds = async () => {
        let userNFTsByIDArray: number[] = []

        const { ethereum } = window;
        if (ethereum) {
            let totalSupply = await FrensPoolShareContract.totalSupply();
           
            for (var i = 1; i <= totalSupply.toNumber(); i++) {
                let nftOwner = await FrensPoolShareContract.ownerOf(i);
                if(nftOwner === accountAddress) {
                    userNFTsByIDArray.push(i);
                }
            }
        }
        return userNFTsByIDArray
    }

    if(walletNFTs.length === 0) {
        return <div className="flex flex-col items-center justify-center">
            <div className="">None 🧐</div>
        </div>
    }

    if(isDepositing){
        <div className="flex justify-center">
            <div>updating</div>
            <div role="status">
                <svg aria-hidden="true" className="mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-cyan-500" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                </svg>
                <span className="sr-only">Updating...</span>
            </div>
        </div>
    }

    return (
        <div>
            <div>Yours:</div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {walletNFTs.map(({ name, image }) => (
                    <div key={name}>
                        <CardForNFT name={name} image={image}/>
                    </div>
                ))}
            </div>
            <div className="mt-6">All:</div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {poolNFTs.map(({ name, image }) => (
                    <div key={name}>
                        <CardForNFT name={name} image={image}/>
                    </div>
                ))}
            </div>
        </div>
        
    )
};