import { Data, Lucid } from "lucid-cardano";
import readValidator from "@/utils/read-validator";
import { contractValidatorMarketplace } from "@/libs/marketplace";

import { MarketplaceDatum } from "@/constants/datum";
import { MarketplaceRedeemer } from "@/constants/redeemer";
import { toast } from "react-toastify";

type Props = {
    lucid: Lucid;
    policyId: string;
    assetName: string;
};

const refundAssetService = async function ({ lucid, policyId, assetName }: Props) {
    try {
        const validator = readValidator();

        const scriptAddress = lucid.utils.validatorToAddress(validator);
        const scriptUtxos = await lucid.utxosAt(scriptAddress);
        let existAsset: any;

        const assets = scriptUtxos.filter((asset: any, index: number) => {
            const checkAsset = Data.from<MarketplaceDatum>(asset.datum, MarketplaceDatum);
            if (checkAsset.policyId === policyId && checkAsset.assetName === assetName) {
                existAsset = Data.from<MarketplaceDatum>(asset.datum, MarketplaceDatum);
                return true;
            }
            return false;
        });
        if (assets.length === 0) {
            console.log("utxo found.");
            process.exit(1);
        }

        const exchange_fee = BigInt((parseInt(existAsset.price) * 1) / 100);
        if (validator) {
            const tx = await lucid
                .newTx()
                .collectFrom(assets, MarketplaceRedeemer)
                .addSigner(await lucid.wallet.address())
                .attachSpendingValidator(validator)
                .complete();

            const signedTx = await tx.sign().complete();
            const txHash = await signedTx.submit();
            await lucid.awaitTx(txHash);
            return { txHash, policyId, assetName };
        }
    } catch (error) {
        toast.error("Refund asset faild !", {
            position: "bottom-right",
            autoClose: 1000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    }
};

export default refundAssetService;
