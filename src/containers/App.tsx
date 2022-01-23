import React, {Fragment} from 'react';
import  Header  from '../components/Header/Header'
import Footer from '../components/Footer/Footer';
import { connect } from 'react-redux';
import IWallet from '../types/walletType';
import IPriceTON from '../types/priceTONType';
import store from '../store/store'
import ConnectToWallet from '../ThunkActions/wallet';
import GetPriceTONAction from '../ThunkActions/platform';
import { ThunkDispatch } from 'redux-thunk';
import { ConnectWalletActionType } from '../actions/walletActions';
import { GetPriceTONActionType } from '../actions/platformActions';
import './App.css';



class App extends React.Component<any>{

  componentDidMount() {
    (store.dispatch as ThunkDispatch<IPriceTON, unknown, GetPriceTONActionType>)(GetPriceTONAction())
  }

  handleWalletClick = () =>{
    (store.dispatch as ThunkDispatch<IWallet, unknown, ConnectWalletActionType>)(ConnectToWallet())
  }
  render(){
    const {children, wallet, platform} = this.props;
    const {accountId, isConnected} = wallet;
    const {price} = platform
    return(
      <Fragment>
        <Header priceTON={price} accountId={accountId} isConnectedToWallet={isConnected} ConnectWalletClick={this.handleWalletClick} />
        {children}
        <Footer></Footer>
      </Fragment>

    )
  }
}
export default connect(
  (state) => ({
    ...state,
  }), {
  }
)(App);

