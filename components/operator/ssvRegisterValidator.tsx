import { useState, useEffect } from "react";
import { ISharesKeyPairs, SSVKeys } from "ssv-keys";
import { useAllowance } from "../../hooks/write/useAllowance";

export const SSVRegisterValidator = ({ payloadData }: { payloadData: any }) => {
  const {
    data: data2,
    isLoading: isLoading2,
    isSuccess: isSuccess2,
    write: allow,
  } = useAllowance({
    spender: "",
    value: "",
  });

  const registerValiSSV = () => {};

  return (
    <>
      <button
        className="btn btn-primary my-2 mr-2"
        disabled={!allow}
        onClick={() => allow?.()}
      >
        Allow spending SSV
      </button>
      <button
        className="btn btn-primary my-2 mr-2"
        onClick={() => registerValiSSV()}
      >
        Register SSV validator
      </button>
      {/* <a
        className="btn btn-primary"
        href="https://app.ssv.network/join/validator/enter-key"
      >
        Register SSV validator
      </a> */}
    </>
  );
};
