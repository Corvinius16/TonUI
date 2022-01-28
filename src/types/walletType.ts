interface IWallet{
    accountId: string,
    coins: IWalletCoin[],
    isConnected:boolean
}
export interface IWalletSwapCoin{
    fromCoin: IWalletCoin,
    toCoin:IWalletCoin
}
export interface IWalletCoin{
    name:string,
    count: number
}
export default IWallet;