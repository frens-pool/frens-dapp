import { useState, useEffect } from 'react';
import {
    useEnsAvatar,
    useEnsName,
    useAccount,
    useSignMessage
} from 'wagmi'
import { queryOperator } from 'hooks/graphql/queryOperator';
import { Lens } from 'lens-protocol';
import { usePoolOwner } from '../../hooks/read/usePoolOwner';

const chainId = 5 // 1 for mainnet, 5 for goerli

type Props = {
    poolAddress: string
}

export const OperatorWidget = ({ poolAddress }: Props) => {
    const [operatorProfile, setOperatorProfile] = useState({});
    const [operatorImage, setOperatorImage] = useState("");
    const [operatorName, setOperatorName] = useState("");
    const { address } = useAccount();

    const { data: poolOwner } = usePoolOwner({ address: poolAddress });
    // const poolOwnerSubString = poolOwner?.toString().slice(2);
    const { data: ensName, isError: isEnsNameError, isLoading: isEnsNameLoading } = useEnsName({
        address: `0x9179cf75f37Ceb03bC7EbD2Ad0660933308a8CB4`,
        chainId: chainId,
        cacheTime: 1_000,
        onSettled(data, error) {
            console.log('Settled', { data, error })
        }
    })
    console.log(ensName)

    const fetchOperatorProfile = async () => {
        let operatorProfileFromFetch = await queryOperator(ensName);
        setOperatorProfile(operatorProfileFromFetch);
        // @ts-ignore
        setOperatorImage(operatorProfile?.data?.profile?.picture?.original?.url);
        // @ts-ignore
        setOperatorName(operatorProfile?.data?.profile?.name);
    };
    
    // const { data: ensAvatar, isError: isAvatarError, isLoading: isAvatarLoading } = useEnsAvatar({
    //     address: ensName,
    //     chainId: chainId,
    //     cacheTime: 1_000,
    //     onSettled(data, error) {
    //         console.log('Settled', { data, error })
    //     }
    // })

    const { data, error, isLoading, signMessage } = useSignMessage({
        onSuccess(data, variables) {
            // Verify the signature
            VerifySignature(data);
        },
    });

    const authenticate = async () => {
        // Getting the challenge from the server
        const data = await Lens.getChallenge(address);
        const message = (data as { data: { challenge: { text: string } } }).data.challenge.text;
        // Signing the challenge with the wallet
        signMessage({ message });
    };

    const VerifySignature = async (sign) => {
        // Sending the signature to the server to verify
        const response = await Lens.Authenticate(address, sign);

        // {
        //  data: {
        //   authenticate: {
        //    accessToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjB4YjE5QzI4OTBjZjk0N0FEM2YwYjdkN0U1QTlmZkJjZTM2ZDNmOWJkMiIsInJvbGUiOiJub3JtYWwiLCJpYXQiOjE2NDUxMDQyMzEsImV4cCI6MTY0NTEwNjAzMX0.lwLlo3UBxjNGn5D_W25oh2rg2I_ZS3KVuU9n7dctGIU",
        //    refreshToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjB4YjE5QzI4OTBjZjk0N0FEM2YwYjdkN0U1QTlmZkJjZTM2ZDNmOWJkMiIsInJvbGUiOiJyZWZyZXNoIiwiaWF0IjoxNjQ1MTA0MjMxLCJleHAiOjE2NDUxOTA2MzF9.2Tdts-dLVWgTLXmah8cfzNx7sGLFtMBY7Z9VXcn2ZpE"
        //   }
        // }
    };

    fetchOperatorProfile()
    .catch(console.error);

    // console.log(operatorProfile);
    // console.log(operatorProfile?.data?.profile?.picture?.original?.url);


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


    if(poolAddress){
        return(
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
        )
    }

    return (
        <div className="w-3/5 my-4">
            no operator
        </div>
    )
};