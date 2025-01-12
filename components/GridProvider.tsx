"use client";

import { createClientUPProvider } from "@lukso/up-provider";
import { createWalletClient, custom } from "viem";
import { luksoTestnet } from "viem/chains";
import { createContext, useContext, useEffect, useState, ReactNode } from "react";

interface GridProviderContext {
  provider: any;
  client: any;
  chainId: number;
  accounts: Array<`0x${string}`>;
  contextAccounts: Array<`0x${string}`>;
  walletConnected: boolean;
  selectedAddress: `0x${string}` | null;
  setSelectedAddress: (address: `0x${string}` | null) => void;
  isSearching: boolean;
  setIsSearching: (isSearching: boolean) => void;
}

const GridContext = createContext<GridProviderContext | undefined>(undefined);

export function useGrid() {
  const context = useContext(GridContext);
  if (!context) {
    throw new Error("useGrid must be used within a GridProvider");
  }
  return context;
}

interface GridProviderProps {
  children: ReactNode;
}

export function GridProvider({ children }: GridProviderProps) {
  const [provider] = useState(() =>
    typeof window !== "undefined" ? createClientUPProvider() : null
  );
  const [client] = useState(() =>
    typeof window !== "undefined" && provider
      ? createWalletClient({
          chain: luksoTestnet,
          transport: custom(provider),
        })
      : null
  );

  const [chainId, setChainId] = useState<number>(0);
  const [accounts, setAccounts] = useState<Array<`0x${string}`>>([]);
  const [contextAccounts, setContextAccounts] = useState<Array<`0x${string}`>>([]);
  const [walletConnected, setWalletConnected] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState<`0x${string}` | null>(null);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    let mounted = true;

    async function init() {
      try {
        if (!client || !provider) return;

        const _chainId = (await client.getChainId()) as number;
        if (!mounted) return;
        setChainId(_chainId);

        const _accounts = (await client.getAddresses()) as Array<`0x${string}`>;
        if (!mounted) return;
        setAccounts(_accounts);

        const _contextAccounts = provider.contextAccounts;
        if (!mounted) return;
        setContextAccounts(_contextAccounts);
        setWalletConnected(_accounts.length > 0 && _contextAccounts.length > 0);
      } catch (error) {
        console.error(error);
      }
    }

    init();

    if (provider) {
      const accountsChanged = (_accounts: Array<`0x${string}`>) => {
        setAccounts(_accounts);
        setWalletConnected(_accounts.length > 0 && contextAccounts.length > 0);
      };

      const contextAccountsChanged = (_accounts: Array<`0x${string}`>) => {
        setContextAccounts(_accounts);
        setWalletConnected(accounts.length > 0 && _accounts.length > 0);
      };

      const chainChanged = (_chainId: number) => {
        setChainId(_chainId);
      };

      provider.on("accountsChanged", accountsChanged);
      provider.on("chainChanged", chainChanged);
      provider.on("contextAccountsChanged", contextAccountsChanged);

      return () => {
        mounted = false;
        provider.removeListener("accountsChanged", accountsChanged);
        provider.removeListener("contextAccountsChanged", contextAccountsChanged);
        provider.removeListener("chainChanged", chainChanged);
      };
    }
  }, [client, provider, accounts.length, contextAccounts.length]);

  return (
    <GridContext.Provider
      value={{
        provider,
        client,
        chainId,
        accounts,
        contextAccounts,
        walletConnected,
        selectedAddress,
        setSelectedAddress,
        isSearching,
        setIsSearching,
      }}
    >
      <div className="min-h-screen w-full bg-gradient-to-b from-black to-gray-900">
        <div className="relative min-h-screen w-full max-w-screen-xl mx-auto p-6 flex flex-col items-center justify-center">
          <div className="relative z-10 w-full max-w-sm">
            {children}
          </div>
        </div>
      </div>
    </GridContext.Provider>
  );
} 