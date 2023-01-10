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
  const [payloadError, setPayloadError] = useState(false);
  const [keystoreFileData, setKeystoreFileData] = useState();

  function buildRegisterPayload() {
    const keyshareData = async () => {
      const response = await fetch("/api/keyshares", {
        method: "POST",
        body: JSON.stringify({ keystore: keystoreFileData, password: pw }),
      });
      if (response.status === 451) {
        setPayloadError(true);
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
        <div>Keystore password:</div>
        <input
          type="text"
          onChange={(e) => setPW(e.target.value)}
          className="input input-primary w-full max-w-xs my-2"
        />
        {payloadError ? (
          <div className="text-red-600">likely wrong password, try again</div>
        ) : (
          <></>
        )}
        <button
          className="btn bg-gradient-to-r from-pink-500 to-violet-500 text-white"
          onClick={() => {
            buildRegisterPayload();
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
};
