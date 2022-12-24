import { useState, useEffect } from 'react';
import {
    useEnsName,
    useAccount,
} from 'wagmi'
import { queryOperator } from 'hooks/graphql/queryOperator';
import { usePoolOwner } from '../../hooks/read/usePoolOwner';

const chainId = 5 // 1 for mainnet, 5 for goerli

type Props = {
    poolAddress: string
}

export const OperatorWidget = ({ poolAddress }: Props) => {
    const [operatorProfile, setOperatorProfile] = useState({});
    const [operatorImage, setOperatorImage] = useState("");
    const [loadedPoolOwner, setLoadedPoolOwner] = useState(false);
    const [operatorName, setOperatorName] = useState("");

    const { address:accountAddress } = useAccount()
    const { data: poolOwner, isSuccess } = usePoolOwner({ address: poolAddress });

    useEffect(() => {
        if(isSuccess) setLoadedPoolOwner(true)
        fetchOperatorProfile()
    }, [loadedPoolOwner])


    const poolOwnerSubString = poolOwner?.toString().slice(2);
    const { data: ensName, isError: isEnsNameError, isLoading: isEnsNameLoading } = useEnsName({
        address: `0x${poolOwnerSubString}`,
        chainId: chainId,
        cacheTime: 1_000,
    })

    const fetchOperatorProfile = async () => {
        let operatorProfileFromFetch = await queryOperator(ensName);

        //TODO: make sure we have the profile information when setting the image! 
        //... seems like we are not awaiting correctly?
        // console.log(operatorProfileFromFetch)
        setOperatorProfile(operatorProfileFromFetch);
        // @ts-ignore
        setOperatorImage(operatorProfile?.data?.profile?.picture?.original?.url);
        // @ts-ignore
        setOperatorName(operatorProfile?.data?.profile?.name);
    };

    if(!accountAddress){
        <div className="w-3/5 my-4">
            <figure className="md:flex bg-slate-100 rounded-xl p-8 md:p-0 dark:bg-slate-800">
                <div className="text-3xl text-white text-center p-2 md:p-14">
                    🧑‍🤝‍🧑
                </div>
                <div className="pt-2 md:pt-6 pr-0 md:pr-8 text-center md:text-left space-y-4">
                    <blockquote>
                        <h1 className="text-lg font-medium text-white">
                            Your frenly pool operator
                        </h1>
                    </blockquote>
                    <figcaption className="font-medium">
                        <div className="text-sky-500 dark:text-sky-400">
                            no ENS
                        </div>
                        <div className="hidden md:block text-white dark:text-white">
                            {poolAddress}
                        </div>
                    </figcaption>
                </div>
            </figure>
        </div>
    }

    if(ensName) {
        return (
            <div className="w-full md:w-3/5 mt-4">
                <figure className="md:flex bg-slate-100 rounded-xl p-8 md:p-0 dark:bg-slate-800">
                    <img 
                        className="w-24 h-24 md:w-48 md:h-auto rounded-full mx-auto" 
                        src={operatorImage} 
                        alt={ensName} 
                        width="384" 
                    />
                    <div className="py-6 px-8 text-center md:text-left space-y-4">
                        <blockquote>
                            <h1 className="text-lg font-medium text-white">
                                Your frenly pool operator
                            </h1>
                        </blockquote>
                        <figcaption className="font-medium">
                            <div className="text-sky-500 dark:text-sky-400">
                                {operatorName}
                            </div>
                            <div className="text-sky-500 dark:text-sky-400">
                                {ensName}
                            </div>
                            <div className="text-white dark:text-slate-500">
                            </div>
                        </figcaption>
                        {/* <button onClick={follow}>Follow on Lens</button> */}
                        {ensName && (<a href={"https://lenster.xyz/u/" + ensName.replace(new RegExp(".eth$"), '.lens')}>Follow on Lens</a>)}
                    </div>
                </figure>
            </div>
        )
    }

    return(
        <div className="w-3/5 my-4">
            we have a problem
        </div>
    )
};