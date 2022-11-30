import {
    useAccount,
} from 'wagmi'

type Props = {
    poolAddress: string
}

export const NftGallery = ({ poolAddress }: Props) => {
    const { address } = useAccount()

    return (
        <div className="w-full md:w-3/5 mt-4">
            <div className="flex flex-col items-center">
                {address}
            </div>
        </div>
    )
};