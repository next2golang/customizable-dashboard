import { Coin } from "../types";
import { useState, Dispatch, SetStateAction } from "react";
import { Switch } from "@headlessui/react";

interface SearchResultProps {
  coin: Coin;
  watchlist: string[];
  setWatchlist: Dispatch<SetStateAction<string[]>>;
}

export const SearchResult = ({
  coin,
  watchlist,
  setWatchlist,
}: SearchResultProps) => {
  const [isSelected, setIsSelected] = useState<boolean>(
    watchlist.includes(coin.id)
  );

  const toggle = () => {
    if (watchlist.includes(coin.id)) {
      setWatchlist((prevWatchlist) =>
        prevWatchlist.filter((c) => c !== coin.id)
      );
      setIsSelected(false);
    } else {
      setWatchlist((prevWatchlist) => [...prevWatchlist, coin.id]);
      setIsSelected(true);
    }
  };

  return (
    <div
      className={`py-1 px-2 border-b flex items-center overflow-hidden transition ease-in-out duration-200 ${isSelected ? "bg-gray-700 border-blue-200" : "bg-gray-700"
        }`}
    >
      <div className="w-full flex gap-3 items-center ">
        <img src={coin.image} alt={coin.name} className="w-5 object-contain" />
        <span>
          <span className="uppercase font-semibold text-sm">{coin.symbol}</span>
          <span className="uppercase font-semibold text-xxs ml-2 truncate">
            {coin.name}
          </span>
        </span>
      </div>

      <Switch
        checked={isSelected}
        onChange={toggle}
        className={`${isSelected ? "bg-blue-600" : "bg-gray-500"
          } relative inline-flex h-5 w-11 items-center shrink-0 rounded-full`}
      >
        <span className="sr-only">{coin.name}</span>
        <span
          className={`${isSelected ? "translate-x-6" : "translate-x-1"
            } inline-block h-4 w-4 transform rounded-full bg-white transition ease-in-out duration-200`}
        />
      </Switch>
    </div>
  );
};
