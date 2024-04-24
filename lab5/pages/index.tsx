import { useState } from "react";
import type { NextPage } from "next";
import { useWallet } from "@meshsdk/react";
import { CardanoWallet } from "@meshsdk/react";
import type { Asset } from '@meshsdk/core';
import { Transaction, ForgeScript } from '@meshsdk/core';
import type { Mint, AssetMetadata } from '@meshsdk/core';

const Home: NextPage = () => {
  const { connected, wallet } = useWallet();
  const [assets, setAssets] = useState<null | any>(null);
  const [loading, setLoading] = useState<boolean>(false);

  async function getAssets() {
    if (wallet) {
      setLoading(true);
      const _assets = await wallet.getAssets();
      setAssets(_assets);
      setLoading(false);
    }
  }

  async function sendADA() {

    const tx = new Transaction({ initiator: wallet })
      .sendLovelace(
        'addr_test1qq9mrj6gxeny2cl99thrd6wvv3vr8n3tvtxa78jgdxegjp3p4neh4ew5j446xthascrs6t6k3x48jqum62yq06gf8wkslw2scz',
        '1500000'
      )
    ;
    
    const unsignedTx = await tx.build();
    const signedTx = await wallet.signTx(unsignedTx);
    const txHash = await wallet.submitTx(signedTx);
    
 }


  async function sendAsset() {

    const tx = new Transaction({ initiator: wallet })
      .sendLovelace(
        'addr_test1qq9mrj6gxeny2cl99thrd6wvv3vr8n3tvtxa78jgdxegjp3p4neh4ew5j446xthascrs6t6k3x48jqum62yq06gf8wkslw2scz',
        '1000000'
      )
      .sendAssets(
        'addr_test1qq9mrj6gxeny2cl99thrd6wvv3vr8n3tvtxa78jgdxegjp3p4neh4ew5j446xthascrs6t6k3x48jqum62yq06gf8wkslw2scz',
        [
          {
            unit: '20f75f50589a3d87d41d722dace52b6424daf7a4717e0a0b6b409c32000de1404e465433',
            quantity: '1',
          },
        ]
      );
    
    const unsignedTx = await tx.build();
    const signedTx = await wallet.signTx(unsignedTx);
    const txHash = await wallet.submitTx(signedTx);
  }
     
  
  async function mintNFT() {
    // prepare forgingScript
    const usedAddress = await wallet.getUsedAddresses();
    const address = usedAddress[0];
    const forgingScript = ForgeScript.withOneSignature(address);
    
    const tx = new Transaction({ initiator: wallet });
    
    // define asset#1 metadata
    const assetMetadata: AssetMetadata = {
      "name": "Mesh Token",
      "image": "ipfs://QmRzicpReutwCkM6aotuKjErFCUD213DpwPq6ByuzMJaua",
      "mediaType": "image/jpg",
      "description": "This NFT was minted by Mesh (https://meshjs.dev/)."
    };
    const asset1: Mint = {
      assetName: 'MeshToken',
      assetQuantity: '1',
      metadata: assetMetadata,
      label: '721',
      recipient: 'addr_test1qq9mrj6gxeny2cl99thrd6wvv3vr8n3tvtxa78jgdxegjp3p4neh4ew5j446xthascrs6t6k3x48jqum62yq06gf8wkslw2scz',
    };

    tx.mintAsset(
      forgingScript,
      asset1,
    );
    
    const unsignedTx = await tx.build();
    const signedTx = await wallet.signTx(unsignedTx);
    const txHash = await wallet.submitTx(signedTx);
  }
    
    
  async function BuntNFT() {
    // prepare forgingScript
    const usedAddress = await wallet.getUsedAddresses();
    const address = usedAddress[0];
    const forgingScript = ForgeScript.withOneSignature(address);
    
    const tx = new Transaction({ initiator: wallet });
    
    // burn asset#1
    const asset1: Asset = {
      unit: '16337fe64ad6b61db29afbdf7cb1b1647e478f1b6cb6117e257b62b84d657368546f6b656e',
      quantity: '1',
    };
    tx.burnAsset(forgingScript, asset1);
    
    const unsignedTx = await tx.build();
    const signedTx = await wallet.signTx(unsignedTx);
    const txHash = await wallet.submitTx(signedTx);
  }
    
  
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
              onClick={() => BuntNFT()}
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

