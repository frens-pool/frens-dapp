import { Address } from "wagmi";
import { useEffect, useState } from "react";
import MerkleGenerator from "./MerkleGenerator";
import web3 from "web3";

interface Props {
    setAvancedOptions: (min: string, max: string, root: any, addresses: Address[]) => void;
}

export const AdvancedOptions = ({ setAvancedOptions }: Props) => {

    const [minimum, setMinimum] = useState<number>(0.0);
    const [maximum, setMaximum] = useState<number>(32.0);
    const [root, setRoot] = useState<string>();
    const [allowedAddresses, setAllowedAddresses] = useState<Address[]>([]);

    useEffect(() => {
        setAvancedOptions(
            web3.utils.toWei(minimum.toString(), 'ether'),
            web3.utils.toWei(maximum.toString(), 'ether'),
            root,
            allowedAddresses
        )
    }, [minimum, maximum, root, allowedAddresses]);

    const cleanNumber = (value: string) => {
        const raw = Number.parseFloat(value)
        if (Number.isNaN(raw)) {
            return 0
        } else {
            return raw
        }
    }

    return (
        <div className="">
            <div className="my-2 p-2">
                <div>Minimum contribution to the pool (in ETH):</div>
                <input
                    type="number"
                    onChange={(e) => setMinimum(cleanNumber(e.target.value))}
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
                    onChange={(e) => setMaximum(cleanNumber(e.target.value))}
                    className="input input-primary w-full max-w-xs my-2"
                    min={0}
                    max={32}
                    value={maximum}
                    step={0.001}
                />
            </div>
            <MerkleGenerator setRoot={setRoot} setAllowedAddresses={setAllowedAddresses} />
        </div>
    );
};
