import { CONNECTED_WALLET } from '../constants/actionConstants';
interface IConnectWalletAction{
    type: typeof CONNECTED_WALLET;
    accountId:string
}
export type ConnectWalletActionType = IConnectWalletAction;

export const ConnectToWallet = () : ConnectWalletActionType =>({
    type: CONNECTED_WALLET,
    accountId: ""
});



