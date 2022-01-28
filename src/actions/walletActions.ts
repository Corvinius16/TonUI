import { CONNECTED_WALLET } from '../constants/actionConstants';
import { IPool } from '../types/PlatformType';
import {IWalletCoin} from '../types/walletType'
interface IConnectWalletAction{
    type: typeof CONNECTED_WALLET,
    accountId:string,
    coins: IWalletCoin[],
    pools: IPool[]
}
export type ConnectWalletActionType = IConnectWalletAction;




