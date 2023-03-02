import { useNetwork } from "wagmi";
import { FrensContracts } from "utils/contracts";
import Image from "next/image";

type CardProps = {
  name: String;
  image: any;
  nftID: String;
};

function CardForNFT({ name, image, nftID }: CardProps) {
  const { chain } = useNetwork();
  const openSeaLink =
    chain?.name === "Goerli"
      ? `https://testnets.opensea.io/assets/goerli/${FrensContracts.FrensPoolShare.address}/${nftID}`
      : `https://opensea.io/assets/${FrensContracts.FrensPoolShare.address}/${nftID}`;

  return (
    <a href={openSeaLink} target="_blank" rel="noopener noreferrer">
      <div className="w-60 rounded-xl">
        <img src={image} className="w-full rounded-xl" alt="" />
        <div className="px-2 text-center">
          <div className="text-center">{name}</div>
        </div>
      </div>
    </a>
  );
}

export default CardForNFT;
