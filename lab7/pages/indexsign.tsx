import { CardanoWallet, useWallet } from '@meshsdk/react';
import { checkSignature, generateNonce } from '@meshsdk/core';



export default function Page() {
  const { wallet, connected } = useWallet();
  const nonce = generateNonce('Sign to login in to Mesh: ');
  
  async function backendGetNonce(userAddress) {
    const nonce = generateNonce('Sign to login in to Mesh: ');
    return nonce;
  }
  
  async function backendVerifySignature(userAddress, signature) {
    // do: get 'nonce' from database
  
    const result = checkSignature(nonce, userAddress, signature);
    if(result){
      console.log("create JWT or approve certain process")
    }
    else{
      console.log(" prompt user that signature is not correct")
    }
  }

  async function frontendStartLoginProcess(nonce) {
    if (connected) {
      const userAddress = (await wallet.getRewardAddresses())[0];
      console.log(nonce )
      //const nonce = await backendGetNonce(userAddress);
      await frontendSignMessage(nonce);
    }
  }
  
  async function frontendSignMessage(nonce) {
    try {
      const userAddress = (await wallet.getRewardAddresses())[0];
      const signature = await wallet.signData(userAddress, nonce);
      await backendVerifySignature(userAddress, signature);
    } catch (error) {
      console.log(error)
    }
  }



  return (
    <>
      <CardanoWallet
        label="Sign In with Cardano"
        onConnected={() => frontendStartLoginProcess(nonce)}
      />
    </>
  );
}