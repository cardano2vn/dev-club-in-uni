import { Blockfrost, Lucid, fromText,} from "https://deno.land/x/lucid@0.10.7/mod.ts";
const lucid = await Lucid.new(new Blockfrost( "https://cardano-preview.blockfrost.io/api/v0", "preview4QbiejGzlyhUgfvyXZNf8lDEIFjCHjP0",),"Preview",);

//===============Active Bob Wallet ==============================
const Bob_mnonic = "lottery novel civil green oppose whip offer correct mushroom cricket awkward vague shine another tree boss there perfect asset side release song wedding captain";
lucid.selectWalletFromSeed(Bob_mnonic);
const address = await lucid.wallet.address();

// đọc thông điệp mã hóa
const signedMessage = await Deno.readTextFile('./JSONmessage.sign')
const payload = fromText("Hello from Lucid!");
const hasSigned: boolean = lucid.verifyMessage(address, payload, JSON.parse(signedMessage));
 
console.log(`Tính đúng đắn của thông điệp là: ${hasSigned}`);