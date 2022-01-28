
import { ThunkAction } from 'redux-thunk'
import IWallet, { IWalletSwapCoin } from '../../types/walletType';
import {CONNECTED_WALLET, UPDATED_ACCOUNT_INFO} from '../../constants/actionConstants';
import {ConnectWallet, createPool, GetWalletBalance, removePool, SwapCoinInWallet} from '../../TonApi/walletApi';
import {GetAccountPools} from '../../TonApi/accountApi';
import {ConnectWalletActionType} from "../../actions/walletActions"
import IAccount from '../../types/AccountType';
import { IPool } from '../../types/PlatformType';

function ConnectToWalletThunk(): ThunkAction<void, IWallet, unknown, ConnectWalletActionType> {
    return async function (dispatch) {
      const accountId = await ConnectWallet();
      dispatch({
        type: CONNECTED_WALLET,
        accountId,
        coins:[],
        pools:[]
      })
    }
}
function UpdateAccountInfoThunk(account:IAccount): ThunkAction<void, IWallet, unknown, ConnectWalletActionType> {
  return async function (dispatch) {
    const coins = await GetWalletBalance(account.wallet);
    const pools = await GetAccountPools(account);
    dispatch({
      type: UPDATED_ACCOUNT_INFO,
      accountId:account.wallet.accountId,
      coins:coins,
      pools:pools
    })
  }
}

function SwapCoinInWalletThunk(account:IAccount, swap :IWalletSwapCoin ): ThunkAction<void, IWallet, unknown, ConnectWalletActionType> {
  return async function (dispatch) {
    const coins = await SwapCoinInWallet(account.wallet,swap);
    dispatch({
      type: UPDATED_ACCOUNT_INFO,
      accountId:account.wallet.accountId,
      coins:coins,
      pools: account.pools,
    })
  }
}
function CreatePoolThunk(account:IAccount, pool :IPool ): ThunkAction<void, IWallet, unknown, ConnectWalletActionType> {
  return async function (dispatch) {
    const pools = await createPool(account,account.wallet,pool);
    dispatch({
      type: UPDATED_ACCOUNT_INFO,
      accountId:account.wallet.accountId,
      coins:account.wallet.coins,
      pools: pools
    })
  }
}
function RemovePoolThunk(account:IAccount, pool :IPool ): ThunkAction<void, IWallet, unknown, ConnectWalletActionType> {
  return async function (dispatch) {
    const pools = await removePool(account,account.wallet,pool);
    dispatch({
      type: UPDATED_ACCOUNT_INFO,
      accountId:account.wallet.accountId,
      coins:account.wallet.coins,
      pools: pools
    })
  }
}
export const ConnectToWallet = ConnectToWalletThunk;
export const UpdateAccount = UpdateAccountInfoThunk;
export const SwapCoinWallet = SwapCoinInWalletThunk;
export const CreatePool = CreatePoolThunk;
export const RemovePool = RemovePoolThunk;