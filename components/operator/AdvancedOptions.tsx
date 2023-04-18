import { useContractEvent, useAccount, useNetwork } from "wagmi";
import { useConnectModal } from "@rainbow-me/rainbowkit";

import { useCreatePool } from "../../hooks/write/useCreatePool";
import { FrensContracts } from "utils/contracts";
import { etherscanUrl } from "#/utils/externalUrls";
import { useEffect, useState } from "react";
import MerkleGenerator from "./MerkleGenerator";
import { utils } from "ethers";
import web3 from "web3";

interface Props {
    setAvancedOptions: (min: string,max: string, root: any) => void;
}

export const AdvancedOptions = ({setAvancedOptions}: Props) => {
    
    const [minimum, setMinimum] = useState<number>(0.0);
    const [maximum, setMaximum] = useState<number>(32.0);
    const [root, setRoot] = useState<string>();

    useEffect(() => {
        setAvancedOptions(
            web3.utils.toWei(minimum.toString(),'ether'),
            web3.utils.toWei(maximum.toString(),'ether'),
            root
            )
    }    
    , [minimum, maximum, root]);


    return (
        <div className="">
            <div className="my-2 p-2">
                <div>Minimum contribution to the pool (in ETH):</div>
                <input
                    type="number"
                    onChange={(e) => setMinimum(Number.parseFloat(e.target.value))}
                    className="input input-primary w-full max-w-xs my-2"
                    min={0}
                    max={32}
                    value={minimum}
                    step={0.001}
                />
            </div>
            <div className="my-2 p-2">
                <div>Maximum contribution to the pool (in ETH):</div>
                <input
                    type="number"
                    onChange={(e) => setMaximum(Number.parseFloat(e.target.value))}
                    className="input input-primary w-full max-w-xs my-2"
                    min={0}
                    max={32}
                    value={maximum}
                    step={0.001}
                />
            </div>
            <MerkleGenerator setRoot={setRoot}/>
        </div>
    );
};
