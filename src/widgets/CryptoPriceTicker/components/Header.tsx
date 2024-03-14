import { Dispatch, SetStateAction } from "react";

interface HeaderProps {
  setTable: Dispatch<SetStateAction<string>>;
  table: string;
}

export const Header = ({ setTable, table }: HeaderProps) => {
  const handleClick = (table: string) => {
    setTable(table);
    localStorage.setItem("table", table);
  };
  return (
    <header className="flex justify-center mb-4">
      <div className="flex gap-0.5 justify-center bg-blue-900 p-2 rounded font-semibold">
        <button
          className={`py-1 px-4 rounded ${table === "top" ? "bg-gray-900 shadow-sm" : "bg-transparent text-white"
            }`}
          onClick={() => handleClick("top")}
        >
          Top 100
        </button>
        <button
          className={`py-1 px-4 rounded ${table === "watchlist"
            ? "bg-gray-900 shadow-sm"
            : "bg-transparent text-white"
            }`}
          onClick={() => handleClick("watchlist")}
        >
          Watchlist
        </button>
      </div>
    </header>
  );
};
