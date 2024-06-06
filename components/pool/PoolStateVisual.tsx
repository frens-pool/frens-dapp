import { useState, useEffect, use } from "react";

export const PoolStateVisual = ({poolState,showDetails}:{poolState:any,showDetails:any}) => {
    const [visualStyling, setVisualStyling] = useState("cursor-pointer border-[1px] border-frens-teal mt-[4px] px-2");
    const [visualMsg, setVisualMsg] = useState("A-okay!");
    const [visualMsgIcon, setVisualMsgIcon] = useState("🤙");
    const [visualMsgStyling, setVisualMsgStyling] = useState("");

    useEffect(()=>{
        if(poolState === "accepting deposits"){
            setVisualStyling("cursor-pointer border-[1px] border-frens-very-light bg-frens-very-light mt-[4px] px-2");
            setVisualMsg("setup")
            setVisualMsgIcon("🚧")
            setVisualMsgStyling("italic text-frens-blue")
        }
    },[poolState]);

    return(
        <div className={visualStyling} onClick={showDetails}>
          <p className="text-[16px]"><span className={visualMsgStyling}>{visualMsg} </span> {visualMsgIcon}</p>
        </div>
      );
  };