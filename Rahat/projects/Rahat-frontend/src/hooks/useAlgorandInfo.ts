import { useState, useEffect } from "react";
import algosdk from "algosdk";

const indexerToken = import.meta.env.VITE_INDEXER_TOKEN;
const indexerServer = import.meta.env.VITE_INDEXER_SERVER || "https://testnet-idx.algonode.cloud";
const indexerPort = import.meta.env.VITE_INDEXER_PORT;

const indexerClient = new algosdk.Indexer(indexerToken, indexerServer, indexerPort);

export const useAlgorandAccountInfo = (address: string) => {
  const [accountInfo, setAccountInfo] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAccountInfo = async () => {
      try {
        if (!algosdk.isValidAddress(address)) {
          setError("Invalid Algorand address");
          setLoading(false);
          return;
        }

        const response = await indexerClient.lookupAccountByID(address).do();
        setAccountInfo(response.account);
      } catch (err: any) {
        setError(`Error fetching account info: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchAccountInfo();
  }, [address]);

  return { accountInfo, loading, error };
};

export const useAlgorandAssetInfo = (assetId: number) => {
  const [assetInfo, setAssetInfo] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAssetInfo = async () => {
      try {
        if (typeof assetId !== "number" || assetId <= 0) {
          setError("Invalid asset ID");
          setLoading(false);
          return;
        }

        const response = await indexerClient.lookupAssetTransactions(671526136).do();
        setAssetInfo(response);
      } catch (err: any) {
        setError(`Error fetching asset info: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchAssetInfo();
  }, [assetId]);

  return { assetInfo, loading, error };
};
