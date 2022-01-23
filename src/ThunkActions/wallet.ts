
import thunk, { ThunkAction } from 'redux-thunk'
import IWallet from '../types/walletType';
import {CONNECTED_WALLET} from '../constants/actionConstants';
import {ConnectWallet} from '../TonApi/walletApi';
import {ConnectWalletActionType} from "../actions/walletActions"

function ConnectToWallet(): ThunkAction<void, IWallet, unknown, ConnectWalletActionType> {
    return async function (dispatch) {
      const accountId = await ConnectWallet();
      dispatch({
        type: CONNECTED_WALLET,
        accountId
      })
    }
}
export default ConnectToWallet;