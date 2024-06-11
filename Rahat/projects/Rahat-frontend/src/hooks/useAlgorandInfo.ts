import { useState, useEffect } from "react";
import algosdk from "algosdk";

// Initialize the Indexer Client
const indexerToken = import.meta.env.VITE_INDEXER_TOKEN;
const indexerServer = import.meta.env.VITE_INDEXER_SERVER || "https://testnet-idx.algonode.cloud";
const indexerPort = import.meta.env.VITE_INDEXER_PORT;

const indexerClient = new algosdk.Indexer(indexerToken, indexerServer, indexerPort);

// Hook to fetch and format recent transactions for a specific contract App ID
export const useAlgorandContractTransactions = (contractAppId: number) => {
  const [transactions, setTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        if (typeof contractAppId !== "number" || contractAppId <= 0) {
          setError("Invalid contract App ID");
          setLoading(false);
          return;
        }

        // Search for recent transactions involving the specified contract App ID
        const response = await indexerClient.searchForTransactions().txType("appl").applicationID(contractAppId).limit(5).do();

        // Get the current date
        const currentDate = new Date().toISOString().split("T")[0];

        console.log(response?.transactions);

        // Format the transactions
        const formattedTransactions = [
          {
            date: "Recent Application Transactions",
            dateTime: currentDate,
            transactions: response.transactions.map((txn: any, index: any) => {
              const amount = txn["payment-transaction"] ? txn["payment-transaction"].amount : 0;
              const tax = txn?.fee / 1000000;
              return {
                id: index + 1,
                invoiceNumber: txn.id,
                href: `#${txn.id}`,
                amount: `${amount} Algos`,
                tax: `${tax} Algos`,
                status: txn["confirmed-round"] ? "Confirmed" : "Pending",
                client: txn.sender,
                description: "Application Call Transaction",
                icon: txn.sender === contractAppId ? "ArrowDownCircleIcon" : "ArrowUpCircleIcon",
              };
            }),
          },
        ];

        setTransactions(formattedTransactions);
      } catch (err: any) {
        setError(`Error fetching contract transactions: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [contractAppId]);

  return { transactions, loading, error };
};
