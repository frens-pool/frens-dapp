import { useState } from "react";
import { DropKeys } from "components/operator/DropKeys";

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
  const [keystoreFileData, setKeystoreFileData] = useState();

  function buildRegisterPayload() {
    const keyshareData = async () => {
      if (!keystoreFileData) {
        setKeystoreError(true);
      }
      const response = await fetch("/api/keyshares", {
        method: "POST",
        body: JSON.stringify({
          keystore: keystoreFileData,
          password: pw,
          operators: operators,
        }),
      });
      if (response.status === 451) {
        setPayloadError(true);
        setLoading(false);
      }
      return response.json();
    };
    keyshareData().then((data) => {
      if (data.ssvData) {
        setPayloadRegisterValidator(data.ssvData);
        setPayloadError(false);
        nextStep();
      }
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
          type="text"
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
