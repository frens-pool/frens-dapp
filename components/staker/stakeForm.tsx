import { useForm } from "react-hook-form";
import { ConnectButton } from '@rainbow-me/rainbowkit';

export const StakeForm = ({ poolAddress, isDepositing, setIsDepositing }) => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = data => console.log(data);

    // console.log(watch("ethInput")); // watch input value by passing the name of it

    return (
        /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <div>
                <div className="text-center font-bold my-2">Select amount</div>
                <label className="input-group flex justify-center">
                    <input 
                        {...register("ethInput")}
                        id="ethInput"
                        type="text" 
                        placeholder="0.00" 
                        className="input input-bordered w-1/3" />
                    <span>ETH</span>
                </label>
            </div>
            <div className='flex justify-center mt-2 mb-4'>
                <ConnectButton/>
            </div>
          </div>
          
          {/* <input type="submit" /> */}
        </form>
    );
}
