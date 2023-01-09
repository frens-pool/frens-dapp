type CardProps = {
    name: String;
    image: any;
};

function CardForNFT({ name, image }: CardProps) {
    return (
        <div className="border-solid border-2 w-60 rounded-xl border-slate-500">
            <img 
                src={image} 
                className="w-full rounded-xl" 
                alt=""
            />
            <div className="px-2">
                <div>{name}</div>
            </div>
            
        </div>
    )
}

export default CardForNFT;