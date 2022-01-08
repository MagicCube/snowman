import React, { useState, useEffect } from "react"
import { Token } from "../Main"
import { useEthers, useTokenBalance, useNotifications } from "@usedapp/core"
import { formatUnits } from "@ethersproject/units"
import { Button, Input, CircularProgress, Snackbar } from "@material-ui/core"
import Alert from "@material-ui/lab/Alert"
import { usePlaceBid } from "../../hooks"
import { utils } from "ethers"

export interface PlaceBidFormProps {
    token: Token
}


export const PlaceBidForm = ({ token }: PlaceBidFormProps) => {
    const { address: tokenAddress, name } = token
    const { account } = useEthers()
    const tokenBalance = useTokenBalance(tokenAddress, account)
    const formattedTokenBalance: number = tokenBalance ? parseFloat(formatUnits(tokenBalance, 18)) : 0
    const { notifications } = useNotifications()

    const [amount, setAmount] = useState<number | string | Array<number | string>>(0)
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newAmount = event.target.value === "" ? "" : Number(event.target.value)
        setAmount(newAmount)
        console.log(newAmount)
    }

    const amountAsWei = utils.parseEther(amount.toString())
    const { PlaceBid, mystate } = usePlaceBid(amountAsWei.toString())
    const handlePlaceBid = () => {
        return PlaceBid()
    }

    console.log(mystate)
    const isMiningUnstake = mystate.status === "Mining"



    return (
        <>
            <div>
                <Input
                    onChange={handleInputChange} />
                <Button
                    onClick={handlePlaceBid}
                    color="primary"
                    size="small"
                    disabled={isMiningUnstake}>
                    {isMiningUnstake ? <CircularProgress size={26} /> : "usd/option, for 100usdx premium"}
                </Button>
            </div>
        </>
    )
}