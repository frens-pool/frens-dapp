import { useNetwork } from "wagmi";
import { FrensContracts } from "utils/contracts";

type CardProps = {
  name: String;
  image: any;
  nftID: String;
};

function CardForNFT({ name, image, nftID }: CardProps) {
  const { chain } = useNetwork();
  const openSeaLink =
    chain?.name === "Goerli"
      ? `https://testnets.opensea.io/assets/goerli/${FrensContracts.FrensPoolShareTokenURI.goerliAddress}/${nftID}`
      : `https://opensea.io/assets/${FrensContracts.FrensPoolShareTokenURI.address}/${nftID}`;

  return (
    <a href={openSeaLink} target="_blank" rel="noopener noreferrer">
      <div className="border-solid border-2 w-60 rounded-xl border-slate-500">
        <img src={image} className="w-full rounded-xl" alt="" />
        <div className="px-2">
          <div>{name}</div>
        </div>
      </div>
    </a>
  );
}

export default CardForNFT;
