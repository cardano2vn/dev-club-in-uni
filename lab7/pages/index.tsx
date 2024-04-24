import { useState } from "react";
import type { NextPage } from "next";
import { useWallet } from '@meshsdk/react';
import { CardanoWallet } from '@meshsdk/react';
//import { script, scriptAddr } from "../config/contract";
import { Transaction, Data, BlockfrostProvider, resolveDataHash } from '@meshsdk/core';
import { resolvePlutusScriptAddress } from '@meshsdk/core';
import type { PlutusScript } from '@meshsdk/core';

const Home: NextPage = () => {
  const { connected, wallet } = useWallet();
  const [assets, setAssets] = useState<null | any>(null);
  const [loading, setLoading] = useState<boolean>(false);

  
  const script: PlutusScript = {
    code: '4e4d01000033222220051200120011',
    version: 'V1',
  };
  const scriptAddr = resolvePlutusScriptAddress(script, 0);

  async function getAssets() {
    if (wallet) {
      setLoading(true);
      const _assets = await wallet.getAssets();
      setAssets(_assets);
      setLoading(false);
    }
  }

  async function lockFunds() {
    if (wallet) {
      const addr = (await wallet.getUsedAddresses())[0];
      const d: Data = {
        alternative: 0,
        fields: [42],
      };
      const tx = new Transaction({ initiator: wallet })
        .sendAssets(
          {
            address: scriptAddr,
            datum: {
              value: d,
            },
          },
          // '12000000'
          [
            {
              unit: "e16c2dc8ae937e8d3790c7fd7168d7b994621ba14ca11415f39fed724d494e",
              quantity: "12",
            },
          ],
        );
      const unsignedTx = await tx.build();
      const signedTx = await wallet.signTx(unsignedTx);
      const txHash = await wallet.submitTx(signedTx);
      console.log(txHash)
    }
  };
  

  async function _getAssetUtxo({scriptAddress, asset, datum}) {
    const blockfrostProvider = new BlockfrostProvider(
      'preprod.....',
    );
    const utxos = await blockfrostProvider.fetchAddressUTxOs(
      scriptAddress,
      asset
    );
    const dataHash = resolveDataHash(datum);
    let utxo = utxos.find((utxo: any) => {
      return utxo.output.dataHash == dataHash;
    });
    return utxo;
  };
  

  async function unlockFunds() {
    if (wallet) {
      setLoading(true);
      const addr = (await wallet.getUsedAddresses())[0];
      const datumConstr: Data = {
        alternative: 0,
        fields: [42],
      };
      const redeemer = {
        data: {
          alternative: 0,
          fields: [21],
        },
      };
      
      const assetUtxo = await _getAssetUtxo({
        scriptAddress: scriptAddr, 
        asset: 'e16c2dc8ae937e8d3790c7fd7168d7b994621ba14ca11415f39fed724d494e',
        datum: datumConstr,
      });
  
      const tx = new Transaction({ initiator: wallet })
        .redeemValue({
          value: assetUtxo,
          script: script,
          datum: datumConstr,
          redeemer: redeemer,
        })
        .sendValue({ address: addr }, assetUtxo)
        .setRequiredSigners([addr]);
      
      const unsignedTx = await tx.build();
      const signedTx = await wallet.signTx(unsignedTx, true);
      const txHash = await wallet.submitTx(signedTx);
      setLoading(false);
    }
  };
  
  

  return (
    <div>
      <h1>Connect Wallet</h1>
      <CardanoWallet />
      {connected && (
        <>
          <h1>Get Wallet Assets</h1>
          {assets ? (
            <pre>
              <code className="language-js">
                {JSON.stringify(assets, null, 2)}
              </code>
            </pre>
          ) : (
            <button
              type="button"
              onClick={() => lockFunds()}
              disabled={loading}
              style={{
                margin: "8px",
                backgroundColor: loading ? "orange" : "grey",
              }}
            >
              Get Wallet Assets
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default Home;

