import React, { Component, Fragment } from 'react';
import WindowHeader, {IWindowButton} from '../../Window/WindowHeader/WindowHeader';
import IPlatrform, { ICoin } from '../../../types/PlatformType';
import SelectCoin from '../SelectCoinInput/SelectCoinInput';
import './Swap.css'
import settingsIcon from '../../../assets/settings.svg';
import updateIcon from '../../../assets/update.svg';
import arrow from '../../../assets/arrow.svg';
import IWallet, { IWalletSwapCoin } from '../../../types/walletType';
import {ConnectWalletAction, SwapCoinAction} from '../../../ThunkActions/StoreCall/AccountStoreCall'

import {CONNECT_WALLET_TEXT} from '../../../constants/TextConstants';
import IAccount from '../../../types/AccountType';
interface ISwapProps{
    platform: IPlatrform
    account: IAccount
    OnClickCoin: (callback: (coin: ICoin)=>void)=>void
}

interface ISwapState{
    firstCoin?: ICoinState,
    secondCoin?: ICoinState,
    priceCoin?: number,
    isInited: boolean
    buttons: IWindowButton[],
    balanceFirstCoin: number,
    balanceSecondCoin:number,
    error:string
}
interface ICoinState{
    coin:ICoin,
    count: string,
}
class Swap extends Component<ISwapProps,ISwapState>{
   
   
    state: ISwapState = {
        firstCoin:undefined,
        secondCoin:undefined,
        buttons: [],
        isInited:false,
        balanceFirstCoin: 0,
        balanceSecondCoin:0,
        error:""
    }

   
 
    handleUpdateClick = () => {
        
    }
    handlSettingsClick = () =>{
       
    }
    validationCount = (val:string) => {
        if (!isNaN(+val))
        {   
            return true;
        }else{
            
            return false;
        }
    }
    componentDidMount(){
        
        const buttons = [
            {
                icon:updateIcon,
                OnClick: this.handleUpdateClick
            },
            {
                icon:settingsIcon,
                OnClick: this.handlSettingsClick
            }
        ]
       this.setState({
           buttons
       })
       
    }
    static getDerivedStateFromProps(props: ISwapProps, state: ISwapState){
        if(!state.isInited)
        {
            const {coins} = props.platform;
            const firstCoin = coins[0];
            const secondCoin = coins.find(c=>c.name === "TON")!;
            const firstCoinSwap: ICoinState = {
                coin: firstCoin,
                count: '0'
            };
            const secondCoinSwap: ICoinState = {
                    coin: secondCoin,
                    count:'0'
            }
            const balanceFirstCoin=0;
            const balanceSecondCoin=0;
            state = {
                buttons:[],
                balanceFirstCoin,
                balanceSecondCoin,
                firstCoin: firstCoinSwap,
                secondCoin: secondCoinSwap,
                priceCoin: 0,
                isInited: true,
                error:""
            };
        }
        state.priceCoin = state.secondCoin!.coin.price / state.firstCoin!.coin!.price
        const firstCoinInWallet = props.account.wallet.coins.find(c=>c.name === state.firstCoin?.coin.name);
        let BalanceFirstCoin = 0;
        if(firstCoinInWallet != null)
        {
            BalanceFirstCoin = firstCoinInWallet.count;
        }
        const secondCoinInWallet = props.account.wallet.coins.find(c=>c.name === state.secondCoin?.coin.name);
        let BalanceSecondCoin = 0;
        if(secondCoinInWallet != null)
        {
            BalanceSecondCoin = secondCoinInWallet.count;
        }
        state.balanceFirstCoin = BalanceFirstCoin;
        state.balanceSecondCoin = BalanceSecondCoin;
        return state;
    }
    handleFirstCoinCountChange = (e:React.ChangeEvent<HTMLInputElement>):void => {
        let {target:{value}} = e;
        if(this.validationCount(value))
        {
           this.updateCountCoin(value);
        }
    };
    updateCountCoin = (value:string) =>{
        const firstCoin: ICoinState = {
            coin: this.state.firstCoin?.coin!,
            count: value,
        }
        const sV = +value/this.state.priceCoin!
        const secondCoin: ICoinState = {
            coin: this.state.secondCoin?.coin!,
            count: sV.toString(),
        }
        this.setState({
            firstCoin,
            secondCoin,
            error:""
        })
    }
    handleSecondCoinCountChange = (e:React.ChangeEvent<HTMLInputElement>):void => {
        let {target:{value}} = e;
        if(this.validationCount(value))
        {
            const secondCoin: ICoinState = {
                coin: this.state.secondCoin?.coin!,
                count: value,
            }
            const sV = +value*this.state.priceCoin!
            const firstCoin: ICoinState = {
                coin: this.state.firstCoin?.coin!,
                count: sV.toString(),
            }
            this.setState({
                secondCoin,
                firstCoin
            })
        }
    };
    handleSwapCoin = () =>{
        const temp = this.state.firstCoin;
        this.setState({
            firstCoin:this.state.secondCoin,
            secondCoin: temp
        })
    }
    handleSwap = (isConnectedWallet:boolean) =>{
        if(!isConnectedWallet){
            ConnectWalletAction();
        }
        else{
            if(+this.state.firstCoin!.count> this.state.balanceFirstCoin)
            {
                this.setState({
                    error: "Insufficient balance"
                })
            }
            else{
                const walletSwap: IWalletSwapCoin = {
                    fromCoin: {
                        name: this.state.firstCoin!.coin.name,
                        count: +this.state.firstCoin!.count
                    },
                    toCoin:{
                        name: this.state.secondCoin!.coin.name,
                        count: +this.state.secondCoin!.count
                    }
                }
                SwapCoinAction(this.props.account,walletSwap);
                this.setState({
                    firstCoin:{
                        coin: this.state.firstCoin!.coin,
                        count: "0"
                    },
                    secondCoin:{
                        coin: this.state.secondCoin!.coin,
                        count: "0"
                    }
                });
            }
           
        }
    }
    coinFirstSelect = (coin: ICoin)=>{
        this.setState({
            firstCoin:{
                coin,
                count: "0"
            } ,
            secondCoin:{
                coin: this.state.secondCoin!.coin,
                count: "0"
            }
        })
    }
    coinSecondSelect = (coin: ICoin)=>{
        this.setState({
            secondCoin:{
                coin,
                count: "0"
            },
            firstCoin:{
                coin: this.state.firstCoin!.coin,
                count: "0"
            }
        })
    }
    handleSelectFirstCoin = ()=>{
        this.props.OnClickCoin(this.coinFirstSelect);
    }
    handleSelectSecondCoin = ()=>{
        this.props.OnClickCoin(this.coinSecondSelect);
    }

