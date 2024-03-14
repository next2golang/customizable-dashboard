import { Row } from "./Row";
import { useEffect, useState } from "react";
import axios from "axios";
import { apiGet } from '~/utils/apiUtils';
import _ from 'lodash';

import { Coin } from "../types";

export const TopCoins = () => {
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
            price_change_percentage: "30s",
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

    console.log('^^^^^^^^^^^^^^^^^^')
    return () => source.cancel();
  }, []);

  return (
    <ul className="flex flex-col overflow-y-auto scrollbar-thin scrollbar-thumb-blue-900 scrollbar-track-blue-200">
      {coins.length === 0 && loading ? (
        <span className="text-center my-10">Loading...</span>
      ) : (
        coins.map((c) => <Row key={c.id} coin={c} />)
      )}
    </ul>
  );
};
