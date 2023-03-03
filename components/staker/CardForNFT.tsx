import { Address, useNetwork } from "wagmi";
import { FrensContracts } from "utils/contracts";
import Image from "next/image";

type CardProps = {
  name: string;
  image: any;
  nftID: string;
  poolAddress?: Address;
};

function CardForNFT({ name, image, nftID, poolAddress }: CardProps) {
  const { chain } = useNetwork();
  const openSeaLink =
    chain?.name === "Goerli"
      ? `https://testnets.opensea.io/assets/goerli/${FrensContracts.FrensPoolShare.address}/${nftID}`
      : `https://opensea.io/assets/${FrensContracts.FrensPoolShare.address}/${nftID}`;

  return (
    <div className="w-60 rounded-xl">
      <img src={image} className="w-full rounded-xl" alt={name} />
      <div className="px-2 text-center">
        <a href={openSeaLink} target="_blank" rel="noopener noreferrer">
          <div className="text-center">View on OpenSea</div>
        </a>
        {poolAddress && (
          <a href={`/pool/${poolAddress}`} target="_blank" rel="noopener noreferrer">
            <div className="text-center">View pool</div>
          </a>
        )}
      </div>
    </div>
  );
}

export default CardForNFT;
