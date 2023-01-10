import { useState } from "react";
import { DropKeys } from "components/operator/DropKeys";

export const KeystoreForm = ({
  setStep,
  setPayloadRegisterValidator,
}: {
  setStep: any;
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
        body: JSON.stringify({ keystore: keystoreFileData, password: pw }),
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
        setStep(5);
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
      <div className="my-2 p-2 border border-slate-700 rounded-md">
        <div>upload the keystore file here</div>
        <DropKeys
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
            className="btn bg-gradient-to-r from-pink-500 to-violet-500 text-white"
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
