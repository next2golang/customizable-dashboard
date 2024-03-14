import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Transition } from '@headlessui/react';
import axios from 'axios';
import { Coin } from '../types';
import { SearchResult } from './SearchResult';

interface ModalProps {
  setModalOpen: Dispatch<SetStateAction<boolean>>;
  setWatchlist: Dispatch<SetStateAction<string[]>>;
  watchlist: string[];
}

export const WatchlistModal = ({
  setModalOpen,
  setWatchlist,
  watchlist,
}: ModalProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Coin[]>([]);
  const [coins, setCoins] = useState<Coin[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();

    const fetchData = async () => {
      setLoading(true);
      await axios
        .get("https://api.coingecko.com/api/v3/coins/markets", {
          cancelToken: source.token,
          params: {
            vs_currency: "usd",
            price_change_percentage: "24h",
            per_page: 250,
          },
        })
        .then((res) => setCoins(res.data))
        .catch((err) => {
          if (axios.isCancel(err)) {
            console.log("Fetching aborted");
          } else {
            console.log(err.message);
          }
        });

      setLoading(false);
    };

    fetchData();

    return () => source.cancel();
  }, []);

  useEffect(() => {
    if (searchQuery.length > 0 && coins.length > 0) {
      setSearchResults(
        coins.filter((c) =>
          [c.id, c.name, c.symbol].some((i) =>
            i.toLowerCase().includes(searchQuery.toLowerCase())
          )
        )
      );
    }
  }, [searchQuery, coins]);

  return (
    <div
      className="fixed inset-0 z-50 bg-black bg-opacity-70 flex flex-col justify-center overflow-x-hidden overflow-y-auto  outline-none focus:outline-none px-4"
      onClick={() => setModalOpen(false)}
    >
      <Transition.Child
        enter="transform transition-transform duration-200 ease-linear"
        enterFrom="translate-y-10"
        enterTo="translate-y-0"
        leave="transform transition-transform duration-200 ease-linear"
        leaveFrom="translate-y-0"
        leaveTo="translate-y-10"
      >
        <div
          className="relative w-full max-w-sm mx-auto rounded-sm bg-gray-700 dark:bg-dark p-4 shadow-lg"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close btn */}
          <button
            className="absolute top-0 right-0 leading-none text-sm font-bold p-3"
            onClick={() => setModalOpen(false)}
          >
            X
          </button>

          <div>
            {/* Search bar */}
            <input
              type="text"
              value={searchQuery}
              placeholder="Search coins.."
              onChange={(e) => setSearchQuery(e.target.value)}
              className="px-2 my-2 border rounded text-sm focus:outline-none
                h-7 bg-gray-100 block mx-auto text-black"
            />

            <div className="overflow-y-auto scrollbar-thin scrollbar-thumb-blue-900 scrollbar-track-gray-50 pr-2 h-48">
              {searchQuery.length > 0 &&
                searchResults.length > 0 &&
                searchResults.map((c) => (
                  <SearchResult
                    key={c.id}
                    coin={c}
                    watchlist={watchlist}
                    setWatchlist={setWatchlist}
                  />
                ))}
              {searchQuery.length > 0 && searchResults.length === 0 && (
                <p className="text-center mt-4 text-sm">No results found.</p>
              )}
              {searchQuery.length === 0 &&
                coins.map((c) => (
                  <SearchResult
                    key={c.id}
                    coin={c}
                    watchlist={watchlist}
                    setWatchlist={setWatchlist}
                  />
                ))}
              {loading && (
                <p className="text-center mt-4 text-sm">Loading...</p>
              )}
            </div>
          </div>
        </div>
      </Transition.Child>
    </div>
  );
};
