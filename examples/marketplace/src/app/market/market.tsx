"use client"
import { NFTItem } from "@/components/app/nft/NFTItem";
import { ProductType } from "@/contexts/SmartcontractProvider";
// import { SmartcontractContext, SmartcontractType } from "@/contexts/SmartcontractProvider";
// import { useContext } from "react";

const Market = () => {
    // const { assetsFromSmartContract } = useContext<SmartcontractType>(SmartcontractContext);

    const assetsFromSmartContract: ProductType[] = [
        {
            id: "1",
            assetName: "NFT 1",
            image: "https://img-cdn.magiceden.dev/rs:fill:400:0:0/plain/https://nftstorage.link/ipfs/bafybeifprusw3cfmevjqemype42svll3frpx3asuzd5hh7rplc3thp63aq/9492.png",
            price: BigInt(100),
            policyId: "0x1234567890",
        },
        {
            id: "2",
            assetName: "NFT 2",
            image: "https://converted-media.jpgstoreapis.com/QmfDrtasiVnCCiFG6CoffWWa1DqQoBA8jUerptbhgZBM6v.sz_97394.dims_400x400.anim_0.webp",
            price: BigInt(200),
            policyId: "0x1234567890",
        },
        {
            id: "3",
            assetName: "NFT 3",
            image: "https://converted-media.jpgstoreapis.com/QmNvWZqYRXPnPVwwmo2fFeCYMQk2ogrDgQjNkyyn4rbj7S.sz_85238.dims_400x400.anim_0.webp",
            price: BigInt(300),
            policyId: "0x1234567890",
        },
        {
            id: "4",
            assetName: "NFT 4",
            image: "https://converted-media.jpgstoreapis.com/QmUoVKCFr5DFahu6n3PHguS5C937ytStSnQorF3UmpdbsY.sz_88740.dims_400x400.anim_0.webp",
            price: BigInt(400),
            policyId: "0x1234567890",
        },
        {
            id: "5",
            assetName: "NFT 5",
            image: "https://converted-media.jpgstoreapis.com/QmNjqoud3gDiuzPrdYAieKLaPpxWgN3KpYdGTb6MHB3Kku.sz_92162.dims_400x400.anim_0.webp",
            price: BigInt(500),
            policyId: "0x1234567890",
        },
        {
            id: "6",
            assetName: "NFT 6",
            image: "https://converted-media.jpgstoreapis.com/QmcBQUEtJqkpHAqXvLEDDtC4uTKcLA2aXxSyisHJHvsE6K.sz_95322.dims_400x400.anim_0.webp",
            price: BigInt(600),
            policyId: "0x1234567890",
        },
        {
            id: "7",
            assetName: "NFT 7",
            image: "https://converted-media.jpgstoreapis.com/QmNQL8zGprKgjFDQnkbkWbjS9kCxwATiqGfDe8Rxm46Qqp.sz_82482.dims_400x400.anim_0.webp",
            price: BigInt(700),
            policyId: "0x1234567890",
        },
        {
            id: "8",
            assetName: "NFT 8",
            image: "https://converted-media.jpgstoreapis.com/QmYwZmAfRyZeYeGoqYv8G3J3UJEpZz8pMcY2aZKXVXyTt6.sz_79866.dims_400x400.anim_0.webp",
            price: BigInt(800),
            policyId: "0x1234567890",
        }
    ];
    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {assetsFromSmartContract?.map((item, index) => (
                    <NFTItem key={index} data={item} />
                ))}
            </div>
        </>
    );
};

export default Market;
