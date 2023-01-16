export const CurrentPoolShares = ({ shareIds }: { shareIds: string[] }) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {shareIds.map((shareId) => (
          <div key={shareId}>
            <div className="border-solid border-2 w-60 rounded-xl border-slate-500">
              <div className="px-2">
                <div>{shareId}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
