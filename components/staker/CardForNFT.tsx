import { Address, useNetwork } from "wagmi";
import { FrensContracts } from "utils/contracts";
import { useNetworkName } from "#/hooks/useNetworkName";
import { openseaUrl } from "#/utils/externalUrls";

type CardProps = {
  name: string;
  image: any;
  nftID: string;
  poolAddress?: Address;
};

function CardForNFT({ name, image, nftID, poolAddress }: CardProps) {
  const { chain } = useNetwork();
  const network = useNetworkName();
  const openSeaLink = openseaUrl(
    FrensContracts[network].FrensPoolShare.address,
    nftID,
    chain
  );

  return (
    <div className="rounded-xl">
      <a href={openSeaLink} target="_blank" rel="noopener noreferrer">
        <img src={image} className="max-w-10 rounded-xl" alt={name} />
      </a>

      <div className="px-2 text-center">
        {poolAddress && (
          <a
            href={`/pool/${poolAddress}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="text-center underline text-frens-main py-1">
              View pool
            </div>
          </a>
        )}
      </div>
    </div>
  );
}

export default CardForNFT;
