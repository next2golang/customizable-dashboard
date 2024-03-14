export const TableHeader = () => {
  return (
    <ul className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 place-items-center dark:bg-blue-900 dark:text-white border p-1.5 sm:p-3 rounded-t font-semibold text-sm sm:text-base">
      <li className="flex gap-8 w-full">
        <span className="hidden sm:block">Rank</span>
        <span className="w-full ">Coin</span>
      </li>
      <li>Price</li>
      <li>Change {"(24h)"}</li>
      <li className="hidden sm:block">Volume {"(24h)"}</li>
      <li className="hidden md:block">Market Cap</li>
    </ul>
  );
};
