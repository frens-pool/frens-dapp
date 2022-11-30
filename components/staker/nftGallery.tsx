import { useAccount } from 'wagmi'
import { useEffect, useState } from "react";
import { useNftBalance } from '../../hooks/read/useNftBalance';
import { useNftTokenID } from '../../hooks/read/useNftTokenID';
import { useNftTokenURI } from '../../hooks/read/useNftTokenURI';

type Props = {
    poolAddress?: string
}

export const NftGallery = ({ poolAddress }: Props) => {
    const [nftStakes, setNftStakes] = useState([]);
    const { address } = useAccount();
    const { data: nftBalance } = useNftBalance({ poolAddress: poolAddress as string, ownerAddress: address as string });
    console.log(nftBalance?.toNumber())

    // useEffect(() => {
    //     const updateNftStakes = async () => {
    //         const collectibleUpdate = [];
    //         for (let tokenIndex = 0; tokenIndex < nftBalance?.toNumber(); tokenIndex++) {
    //             try{
    //                 const { data: nftTokenID } = useNftTokenID({ poolAddress: poolAddress as string, ownerAddress: address as string, tokenId: tokenIndex as number });
    //                 const { data: nftTokenURI } = useNftTokenURI({ poolAddress: poolAddress as string, tokenId: nftTokenID });
    //                 const jsonManifestString = atob(nftTokenURI.substring(29));
    //                 try {
    //                     const jsonManifest = JSON.parse(jsonManifestString);
    //                     collectibleUpdate.push({ id: nftTokenID, uri: nftTokenURI, owner: address, ...jsonManifest });
    //                   } catch (e) {
    //                     console.log(e);
    //                   }
    //             } catch (e) {
    //                 console.log(e)
    //             }
                
    //         }
    //         setNftStakes(collectibleUpdate.reverse());
    //     }
    //     updateNftStakes();
    // }, [nftBalance])
    // console.log(nftStakes)

    const { data: nftTokenID } = useNftTokenID({ poolAddress: poolAddress as string, ownerAddress: address as string, tokenId: 0 as number });
    const { data: nftTokenURI } = useNftTokenURI({ poolAddress: poolAddress as string, tokenId: nftTokenID });

    if (nftTokenURI) {
        const jsonNFT = atob(nftTokenURI.substring(29));
        const resultNFT = JSON.parse(jsonNFT);

        return (
            <div className="w-full md:w-3/5 mt-4">
                <div className="flex flex-col items-center">
                    {nftTokenURI ?
                        <img src={resultNFT.image} alt="NFT" className="rounded-lg" />
                        : <div>loading nft</div>
                    }
                </div>
            </div>
        )
    }
    else {
        return (
            <div className="w-full md:w-3/5 mt-4">
                <div className="flex flex-col items-center">
                    <div>no stakes yet</div>
                </div>
            </div>
        )
    }
};