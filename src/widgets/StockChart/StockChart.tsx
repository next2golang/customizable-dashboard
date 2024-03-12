import { memo, useState } from 'react';
// import Script from 'react-script'
// import { SymbolOverview } from 'react-tradingview-embed';
import json from './StockChart.json';
import Widget from '../../components/Widget/Widget';
import { WidgetWidth } from '../../utils/constants';
import { PubSubEvent, useSub } from '../../hooks/usePubSub';
import { hToPx } from '../../utils/appUtils';

type Props = {
  wid: string;
  symbol: string;
};

export default function StockChart({ wid, symbol }: Props) {
  const [currentSymbol, setCurrentSymbol] = useState(symbol);
  const [theme, setTheme] = useState(localStorage.getItem('nightwind-mode') ?? 'dark');
  useSub(PubSubEvent.ThemeChange, () => {
    setTheme(localStorage.getItem('nightwind-mode') ?? 'dark');
  });

  // memo: to avoid re-rendering (when moving widget)
  const Chart = memo(() => {
    return (
      <>
        <div id={wid + '-container'}></div>
      </>
    );
  });

  return (
    <></>
  );
}
