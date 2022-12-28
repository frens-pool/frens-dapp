import { useAllowance } from '../../hooks/write/useAllowance';

export const SSVRegisterValidator = ({ keystoredata }: { keystoredata: any }) => {
    const { data: data2, isLoading: isLoading2, isSuccess: isSuccess2, write: allow } = useAllowance({
        spender: "",
        value: ""
    });

    return (
        <>
            <button className="btn btn-primary my-2 mr-2" disabled={!allow} onClick={() => allow?.()}>
                Allow spending SSV
            </button>
            <a className="btn btn-primary" href="https://app.ssv.network/join/validator/enter-key">
                Register SSV validator
            </a>
        </>
    );
};
