import { Coin } from "../types";

interface RowProps {
  coin: Coin;
}

export const Row = ({ coin }: RowProps) => {
  const formatPrice = (price: number): string => {
    let formattedPrice;
    const arr = price.toString().split(".");
    if (arr.length > 1)
      formattedPrice = `${Number(arr[0]).toLocaleString()}.${arr[1]}`;
    else formattedPrice = Number(arr[0]).toLocaleString();

    return formattedPrice;
  };

  return (
    <li className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 place-items-center p-3 border-b font-semibold hover:bg-gray-700 text-sm sm:text-base relative group">
      <div className="flex w-full gap-8 items-center">
        <span className="w-8 text-center text-sm font-semibold hidden sm:block text-white">
          {coin.market_cap_rank}
        </span>
        <div className="w-full flex gap-3 items-center">
          <img
            src={coin.image}
            alt={coin.name}
            className="w-5 object-contain"
          />
          <span className="uppercase font-semibold text-white">{coin.symbol}</span>
        </div>
      </div>
      <div className="font-semibold text-white">${formatPrice(coin.current_price)}</div>
      <div
        className={`font-semibold ${coin.price_change_percentage_24h >= 0
          ? "text-green-600"
          : "text-red-600"
          }`}
      >
        {coin.price_change_percentage_24h > 0 && "+"}
        {coin.price_change_percentage_24h.toFixed(2)}%
      </div>
      <div className="hidden sm:block text-white text-sm">
        ${coin.total_volume.toLocaleString()}
      </div>
      <div className="hidden md:block text-white text-sm">${coin.market_cap.toLocaleString()}</div>
    </li>
  );
};
