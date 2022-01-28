import React, { Component } from 'react';
import { ICoin } from '../../../types/PlatformType';
import './SelectCoinInput.css'
import arrow from "./arrow.svg";
import IWallet from '../../../types/walletType';

interface ISelectCoinState{
    isFocused:boolean
}
interface ISelectCoinProps{
    coin: ICoin,
    countCoin:string,
    balance: number,
    title:string,
    direction: boolean,
    readonly: boolean,
    canChangeCoin:boolean,
    showBalance: boolean,
    MaxBalanceClick?: (e:React.SyntheticEvent<HTMLAnchorElement>)=>void,
    OnChange?: (e: React.ChangeEvent<HTMLInputElement>)=>void,
    OnClickCoin?: (e: React.SyntheticEvent<HTMLDivElement>)=>void,
}
class SelectCoin extends Component<ISelectCoinProps,ISelectCoinState>{
    state: ISelectCoinState={
        isFocused:false
    }
    render(): React.ReactNode {
        const { coin, title, balance, OnChange,countCoin,direction, OnClickCoin,MaxBalanceClick,readonly,canChangeCoin,showBalance } = this.props;
       
        return (
        <div className='CoinContainer'>
            <div className='CoinContainerHeader'>
                <p className='MulishText marginBottomTopAuto'>{title}</p>
                {showBalance &&  <div className='marginLeftAuto'>
                    <p className='MulishText marginBottomTopAuto'>Balance {balance}</p>
                    {direction &&  <a onClick={MaxBalanceClick} className='MulishText marginBottomTopAuto'>Max</a>}
                </div>
                }
               
            </div>
            <div className={`SelectCoinContainer ${(this.state.isFocused && 'divFocus')}`} >
                <div className='Coin marginBottomTopAuto' onClick={OnClickCoin}>
                    <img className='marginBottomTopAuto' height={"20px"}  src={coin?.icon} />
                    <p className='NameCoin marginBottomTopAuto MulishText'>{coin?.name}</p>
                    {canChangeCoin &&  <img className='marginBottomTopAuto arrowSelect' src={arrow}/>}
                       
                </div>
                <input readOnly={readonly} className='MulishText' onFocus={()=>this.setState({isFocused:true})} onBlur={()=>this.setState({isFocused:false})} onChange={OnChange}  value={countCoin} />
            </div>
        </div>
        )
    }
}

export default SelectCoin;