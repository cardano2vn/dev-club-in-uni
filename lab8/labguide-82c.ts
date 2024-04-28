import { Blockfrost, Lucid, fromText,} from "https://deno.land/x/lucid@0.10.7/mod.ts";
const lucid = await Lucid.new(new Blockfrost( "https://cardano-preview.blockfrost.io/api/v0", "preview4QbiejGzlyhUgfvyXZNf8lDEIFjCHjP0",),"Preview",);

//===============Active Alice Wallet ==============================
const Alice = "leisure come endorse situate perfect slender helmet pond next host mean great program antenna ecology used scheme indoor various conduct border swamp spread spin"
lucid.selectWalletFromSeed(Alice);
const address = await lucid.wallet.address();

// đọc thông điệp mã hóa
const signedMessage = await Deno.readTextFile('./JSONmessage.sign')
const payload = fromText("Hello from Lucid!");
const hasSigned: boolean = lucid.verifyMessage(address, payload, JSON.parse(signedMessage));
 
console.log(`Tính đúng đắn của thông điệp là: ${hasSigned}`);