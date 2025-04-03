import { useState, useEffect } from "react";
import { DropKeys } from "components/operator/DropKeys";
import { ISharesKeyPairs, SSVKeys, KeyShares, KeySharesItem } from "ssv-keys";
import BigNumber from "bignumber.js";
import { useAccount, useNetwork, usePublicClient, Address } from "wagmi";

import { FrensContracts } from "#/utils/contracts";
import { useNetworkName } from "#/hooks/useNetworkName";
import { useClusterScanner } from "#/hooks/read/useClusterScanner";

export const SplitKeyshares = ({
  operatorsList,
  nextStep,
  setPayloadRegisterValidator,
  poolAddress,
  itemDone,
  itemEnabled,
}: {
  operatorsList: any;
  nextStep?: () => void;
  setPayloadRegisterValidator: any;
  poolAddress: Address;
  itemDone?: Boolean;
  itemEnabled?: Boolean;
}) => {
  const [pw, setPW] = useState("");
  const [loading, setLoading] = useState(false);
  const [payloadError, setPayloadError] = useState(false);
  const [keystoreError, setKeystoreError] = useState(false);
  const [keystoreFileData, setKeystoreFileData] = useState<string>("");
  const network = useNetworkName();
  const { chain } = useNetwork();
  const [worker, setWorker] = useState<Worker | null>(null);

  useEffect(() => {
    console.log(`loading webworker...`)
    const w = new Worker(new URL('../../workers/keyshares.worker.ts', import.meta.url));
    setWorker(w);
    
    return () => {
      console.log(`unloading webworker...`)
      w.terminate();
    };
  }, []);

  function buildRegisterPayload() {
    if (!worker) return;

    worker.onmessage = (e) => {
      console.log(`result received from worker!`,e.data.data)
      if (e.data.success) {
        setPayloadRegisterValidator(e.data.data);
        setPayloadError(false);
        setLoading(false);
        nextStep && nextStep();
      } else {
        setPayloadError(true);
        setLoading(false);
      }
    };

    worker.postMessage({
      operatorsList,
      keystoreFileData,
      pw,
      poolAddress
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

  return (
    <>
      {itemEnabled ? (
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
            autoComplete="off"
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
                  setLoading(true);
                  buildRegisterPayload();
                }}
              >
                Next
              </button>
            )}
          </div>
        </div>
      ) : (
        <div>
          <p className="font-extrabold mb-5">
            Please complete &apos;Step 3: Select operators&apos; to enable this
            step.
          </p>
          <div className="w-full opacity-25 flex flex-col items-start justify-start">
            <span>Your key will be split in your local browser</span>
            <DropKeys
              filename="keystore-m_xxxxxxxxxx.json"
              validateFile={(fileContent: any) => ({ success: true })}
              onFileReceived={(data: any) => {
                handleKeystoreDrop(data);
              }}
            />
            {keystoreError ? (
              <div className="text-red-600 mb-4">
                pls upload a keystore file
              </div>
            ) : (
              <></>
            )}
            <div>Keystore password:</div>
            <input
              type="password"
              autoComplete="off"
              onChange={(e) => setPW(e.target.value)}
              className="input input-primary w-full max-w-xs my-2"
              disabled
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
        </div>
      )}
    </>
  );
};
