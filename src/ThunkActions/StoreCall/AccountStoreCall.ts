import {ConnectToWallet, UpdateAccount, SwapCoinWallet,CreatePool, RemovePool} from '../Thunk/account'; 
import { ConnectWalletActionType } from '../../actions/walletActions';
import { ThunkDispatch } from 'redux-thunk';
import store from '../../store/store'
import IWallet, { IWalletSwapCoin } from '../../types/walletType';
import IAccount from '../../types/AccountType';
import { IPool } from '../../types/PlatformType';
export const ConnectWalletAction = () =>{
    (store.dispatch as ThunkDispatch<IWallet, unknown, ConnectWalletActionType>)(ConnectToWallet())
    
}
export const UpdateAccountInfoAction = (account: IAccount) =>{
    (store.dispatch as ThunkDispatch<IWallet, unknown, ConnectWalletActionType>)(UpdateAccount(account))
}
export const SwapCoinAction = (account: IAccount, swap: IWalletSwapCoin) =>{
    (store.dispatch as ThunkDispatch<IWallet, unknown, ConnectWalletActionType>)(SwapCoinWallet(account,swap))
}
export const AddPoolOnAccountAction = (account: IAccount,pool:IPool) =>{
    (store.dispatch as ThunkDispatch<IWallet, unknown, ConnectWalletActionType>)(CreatePool(account,pool))
}
export const RemovePoolOnAccountAction = (account: IAccount,pool:IPool) =>{
    (store.dispatch as ThunkDispatch<IWallet, unknown, ConnectWalletActionType>)(RemovePool(account,pool))
}