    handleMaxBalanceClick = (e:React.SyntheticEvent<HTMLAnchorElement>) =>{
        this.setState({
            firstCoin: {
                coin: this.state.firstCoin!.coin,
                count: this.state.balanceFirstCoin.toString()
            }
        })
        this.updateCountCoin(this.state.balanceFirstCoin.toString());
    }

    render(): React.ReactNode {
        const {firstCoin,secondCoin, priceCoin, buttons, balanceFirstCoin, balanceSecondCoin,error} = this.state;
        const { account , platform} = this.props;
        const {wallet} = account;
        const {isConnected} = wallet!;
        const slippageTolerance = platform.slippageTolerance;
        
        return (
            <Fragment>
                <WindowHeader buttons={buttons} title='Swap'/>
                <div className='swapContainer'>
                    <SelectCoin showBalance={true} canChangeCoin={true} readonly={false} OnClickCoin={this.handleSelectFirstCoin} MaxBalanceClick={this.handleMaxBalanceClick} coin={firstCoin?.coin!} OnChange={this.handleFirstCoinCountChange}  balance={balanceFirstCoin} title='From' countCoin={firstCoin?.count!} direction={true}></SelectCoin>
                    <div onClick={this.handleSwapCoin} className='marginLeftRightAuto iconDir'>
                        <img className='center' src={arrow}></img>
                    </div>
                    <SelectCoin showBalance={true} canChangeCoin={true} readonly={false} OnClickCoin={this.handleSelectSecondCoin} coin={secondCoin?.coin!} OnChange={this.handleSecondCoinCountChange}   balance={balanceSecondCoin} title='To' countCoin={secondCoin?.count!} direction={false}></SelectCoin>
                    <div className='swapInfo' >
                        <div>
                            <p className='MulishText'>Slippage Tolerance</p>
                            <p className='marginLeftAuto MulishText' >{slippageTolerance}%</p>
                        </div>
                        <div>
                            <p className='MulishText'>Price</p>
                            <p className='marginLeftAuto MulishText'>{priceCoin} {firstCoin?.coin.name} for {secondCoin?.coin.name}</p>
                        </div>
                    </div>
                    <a className='swapButton' onClick={()=>this.handleSwap(isConnected)}>
                        <p className='MulishText'>
                            {!isConnected ? CONNECT_WALLET_TEXT : "Swap"}   
                        </p>
                    </a>
                    { error.length>0 &&
                        <div className='swapError'>
                            <p className='MulishText'>{error}</p>
                        </div>
                    }
                </div>
              
          </Fragment>
        )
    }

    
}

export default Swap;