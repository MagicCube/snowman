import { Token } from "../Main"
import { useEthers, useTokenBalance, useContractCall } from "@usedapp/core"
import { formatUnits } from "@ethersproject/units"
import { BalanceMsg } from "../BalanceMsg"

import { constants, utils } from "ethers"
import TokenFarm from "../../chain-info/contracts/TokenFarm.json"
import networkMapping from "../../chain-info/deployments/map.json"

export interface OptionSupplyProps {
    token: Token
}

export const OptionSupply = ({ token }: OptionSupplyProps) => {
    // address
    // abi
    // chainId
    const { chainId, account } = useEthers()
    const { abi } = TokenFarm
    const tokenFarmAddress = chainId ? networkMapping[String(chainId)]["TokenFarm"][0] : constants.AddressZero
    const tokenFarmInterface = new utils.Interface(abi)
    const { image, address, name } = token

    const [tokenBalance] =
        useContractCall(
            //account &&
            tokenFarmAddress && {
                abi: tokenFarmInterface, // ABI interface of the called contract
                address: tokenFarmAddress, // On-chain address of the deployed contract
                method: "getSupply", // Method to be called
                args: [], // Method arguments - address to be checked for balance
            }
        ) ?? [];
    //console.log("supply:", tokenBalance / 1e18)
    //debugger;

    const formattedTokenBalance: number = tokenBalance ? parseFloat(formatUnits(tokenBalance, 18)) : 0
    return (<BalanceMsg
        label={`max USDX supply is`}
        tokenImgSrc={image}
        amount={formattedTokenBalance} />)
}