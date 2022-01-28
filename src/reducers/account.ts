import { CONNECTED_WALLET,UPDATED_ACCOUNT_INFO } from '../constants/actionConstants';
import {UpdateAccountInfoAction} from '../ThunkActions/StoreCall/AccountStoreCall'
import  {ConnectWalletActionType} from '../actions/walletActions'
import IAccount from '../types/AccountType';
type accountState = IAccount;

const initialAccountState: accountState = {
    wallet: {
      accountId: "",
      isConnected: false,
      coins: [],
    },
    pools:[]
}
const Account = (state = initialAccountState, action: ConnectWalletActionType): accountState => {
  switch (action.type) {
    case CONNECTED_WALLET :
        const {accountId} = action;
        state = {
            wallet:{
              accountId,
              isConnected: true,
              coins:[],
              
            },
            pools:[]
            
        }
        UpdateAccountInfoAction(state);
        return state;
    case UPDATED_ACCOUNT_INFO :
        state = {
          wallet:{
            accountId: state.wallet.accountId,
            isConnected : state.wallet.isConnected,
            coins: action.coins,
          },
          pools: action.pools,
        }
        return state;
    default:
      return state;
  }
}

export default Account;

