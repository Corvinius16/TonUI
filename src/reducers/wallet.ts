import { CONNECTED_WALLET } from '../constants/actionConstants';
import  IWallet  from '../types/walletType';
import  {ConnectWalletActionType} from '../actions/walletActions'
type walletState = IWallet;

const initialWalletState: walletState = {
    accountId: "",
    isConnected: false
}
const wallet = (state = initialWalletState, action: ConnectWalletActionType): walletState => {
  switch (action.type) {
    case CONNECTED_WALLET :
        const {accountId} = action;
        state = {
            accountId,
            isConnected: true
        }
        return state;
    default:
      return state;
  }
}

export default wallet;

