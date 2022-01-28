import React, { Component } from 'react';
import './SwapWindow.css';
import Window from '../../components/Window/Window';
import Swap from "../../components/Swap/Swap/Swap"
import IPlatrform, { ICoin } from '../../types/PlatformType';
import { connect } from 'react-redux';
import SelectCoinWindow from '../../components/Swap/SelectCoinWindow/SelectCoinWindow';
import IAccount from '../../types/AccountType';
interface ISwapWindowState{
    callback?: (coin: ICoin)=>void,
    isOpenSelectCoin: boolean
}

interface ISwapWindowProps{
    platform? : IPlatrform
    account? : IAccount
}

class SwapWindow extends Component<ISwapWindowProps,ISwapWindowState>{

    state :ISwapWindowState ={
        isOpenSelectCoin : false,
    }
    
    handleClickCoin = (callback: (coin: ICoin)=>void) =>{
        this.setState({
            callback,
            isOpenSelectCoin: true
        })
    }
    handleClickCloseCoinSelect = () =>{
        this.setState({
            isOpenSelectCoin: false
        })
    }
    handleSelectCoin = (coin:ICoin)=>{
        this.setState({
            isOpenSelectCoin: false,
        })
        this.state.callback!(coin);
    }

  
    render(): React.ReactNode{
        const {isOpenSelectCoin} = this.state;
        const {platform,account} = this.props
       
        return (
            <Window className='swap'>
                <Swap platform={platform!} account={account!} OnClickCoin={this.handleClickCoin}></Swap>
                {isOpenSelectCoin && 
                    <SelectCoinWindow CoinSelect={this.handleSelectCoin} OnClose={this.handleClickCloseCoinSelect} platform={platform!} wallet={account?.wallet!}></SelectCoinWindow>
                }
            </Window>
        )
    };
   
}

export default connect(
    (state) => ({
      ...state,
    }), {
    }
  )(SwapWindow);