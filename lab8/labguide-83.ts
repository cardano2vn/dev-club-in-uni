import { Blockfrost, Data, fromText, Lucid, TxHash } from "https://deno.land/x/lucid@0.10.7/mod.ts";
const lucid = await Lucid.new(new Blockfrost( "https://cardano-preview.blockfrost.io/api/v0", "preview4xxxx",),"Preview",);

//===============Active Bob Wallet ==============================
const Bob_mnonic = "nhap vao 24 ky tu vi";
lucid.selectWalletFromSeed(Bob_mnonic);

// Khai báo kiểu hay còn gọi là cấu trúc (schema) của datum
// Type definition could be auto generated from on-chain script
const MyDatumSchema = Data.Object({
  name: Data.Bytes(),
  age: Data.Integer(),
  colors: Data.Array(Data.Bytes()),
  description: Data.Bytes(),
});

// Sau đó định nghĩa một kiểu mới có cấu trúc như schema vừa định nghĩa
type MyDatum = Data.Static<typeof MyDatumSchema>;
const Datum = Data.to< MyDatum >(
{
    name: fromText("Lucid"),
    age: 0n,
    colors: [fromText("Blue"), fromText("Purple")],
    description:fromText("Mô tả về Data Object") ,
},
MyDatumSchema
);

 const tx = await lucid
    .newTx()
    .payToAddressWithData("addr_test1qprfh5jl5zfklakhcmeezksvrx0ylp6haa24pk5mt4tdw2f48nlr7dmpqgg3vf0626q43cfalep9s8knl03wrxnll6dslr7wfj",{inline: Datum}, {lovelace: 10000000n,})
    .complete();
  const signedTx = await tx.sign().complete();
  const txHash = await signedTx.submit();
  console.log(`Giao dịch được thực hiện với mã là: ${txHash}`);
