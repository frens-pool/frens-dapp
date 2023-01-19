import Link from "next/link";

export const RunValidator = ({ poolContract }: { poolContract: string }) => {
  const link = `https://app.frens.fun/run/${poolContract}`;

  return (
    <div className="flex flex-col justify-center">
      <div className="mt-2 text-center">
        Once your pool is full you can run the SSV-validator here:
      </div>
      <div className="my-2">
        <Link
          href={`/run/${poolContract}`}
          className="my-2 text-center underline text-teal-500"
        >
          {link}
        </Link>
      </div>
      {/* <div className="">
        <Link
          className="btn bg-gradient-to-r from-blue-500 to-teal-400 text-white"
          href={`/run/${poolContract}`}
        >
          Checkout now
        </Link>
      </div> */}
    </div>
  );
};