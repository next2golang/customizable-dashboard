import { Dispatch, SetStateAction } from 'react';
import { Row } from './Row';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Coin } from '../types';
import { WatchlistModal } from './WatchlistModal';
import { Transition } from '@headlessui/react';
interface WatchlistProps {
  setWatchlist: Dispatch<SetStateAction<string[]>>;
  watchlist: string[];
}

export const Watchlist = ({ setWatchlist, watchlist }: WatchlistProps) => {
  const [coins, setCoins] = useState<Coin[]>([]);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

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
            ids: watchlist.join(","),
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

    if (watchlist.length > 0) {
      fetchData();
    } else setCoins([]);

    localStorage.setItem("watchlist", JSON.stringify(watchlist));

    return () => source.cancel();
  }, [watchlist]);

  return (
    <>
      <ul className="flex flex-col overflow-y-auto scrollbar-thin scrollbar-thumb-blue-900 scrollbar-track-blue-200">
        {coins.length === 0 && loading ? (
          <span className="text-center my-10">Loading...</span>
        ) : (
          coins.map((c) => <Row key={c.id} coin={c} />)
        )}
      </ul>

      {watchlist.length === 0 && (
        <div className="flex flex-col text-center mt-4 font-semibold text-sm">
          <p>Your watchlist is empty.</p>
          <p>Click the button below to track some cryptocurrencies.</p>
        </div>
      )}

      {!loading && (
        <button
          className="bg-blue-800 mx-auto rounded py-2 px-6 uppercase text-sm font-semibold text-white mt-4"
          onClick={() => setModalOpen(true)}
        >
          add/remove
        </button>
      )}

      <Transition
        className="fixed z-10"
        show={modalOpen}
        enter="transition-opacity duration-200"
        enterFrom="opacity-10"
        enterTo="opacity-100"
        leave="transition-opacity duration-200"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <WatchlistModal
          setModalOpen={setModalOpen}
          setWatchlist={setWatchlist}
          watchlist={watchlist}
        />
      </Transition>
    </>
  );
};
