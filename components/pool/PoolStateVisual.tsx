import { useState, useEffect, use } from "react";

export const PoolStateVisual = ({poolState}:{poolState:any}) => {
    const [visualStyling, setVisualStyling] = useState("cursor-pointer border-[1px] border-frens-teal mt-[4px] px-2");
    const [visualMsg, setVisualMsg] = useState("A-okay! 🤙");

    useEffect(()=>{
        if(poolState === "accepting deposits"){
            setVisualStyling("cursor-pointer border-[1px] border-frens-very-light bg-frens-very-light mt-[4px] px-2");
            setVisualMsg("setup 🚧")
        }
    },[poolState]);

    return(
        <div className={visualStyling} onClick={()=>{}}>
          <p className="text-[16px]">{visualMsg}</p>
        </div>
      );
  };