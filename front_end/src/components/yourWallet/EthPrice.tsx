import { Token } from "../Main"
import { useEthers, useTokenBalance, useContractCall } from "@usedapp/core"
import { Content2Msg } from "../Content2Msg"

import { constants, utils } from "ethers"
import TokenFarm from "../../chain-info/contracts/TokenFarm.json"
import networkMapping from "../../chain-info/deployments/map.json"

export interface EthPriceProps {
    token: Token
}

export const EthPrice = ({ token }: EthPriceProps) => {
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
                method: "getETH", // Method to be called
                args: [], // Method arguments - address to be checked for balance
            }
        ) ?? [];
    //console.log("account:", account)
    //debugger;

    return (<Content2Msg
        label={`当前ETH价格` + (tokenBalance / 1e18).toFixed(2)} />)

}
