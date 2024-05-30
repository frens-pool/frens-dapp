import { useState, useEffect } from "react";

export const PoolSetupItem = ({
    itemTitle,
    itemNumber,
    children,
    itemDone
    }: {
        itemTitle: any;
        itemNumber: number;
        children: React.ReactNode;
        itemDone: Boolean;
    }) => {
    const [itemOpen,setItemOpen] = useState(false);

    useEffect(()=>{
        if(itemDone){
            setItemOpen(false);
        }
    },[itemDone]);

    return (
        <div className={itemDone?"w-full transition-all duration-150 bg-[rgba(255,255,255,0.35)] mb-[12px]":"w-full transition-all duration-150 bg-[rgba(255,255,255,1)] mb-[12px]"}>
         <div className="flex flex-row pt-5 px-7 pb-[12px]">
            <div className="flex-1 cursor-pointer" onClick={() => setItemOpen(!itemOpen)}>
                <p className="text-[10px] uppercase text-frens-purple">STEP {itemNumber}</p>
                <div className="flex flex-row items-center justify-start">
                    <img
                        className={itemOpen?"w-[6px] h-[10px] mr-2 rotate-90":"w-[6px] h-[10px] mr-2 rotate-0"}
                        src="/arrow.png"
                    />
                    <h1 className="font-extrabold text-[20px] leading-[30px]">{itemTitle}</h1>
                </div>
            </div>
            <img
                className={itemDone?"w-[17px] h-[11px] opacity-full":"w-[17px] h-[11px] opacity-25"}
                src="/checkmark.png"
            />
         </div>
            {itemOpen &&
            <div className="px-7 pb-8">
                {children}
            </div>
            }
        </div>
    );
};