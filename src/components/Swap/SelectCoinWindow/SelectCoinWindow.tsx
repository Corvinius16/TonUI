import React, { Component } from 'react';
import IPlatrform, { ICoin } from '../../../types/PlatformType';
import IWallet from '../../../types/walletType';
import { connect } from 'react-redux';
import './SelectCoinWindow.css';
import WindowHeader, { IWindowButton } from '../../Window/WindowHeader/WindowHeader';
import CustomInput from '../../Input/Input';
import closeIcon from '../../../assets/close.svg'
interface ISelectCoinWindowState{
    buttons: IWindowButton[],
    isInited:boolean;
    filterCoin:string
}

interface ISelectCoinWindowProps{
    platform : IPlatrform
    wallet : IWallet
    OnClose: ()=>void
    CoinSelect: (coin:ICoin)=>void
}

class SelectCoinWindow extends Component<ISelectCoinWindowProps, ISelectCoinWindowState>{
    
    state: ISelectCoinWindowState = {
        isInited:false,
        buttons: [],
        filterCoin: ""
    }
    handleFilterChange = (e : React.ChangeEvent<HTMLInputElement>) =>{
        const {target: {value}} = e;
        this.setState({
            filterCoin: value
        })
    }
    handleSelectCoin = (coin:ICoin)=>{
        this.props.CoinSelect(coin);
    }
    getBalanceCoin = (coin:ICoin) =>{
        const coinInWallet = this.props.wallet.coins.find(c=>c.name === coin.name);
        let balance = 0;
        if(coinInWallet != null)
        {
            balance = coinInWallet.count;
        }
        return balance;
    }
    render(): React.ReactNode{
        const {buttons,filterCoin} = this.state;
        let {platform: {coins}} = this.props;
        coins = coins.filter(function (str) { return str.name.indexOf(filterCoin.toUpperCase()) != -1; });
        return (
            <div className='selectCoinWindow'>
                <WindowHeader buttons={buttons} title='Select a token'/>
                <div className='inputContainer'>
                    <CustomInput value={filterCoin} OnChange={this.handleFilterChange} placeholder='search name or paste adress'/>
                </div>
             
                <div className='SelectCoinWindowContainer'>
                    <div className='SelectCoinWindowContainerScroll'>
                        <ul className='coinsList'>
                            { coins.map((coin) => (
                                <li key={coin.name} onClick={()=>this.handleSelectCoin(coin)} >
                                    <img className='marginBottomTopAuto' src={coin.icon}/>
                                    <p className='marginBottomTopAuto MulishText'>{coin.name}</p>
                                    <p className='marginBottomTopAuto MulishText marginLeftAuto'>{this.getBalanceCoin(coin)}</p>
                                </li>
                            
                            ))}
                        </ul>
                    </div>
                   
                   
                </div>
            </div>
        )
    };
    handleClickClose = () =>{
        this.props.OnClose();
    }
    componentDidMount(){
        if(!this.state.isInited)
        {
            const buttons = [
                {
                    icon:closeIcon,
                    OnClick: this.handleClickClose
                }
            ]
            this.setState({
                buttons,
                isInited: true,
            })
        }
    }
}

export default SelectCoinWindow;