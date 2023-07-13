import { useEffect, useState } from "react";
import { DropKeys } from "components/operator/DropKeys";
import { SSVKeys, ISharesKeyPairs } from 'ssv-keys';
import BigNumber from 'bignumber.js';
import { useNetwork, useWaitForTransaction } from "wagmi";
import { useWalletClient } from 'wagmi'
import { goerli, mainnet} from "@wagmi/chains"
import { FrensContracts } from "#/utils/contracts";
import { useNetworkName } from "#/hooks/useNetworkName";

export const KeystoreForm = ({
  operators,
  nextStep,
  setPayloadRegisterValidator,
}: {
  operators: any;
  nextStep: () => void;
  setPayloadRegisterValidator: any;
}) => {
  const [pw, setPW] = useState("");
  const [loading, setLoading] = useState(false);
  const [payloadError, setPayloadError] = useState(false);
  const [keystoreError, setKeystoreError] = useState(false);
  const [keystoreFileData, setKeystoreFileData] = useState<string>("");
  const network = useNetworkName();
  const { data: walletClient } = useWalletClient()
  // Initialize SSVKeys SDK
  const ssvKeys = new SSVKeys();
  // const keyShares = new KeyShares();

  function buildRegisterPayload() {

    const keyshareData = async () => {
      try {

        if (!keystoreFileData) {
          setKeystoreError(true);
        }

        const operators_keygen = operators.map((operator: any) => ({
          id: operator.id,
          publicKey: operator.public_key,
        }));

        const { publicKey, privateKey } = await ssvKeys.extractKeys(keystoreFileData, pw);

        // const operators: [] = [{ publicKey, id }];
        const threshold: ISharesKeyPairs = await ssvKeys.createThreshold(privateKey, operators_keygen);
        const shares = await ssvKeys.encryptShares(operators_keygen, threshold.shares);

        const d = await getClusterData(operators_keygen.map((o: any) => o.id));

        const ownerAddress = d.cluster[0].Owner;
        const ownerNonce = parseInt(d.cluster[1].index);

        const payload = await ssvKeys.buildPayload({
          publicKey,
          operators,
          shares
        }, {
          ownerAddress,
          ownerNonce,
          privateKey
        });

        // const encryptedShares = await ssvKeys.buildShares(privateKey, operators_keygen);



        // const payload = await keyShares.buildPayload({
        //   publicKey,
        //   operators: operators_keygen,
        //   encryptedShares,
        // },
        //   {
        //     ownerAddress,
        //     ownerNonce,
        //     privateKey,
        //   });

        console.dir(payload);


        // TODO : what is this arbitrary number ?
        const tokenAmount = (new BigNumber(20000000000000000000)).toString();

        // const operatorFees = operators.map((operator: any) => {
        //   return operator.fee;
        // });
        // const sumOfFees: number = operatorFees.reduceRight(
        //   (acc: number, cur: number) => Number(acc) + Number(cur),
        //   0
        // );

        return {
          // publicKey,
          // privateKey,
          // encryptedShares,
          payload,
          tokenAmount,
        };

      } catch (e) {
        setPayloadError(true);
        setLoading(false);
      }

    };

    keyshareData().then((data) => {
      // if (data.publicKey) {
      setPayloadRegisterValidator(data);
      setPayloadError(false);
      nextStep();
      // }
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
    const [address] = await walletClient.getAddresses();

    if (operatorIds) {
      const contractAddress = FrensContracts[network].SSVNetworkContract.address;
      const clusterParams = {
        contractAddress: contractAddress,
        nodeUrl: "https://goerli.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
        ownerAddress: address,
        operatorIds,
      };
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
    <div className="">
      <div className="my-2 p-2">
        <DropKeys
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
        {loading ? (
          <button className="btn loading text-white" disabled>
            Verifying
          </button>
        ) : (
          <button
            className="btn bg-gradient-to-r from-frens-blue to-frens-teal text-white"
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
