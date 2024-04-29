"use client"
import { Button, buttonVariants } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import wallets from "@/constants/wallets"
import { WalletContext, WalletContextType } from "@/contexts/WalletProvider"
import { cn } from "@/utils/cn"
import Image from "next/image"
import { useContext, useState } from "react"

export function ConnectWallet() {
  const { wallet, connect, disconnect } = useContext<WalletContextType>(WalletContext);
  const [openWallet, setOpenWallet] = useState(false)
  const [copied, setCopied] = useState(false);

  if (wallet) return (<>
    <DropdownMenu>
      <DropdownMenuTrigger className={cn(buttonVariants({ variant: "outline" }), "p-3")}><Image
        width={20}
        height={20}
        src={wallet.image}
        alt=""
        className="mr-2"
      /> {`${wallet.address}`.slice(0, 15) + "..."}</DropdownMenuTrigger>
      <DropdownMenuContent className="w-48">

        <DropdownMenuItem
          onClick={async () => {
            await navigator.clipboard.writeText(`${wallet.address}`);
            setCopied(true);
            setTimeout(() => setCopied(false), 400);
          }}
        >
          {copied ? 'Copied' : 'Copy Address'}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={disconnect}>Disconnect</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </>)

  return (
    <>
      <Dialog open={openWallet}>
        <DialogTrigger asChild>
          <Button onClick={() => setOpenWallet(true)}>Connect Wallet</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Connect a wallet</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            {wallets.map(async (item, index) => (<div
              key={index}
              onClick={() => {
                setOpenWallet(false)
                connect({
                  name: item.name,
                  api: item.api,
                  image: item.image,
                  checkApi: item.checkApi,
                })
              }}
              className={cn("grid grid-cols-6 items-center gap-4 p-2", "border-solid border-2 border-sky-100 rounded")}>
              <div className="col-span-1">
                <Image
                  width={40}
                  height={40}
                  src={item.image}
                  alt=""
                />
              </div>
              <div className="col-span-5">
                <p>{item.name}</p>
              </div>
            </div>))}
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
