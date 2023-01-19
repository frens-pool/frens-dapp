import { useState, useEffect } from "react";
import { useEventCreate } from "../../hooks/read/useEventCreate";
import { useStake } from "../../hooks/write/useStake";

const INVITATION_TOKEN_LENGTH = 9;

export const Deposit = ({
  poolAddress,
  depositFileData,
}: {
  poolAddress: string;
  depositFileData: any;
}) => {
  const { data, write: stake } = useStake({ poolAddress, depositFileData });

  // console.log(depositdata);
  // useEventCreate();

  // console.log(frenSsvOperatorIDs)

  return (
    <div>
      <button
        className="btn bg-gradient-to-r from-blue-500 to-teal-400 mb-2"
        onClick={() => {
          if (stake) stake();
        }}
      >
        Deposit ETH to Beacon chain
      </button>
    </div>
  );
};
