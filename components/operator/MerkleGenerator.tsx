import { useEffect, useState } from "react";
import { utils } from "ethers";
import { MerkleTree } from 'merkletreejs'
import { Address } from "wagmi";

export default function MerkleGenerator(
    { setRoot, setAllowedAddresses }:
        {
            setRoot: (root: string | undefined) => void,
            setAllowedAddresses: (root: Address[]) => void
        }) {

    const [addresses, setAddresses] = useState<string>("");
    const [feedback, setFeedback] = useState<string>("");

    const [tree, setTree] = useState<MerkleTree>();

    useEffect(() => {

        if (addresses.trim() === "")
            return
        const feedback = addresses
            .split(",")
            .map((a: string) => {
                const address = a.trim()
                if (!utils.isAddress(address))
                    return `"${address}" is not a valid address`
            })
            .filter(a => a).join(",")

        setFeedback(feedback)

        if (feedback == "") {
            makeTree()
            setAllowedAddresses(getAddresses() as Address[])
        }
    }, [addresses]);

    const getAddresses = () => addresses.split(",").map(a => a.trim())

    const makeTree = () => {
        const leaves = getAddresses().map(x => utils.keccak256(x));
        console.log("leaves", leaves);
        const newTree = new MerkleTree(leaves, utils.keccak256, { sort: true });
        setTree(newTree);
        console.log("tree", newTree);
        const newRoot = newTree.getHexRoot();
        setRoot(newRoot);
        console.log("root", newRoot);
        for (let i = 0; i < leaves.length; i++) {
            const proof = newTree.getHexProof(leaves[i]);
            console.log("proof", addresses[i], proof);
            console.log("valid?", newTree.verify(proof, leaves[i], newRoot));
        }
    }

    return (
        <div className="my-2 p-2">
            <div>Limited pool to these addresses (comma separated):</div>
            <textarea
                onChange={(e) => setAddresses(e.target.value)}
                cols={44}
                rows={10}
                className="input input-primary w-full max-w-xs my-2"
                value={addresses}
            />
            <p>{feedback}</p>
        </div>
    );
}

