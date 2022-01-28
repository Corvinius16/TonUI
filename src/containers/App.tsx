import React, {Fragment} from 'react';
import  Header  from '../components/Header/Header'
import Footer from '../components/Footer/Footer';
import { connect } from 'react-redux';
import IWallet from '../types/walletType';
import {UpdatePlatrformAction} from '../ThunkActions/StoreCall/PlatformStoreCall'
import {ConnectWalletAction} from '../ThunkActions/StoreCall/AccountStoreCall'
import './App.css';
import { ThemeType } from '../types/ThemeType';
import { UpdateThemeAction } from '../actions/themeActions';


class App extends React.Component<any>{

  componentDidMount() {
    UpdatePlatrformAction();
  }

  handleWalletClick = () =>{
    ConnectWalletAction();
  }
  updateTheme = (theme:ThemeType)=>{
    const { UpdateThemeAction} = this.props;
    UpdateThemeAction(theme);
  }
  render(){
    const {children, account, platform, theme} = this.props;
    const {wallet} = account;
    const {accountId, isConnected} = wallet;
    const {priceTON} = platform
    return(
      <Fragment>
        <Header UpdateTheme={this.updateTheme} theme={theme.themeType} priceTON={priceTON} accountId={accountId} isConnectedToWallet={isConnected} ConnectWalletClick={this.handleWalletClick} />
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
    UpdateThemeAction
  }
)(App);

