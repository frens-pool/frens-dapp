import Link from "next/link";

export const RunValidator = ({ poolContract }: { poolContract: string }) => {
  const link = `https://app.frens.fun/run/${poolContract}`;

  return (
    <div className="flex flex-col justify-center">
      <div className="my-2 text-center underline text-frens-main">
        <Link
          href={`/run/${poolContract}`}
          className="my-2 text-center underline text-frens-main"
        >
          {link}
        </Link>
      </div>
    </div>
  );
};
