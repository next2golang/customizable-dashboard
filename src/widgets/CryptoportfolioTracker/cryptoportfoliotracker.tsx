import { useEffect, useState, memo } from 'react';
import { useAccount } from 'wagmi';
// import { symbol } from 'zod';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '~/components/ui/table';

interface Portfolio {
  asset: {
    logo: string;
    name: string;
    symbol: string;
  };
  price: number;
  token_balance: number;
}

// import Script from 'react-script'
// import { SymbolOverview } from 'react-tradingview-embed';
import json from './Cryptoportfoliotracker.json';
import Widget from '../../components/Widget/Widget';
import { WidgetWidth } from '../../utils/constants';
// import { PubSubEvent, useSub } from '../../hooks/usePubSub';

type Props = {
  wid: string;
  // wallet: string;
};

export default function Cryptoportfoliotracker({ wid }: Props) {
  // const [walletaddress, setWalletaddress] = useState(wallet);

  // memo: to avoid re-rendering (when moving widget)
  const CryptoPortfolio = memo(() => {
    const { address } = useAccount();

    const [portfolio, SetPortfolio] = useState<Portfolio[]>([]);
    const walletadress = address;
    // const [total]

    useEffect(() => {
      const socket = new WebSocket("wss://portfolio-api-wss-fgpupeioaa-uc.a.run.app");

      socket.addEventListener("open", () => {
        socket.send(`{
    "type": "wallet",
    "authorization": "6bed3fc7-521c-4ab6-adf1-54cdc82a7929",
    "payload":{
      "wallet": "${walletadress}",
      "interval": 15
    } 
  }`);
      });

      socket.addEventListener("message", (event) => {
        if (event.data === "Goodbye.") {
          // We're done here. Can stop loader, etc.
          return;
        }

        if (event.data === "Hello.") {
          // Start loader, etc.
          return;
        }

        if (event.data.includes("Processing")) {
          // Info msg, i.e. Processing explorer input 0xcF4548054E43eE134c78b89e612B0fd6d7fF138F
          // Nothing to do here
          return;
        }

        const messages = JSON.parse(event.data);
        // setMessages(messages);
        SetPortfolio(messages.data.assets);

      });

      // No need to close the socket, it will close automatically.

    }, [portfolio]);

    let total: number = 0;
    for (const item of portfolio) {
      total = total + item.price * item.token_balance;
    }

    return (
      <>
        <div className="mt-2 relative overflow-x-auto shadow-md sm:rounded-lg px-8">
          <h2 className="text-lg font-bold mb-4">Portfolio Value</h2>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Coin</TableHead>
                <TableHead>Logo</TableHead>
                <TableHead>Symbol</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Balance</TableHead>
                <TableHead className="text-right">Value ($)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {portfolio.map((item, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{item.asset.name}</TableCell>
                  <TableCell><img width={50} height={50} src={item.asset.logo} /></TableCell>
                  <TableCell>{item.asset.symbol}</TableCell>
                  <TableCell>{item.price}</TableCell>
                  <TableCell>{item.token_balance}</TableCell>
                  <TableCell className="text-right">{item.token_balance * item.price}</TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={5}>Total</TableCell>
                <TableCell className="text-right">${total}</TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </div>
      </>
    );
  });

  return (
    <Widget
      wid={wid}
      schema={"json.schema"}
      w={json.info.w}
      h={json.info.h}
      cn="overflow-auto"
      onSettings={({ settings }) => {
        // setWalletaddress(settings?.wallet ?? wallet); // default to symbol prop if no settings
      }}
      render={() => {
        return <CryptoPortfolio />;
      }}
    />
  );
}
