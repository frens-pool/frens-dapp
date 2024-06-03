"use client";

import { useState, useEffect } from "react";
import { useAccount, useBalance } from "wagmi";

import { SelectOperator } from "components/operator/SelectOperator";
import { SSVRegisterValidator } from "components/operator/SsvRegisterValidator";
import { SplitKeyshares } from "#/components/operator/SplitKeyshares";
import { CreateKeys } from "components/operator/CreateKeys";
import { SetPubkey } from "#/components/operator/SetPubkey";
import { usePoolPubKey } from "#/hooks/read/usePoolPubKey";
import { ssvValidatorApi } from "#/utils/externalUrls";

import { PoolSetupItem } from "./PoolSetupItem";

export const PoolSetup = ({
    poolAddress,
    chain,
    poolState,
    poolOwner,  
  }: {
    poolAddress: any;
    chain: any;
    poolState: any;
    poolOwner: any;
  }) => {

  const { isConnected, address: connectedAddress } = useAccount();
  const { data: poolPubKey } = usePoolPubKey({ address: poolAddress });
  const [ssvValidator, setssvValidator] = useState<any>();
  const [poolBalance, setPoolBalance] = useState<number>(0);
  const [pubKey, setPubKey] = useState("");
  const [operators, setOperators] = useState();
  const [payloadRegisterValidator, setPayloadRegisterValidator] = useState();
  const [poolSetupState, setPoolSetupState] = useState([
        {
            itemTitle: "Create staking keys",
            itemDone: false
        },
        {
            itemTitle: "Upload deposit file",
            itemDone: false
        },
        {
            itemTitle: "Select operators",
            itemDone: false
        },
        {
            itemTitle: "Split keyshares",
            itemDone: false
        },
        {
            itemTitle: "Register validator",
            itemDone: false
        }
  ]);
  useBalance({
    address: poolAddress,
    onSuccess(data) {
      if (setPoolBalance) setPoolBalance(+data.formatted);
    },
  });

  useEffect(() => {
    if (poolState === "staked" && poolPubKey) {
      const fetchSsvValidator = async () => {
        const response = await fetch(ssvValidatorApi(poolPubKey, chain));
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        } else {
          const data = await response.json();
          setssvValidator(data);
        }
      };
      fetchSsvValidator().catch(console.error);
    }
  }, [poolState]);


  const updatePoolSetupState = (item: any) => {
    setPoolSetupState(prevArray => {
        const newArray = [...prevArray];
        newArray[item] = {
            itemTitle: prevArray[item].itemTitle,
            itemDone: true
        };
        return newArray;
      });

  }

  const updatePubKeyState = (newValue: any) => {
    setPubKey(newValue);
  };

    return (
    <div className="w-full flex flex-col items-start justify-start bg-frens-very-light px-[8vw] pb-8">
        <p className="text-frens-blue mt-12 mb-8">Complete these steps while waiting on your frens to join your pool!</p>
        <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-x-3">
            {/* Dev purpose */}
            {/* <PoolStatus
            poolState={poolState}
            poolOwner={poolOwner}
            poolBalance={poolBalance}
            connectedAddress={connectedAddress!}
            ssvValidator={ssvValidator}
            /> */}
            {/* Run Content */}
            <div>
                <PoolSetupItem itemNumber={1} itemTitle={poolSetupState[0].itemTitle} itemDone={poolSetupState[0].itemDone}>
                    <CreateKeys
                        poolAddress={poolAddress}
                        nextStep={()=>updatePoolSetupState(0)}
                        itemDone={poolSetupState[0].itemDone}
                    />
                    
                </PoolSetupItem>
                <PoolSetupItem itemNumber={4} itemTitle={poolSetupState[3].itemTitle} itemDone={poolSetupState[3].itemDone}>
                    <SplitKeyshares
                        operatorsList={operators}
                        setPayloadRegisterValidator={
                            setPayloadRegisterValidator
                        }
                        poolAddress={poolAddress}
                        nextStep={()=>updatePoolSetupState(3)}
                        itemDone={poolSetupState[3].itemDone}
                        itemEnabled={poolSetupState[2].itemDone}
                    />
                </PoolSetupItem>
            </div>

            <div>
                <PoolSetupItem itemNumber={2} itemTitle={poolSetupState[1].itemTitle} itemDone={poolSetupState[1].itemDone}>
                    <SetPubkey
                    poolAddress={poolAddress}
                    updatePubKeyState={updatePubKeyState}
                    />
                </PoolSetupItem>
                <PoolSetupItem itemNumber={5} itemTitle={poolSetupState[4].itemTitle} itemDone={poolSetupState[4].itemDone}>
                    <SSVRegisterValidator
                    poolAddress={poolAddress}
                    operators={operators}
                    payloadData={payloadRegisterValidator}
                    itemEnabled={poolSetupState[3].itemDone}
                    />
                </PoolSetupItem>
            </div>
            <div>
                <PoolSetupItem itemNumber={3} itemTitle={poolSetupState[2].itemTitle} itemDone={poolSetupState[2].itemDone}>
                    <SelectOperator
                    setOperators={setOperators}
                    nextStep={()=>updatePoolSetupState(2)}
                    />
                </PoolSetupItem>
            </div>


        </div>
    </div>
    );
};
