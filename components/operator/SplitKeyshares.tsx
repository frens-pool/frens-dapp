import { useState } from "react";
import { DropKeys } from "components/operator/DropKeys";
import { ISharesKeyPairs, SSVKeys, KeyShares, KeySharesItem } from "ssv-keys";
import BigNumber from "bignumber.js";
import { useAccount, useNetwork, usePublicClient, Address } from "wagmi";

import { FrensContracts } from "#/utils/contracts";
import { useNetworkName } from "#/hooks/useNetworkName";

export const SplitKeyshares = ({
  operatorsList,
  nextStep,
  setPayloadRegisterValidator,
  poolAddress,
  itemDone
}: {
  operatorsList: any;
  nextStep: () => void;
  setPayloadRegisterValidator: any;
  poolAddress: Address;
  itemDone: Boolean;
}) => {
  const [pw, setPW] = useState("");
  const [loading, setLoading] = useState(false);
  const [payloadError, setPayloadError] = useState(false);
  const [keystoreError, setKeystoreError] = useState(false);
  const [keystoreFileData, setKeystoreFileData] = useState<string>("");
  const network = useNetworkName();
  const { chain } = useNetwork();
  const publicClient = usePublicClient();

  const ssvKeys = new SSVKeys();

  function buildRegisterPayload() {
    const keyshareData = async () => {
      try {
        if (!keystoreFileData) {
          setKeystoreError(true);
        }

        const operators = operatorsList.map((operator: any) => ({
          id: operator.id,
          operatorKey: operator.public_key,
          // publicKey: operator.public_key,
        }));

        const { publicKey, privateKey } = await ssvKeys.extractKeys(
          keystoreFileData,
          pw
        );
        const threshold: ISharesKeyPairs = await ssvKeys.createThreshold(
          privateKey,
          operators
        );
        const encryptedShares = await ssvKeys.encryptShares(
          operators,
          threshold.shares
        );

        // SSV Cluster Data
        const cData = await getClusterData(operators.map((o: any) => o.id));
        const ownerAddress = cData.cluster[0].Owner;
        const ownerNonce = parseInt(cData.nonce);

        const keySharesItem = new KeySharesItem();
        await keySharesItem.update({ operators });
        await keySharesItem.update({ ownerAddress, ownerNonce, publicKey });

        await keySharesItem.buildPayload(
          {
            publicKey,
            operators,
            encryptedShares,
          },
          {
            ownerAddress,
            ownerNonce,
            privateKey,
          }
        );

        const keyShares = new KeyShares();
        keyShares.add(keySharesItem);

        // static at 1,5 SSV token per validator.
        // assumption: exactly 4 operators
        const tokenAmount = new BigNumber(5000000000000000000).toString();

        // const operatorFees = operators.map((operator: any) => {
        //   return operator.fee;
        // });
        // const sumOfFees: number = operatorFees.reduceRight(
        //   (acc: number, cur: number) => Number(acc) + Number(cur),
        //   0
        // );

        const keySharesPayload = await keyShares.toJson();

        return {
          payload: JSON.parse(keySharesPayload),
          tokenAmount,
        };
      } catch (error: any) {
        // console.log(error);
        setPayloadError(true);
        setLoading(false);
        throw new Error(error);
      }
    };

    keyshareData()
      .then((data) => {
        setPayloadRegisterValidator(data);
        setPayloadError(false);
        nextStep();
      })
      .finally(() => {
        // what now ?
      });
  }

  function handleKeystoreDrop(data: any) {
    if (JSON.parse(data).crypto) {
      setKeystoreFileData(data);
      setKeystoreError(false);
    } else {
      alert("please upload a keystore file");
    }
  }

  const getClusterData = async (operatorIds: any) => {
    if (operatorIds && poolAddress && chain) {
      const contractAddress =
        FrensContracts[network].SSVNetworkContract.address;
      const nodeUrl = chain.rpcUrls.default.http.at(0)!;
      const clusterParams = {
        contractAddress: contractAddress,
        nodeUrl: nodeUrl,
        ownerAddress: poolAddress,
        operatorIds,
        network,
      };
      // console.log("clusterParams", clusterParams);
      const clusterDataTemp = await buildCluster(clusterParams);
      return clusterDataTemp;
    }
  };

  async function buildCluster(
    clusterParams: {
      contractAddress: string;
      nodeUrl: string;
      ownerAddress: string;
      operatorIds: number[];
      network: string;
    } | null
  ) {
    const clusterData = async () => {
      const response = await fetch("/api/clusterScanner", {
        method: "POST",
        body: JSON.stringify(clusterParams),
      });

      if (response.status === 451) {
        // Something went bad
      } else {
        return response.json();
      }
    };

    return await clusterData();
  }

  return (
    <div className="w-full flex flex-col items-start justify-start">
      <span>Your key will be split in your local browser</span>
      <DropKeys
        filename="keystore-m_xxxxxxxxxx.json"
        validateFile={(fileContent: any) => ({ success: true })}
        onFileReceived={(data: any) => {
          handleKeystoreDrop(data);
        }}
      />
      {keystoreError ? (
        <div className="text-red-600 mb-4">pls upload a keystore file</div>
      ) : (
        <></>
      )}
      <div>Keystore password:</div>
      <input
        type="password"
        onChange={(e) => setPW(e.target.value)}
        className="input input-primary w-full max-w-xs my-2"
      />
      {payloadError ? (
        <div className="text-red-600 mb-4">
          likely wrong password, try again
        </div>
      ) : (
        <></>
      )}
      <div className="mb-2">
        {loading ? (
          <button
            className="btn bg-gradient-to-r from-frens-blue to-frens-teal loading text-white"
            disabled
          >
            Verifying
          </button>
        ) : (
          <button
            className="self-end btn bg-gradient-to-r from-frens-blue to-frens-teal text-white"
            onClick={() => {
              buildRegisterPayload();
              setLoading(true);
            }}
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
};
