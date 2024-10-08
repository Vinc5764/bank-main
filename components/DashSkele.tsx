const CurrentTariffsSkeleton = () => {
  return (
    <div className="grid grid-cols-4 col-span-12 gap-6 animate-pulse">
      {[1, 3, 4, 5].map((e, i) => {
        return (
          <div
            className="bg-slate-100 row-span-6 rounded-md h-[160px]"
            key={i}
          ></div>
        );
      })}
    </div>
  );
};

export default CurrentTariffsSkeleton;
