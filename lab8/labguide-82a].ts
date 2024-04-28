import { Blockfrost, Lucid, fromText,} from "https://deno.land/x/lucid@0.10.7/mod.ts";
const lucid = await Lucid.new(new Blockfrost( "https://cardano-preview.blockfrost.io/api/v0", "preview4xxxx",),"Preview",);

//===============Active Bob Wallet ==============================
const Bob_mnonic = "nhap vao 24 ky tu";
lucid.selectWalletFromSeed(Bob_mnonic);
const address = await lucid.wallet.address();

// Ký mã hóa thông điêp "Hello from Lucid!" với Publickey của Bob
const payload = fromText("Hello from Lucid1");
const signedMessage = await lucid.newMessage(address, payload).sign();


let save_message = JSON.stringify(signedMessage);
await Deno.writeTextFile('./JSONmessage.sign', save_message)


 