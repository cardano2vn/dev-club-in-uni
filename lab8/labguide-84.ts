import {
    Address,
    Blockfrost,
    Data,
    Lovelace,
    Lucid,
    SpendingValidator,
    TxHash,
  } from "https://deno.land/x/lucid@0.10.7/mod.ts";
  const lucid = await Lucid.new(new Blockfrost( "https://cardano-preview.blockfrost.io/api/v0", "preview4xxxx",),"Preview",);
  
  //===============Active Bob Wallet ==============================
  const Bob_mnonic = "Nhap vao 24 ky tu vi";
  lucid.selectWalletFromSeed(Bob_mnonic);
  /*
    AlwaysSucceeds Example
    Lock a UTxO with some ADA
    UTxO can be unlocked by anyone
    Showcasing PlutusV2
  
    Contract:
  
    validate :: () -> () -> ScriptContext -> Bool
    validate _ _ _ = True
   */
  
 
  
  const alwaysSucceedScript: SpendingValidator = {
    type: "PlutusV2",
    script: "49480100002221200101",
  };
  
  const alwaysSucceedAddress: Address = lucid.utils.validatorToAddress(
    alwaysSucceedScript,
  );
  
  const Datum = () => Data.void();
  const Redeemer = () => Data.void();
  
  export async function lockUtxo(
    lovelace: Lovelace,
  ): Promise<TxHash> {
    const tx = await lucid
      .newTx()
      .payToContract(alwaysSucceedAddress, { inline: Datum() }, { lovelace })
      .payToContract(alwaysSucceedAddress, {
        asHash: Datum(),
        scriptRef: alwaysSucceedScript, // adding plutusV2 script to output
      }, {})
      .complete();
  
    const signedTx = await tx.sign().complete();
    const txHash = await signedTx.submit();
    return txHash;
  }
  const txHash=await lockUtxo(1000000n);
  console.log(`Giao dịch thành công với TX-ID: ${txHash}`)

  export async function redeemUtxo(): Promise<TxHash> {
    const referenceScriptUtxo = (await lucid.utxosAt(alwaysSucceedAddress)).find(
      (utxo) => Boolean(utxo.scriptRef),
    );
    if (!referenceScriptUtxo) throw new Error("Reference script not found");
  
    const utxo = (await lucid.utxosAt(alwaysSucceedAddress)).find((utxo) =>
      utxo.datum === Datum() && !utxo.scriptRef
    );
    if (!utxo) throw new Error("Spending script utxo not found");
  
    const tx = await lucid
      .newTx()
      .readFrom([referenceScriptUtxo]) // spending utxo by reading plutusV2 from reference utxo
      .collectFrom([utxo], Redeemer())
      .complete();
  
    const signedTx = await tx.sign().complete();
  
    const txHash = await signedTx.submit();
  
    return txHash;
  }