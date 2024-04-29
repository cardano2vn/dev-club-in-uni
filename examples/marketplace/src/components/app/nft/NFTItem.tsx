"use client"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ProductType, SmartcontractContext, SmartcontractType } from "@/contexts/SmartcontractProvider";
import { useContext } from "react";
import { LucidContext, LucidContextType } from "@/contexts/LucidProvider";


type NFTItemProps = {
  data?: ProductType;
}

export function NFTItem({ data }: NFTItemProps) {
  // const { sell } = useContext<SmartcontractType>(SmartcontractContext);
  // const { lucid } = useContext<LucidContextType>(LucidContext);

  return (
    <Card className="w-auto">
      <CardHeader className="p-3">
        <CardTitle className="text-center">{data?.assetName}</CardTitle>
      </CardHeader>
      <CardContent className="px-2">
        <img className="w-full h-auto object-cover" src={data?.image} alt={data?.assetName} />
      </CardContent>
      <CardFooter className="flex justify-between" >
        <h1>₳ {data?.price?.toString()}</h1>
        <Button>Buy</Button>
      </CardFooter>
    </Card>
  )
}
