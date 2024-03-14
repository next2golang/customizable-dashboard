import { useEffect, useState, memo } from 'react';

// import Script from 'react-script'
// import { SymbolOverview } from 'react-tradingview-embed';
import json from './Cryptopriceticker.json';
import Widget from '../../components/Widget/Widget';
import { Header } from "./components/Header";

import { TableHeader } from "./components/TableHeader";
import { TopCoins } from "./components/TopCoins";
import { Watchlist } from "./components/Watchlist";
type Props = {
  wid: string;
  // wallet: string;
};

export default function Cryptopriceticker({ wid }: Props) {

  const CryptoTicker = memo(() => {
    const [table, setTable] = useState(localStorage.getItem("table") || "top");

    const [watchlist, setWatchlist] = useState(
      JSON.parse(localStorage.getItem("watchlist") || "[]")
    );

    return (
      <div className="h-screen max-h-screen container max-w-6xl overflow-hidden flex flex-col sm:px-4">
        <span className="text-center text-[2px]"> Crypto Price </span>
        <div className="bg-white dark:bg-gray-900 rounded  p-2 sm:p-4 md:p-4 pt-4 overflow-hidden flex flex-col h-full">
          <Header setTable={setTable} table={table} />
          <main className="overflow-hidden flex flex-col">
            <TableHeader />
            {table === "top" ? (
              <TopCoins />
            ) : (
              <Watchlist watchlist={watchlist} setWatchlist={setWatchlist} />
            )}
          </main>
        </div>
      </div>
    );
  });

  return (
    <Widget
      wid={wid}
      schema={""}
      w={json.info.w}
      h={json.info.h}
      cn=""
      onSettings={({ settings }) => {
        // setWalletaddress(settings?.wallet ?? wallet); // default to symbol prop if no settings
      }}
      render={() => {
        return <CryptoTicker />;
      }}
    />
  );
}
