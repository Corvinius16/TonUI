import React, { Component, Fragment } from 'react';
import IAccount from '../../types/AccountType';
import IPlatrform, { ICoin, IPool, IPoolSwap } from '../../types/PlatformType';
import Window from '../Window/Window';
import WindowHeader, { IWindowButton } from '../Window/WindowHeader/WindowHeader';
import SelectCoin from '../Swap/SelectCoinInput/SelectCoinInput';
import SelectCoinWindow from '../Swap/SelectCoinWindow/SelectCoinWindow';
import {AddPoolAction} from '../../ThunkActions/StoreCall/PlatformStoreCall'
import {AddPoolOnAccountAction} from '../../ThunkActions/StoreCall/AccountStoreCall'
import './AddPool.css'
import settingsIcon from '../../assets/settings.svg';
import updateIcon from '../../assets/update.svg';
import closeIcon from '../../assets/close.svg';
import iconPlus from "../../assets/plus.svg";
import usdIcon from "../../assets/dollar.png";
interface IAddPoolProps{
    account: IAccount,
    platform: IPlatrform,
    onCloseClick: ()=>void,
    title: string,
    firstCoin?: ICoin,
    secondCoin?: ICoin
    createPool: (pool:IPool)=>void;
}

interface ICoinState{
    coin:ICoin,
    count: string,
}
interface IAddPoolState{
    error:string,
    buttons: IWindowButton[],
    firstCoin?: ICoinState,
    secondCoin?: ICoinState,
    balanceFirstCoin: number,
    balanceSecondCoin:number,
    isSelectCoin:boolean,
    isInited:boolean,
    price: number,
    UsdCoin:ICoinState,
    callbackSelectCoin?: (coin: ICoin)=>void,
}
class AddPool extends Component<IAddPoolProps,IAddPoolState>{

    state: IAddPoolState = {
        buttons: [],
        firstCoin: {
            coin: {
                icon: "",
                name: "",
                price: 0,
            },
            count:"0"
            
        },
        secondCoin: {
            coin: {
                icon: "",
                name: "",
                price: 0,
            },
            count:"0"
        },
        balanceFirstCoin:0,
        balanceSecondCoin:0,
        isSelectCoin: false,
        isInited:false,
        price:0,
        error:"",
        UsdCoin:{
            coin:{
                name: "USD",
                icon: usdIcon,
                price: 1
            },
            count: "0"
        }
    }
    GetCoinByName = (name:string) :ICoin =>{
        const {coins} = this.props.platform!;
        const coin = coins.find(x=>x.name == name);
        return coin!;
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
            },
            {
                icon:closeIcon,
                OnClick: this.handleCloseClick
            }
        ]
        let fCoin : ICoin;
        let sCoin : ICoin;
        if(this.props.firstCoin == null)
        {
            fCoin=this.GetCoinByName("BNB");
        }
        else{
            fCoin= this.props.firstCoin;
        }
        if(this.props.secondCoin == null)
        {
            sCoin=this.GetCoinByName("TON");
        }
        else{
            sCoin= this.props.secondCoin;
        }
        const firstCoin: ICoinState ={
            coin:  fCoin,
            count: "0"
        }
        const secondCoin: ICoinState ={
            coin: sCoin,
            count: "0"
        }
        const firstCoinInWallet = this.props.account!.wallet.coins.find(c=>c.name === this.state.firstCoin?.coin.name);
        let balanceFirstCoin = 0;
        if(firstCoinInWallet != null)
        {
            balanceFirstCoin = firstCoinInWallet.count;
        }
        const secondCoinInWallet = this.props.account!.wallet.coins.find(c=>c.name === this.state.secondCoin?.coin.name);
        let balanceSecondCoin = 0;
        if(secondCoinInWallet != null)
        {
            balanceSecondCoin = secondCoinInWallet.count;
        }
        this.setState({
            buttons,
            firstCoin,
            secondCoin,
            balanceFirstCoin,
            balanceSecondCoin,
            isSelectCoin:false,
            isInited:true
        })
    }
    handleUpdateClick = () => {
    
    }
    handlSettingsClick = () =>{
        
    }
    handleCloseClick = () =>{
        this.props.onCloseClick();
    }
    handleSelectFirstCoin = ()=>{
        this.setState({
            callbackSelectCoin :(coin:ICoin)=>{
                this.setState({
                    firstCoin:{
                        coin,
                        count: "0"
                    } ,
                    secondCoin:{
                        coin: this.state.secondCoin!.coin,
                        count: "0"
                    },
                    UsdCoin:{
                        coin:this.state.UsdCoin.coin,
                        count:"0"
                    },
                    isSelectCoin:false,
                })
            },
            isSelectCoin: true,
        })
    }
    static getDerivedStateFromProps(props: IAddPoolProps, state: IAddPoolState){
        if(state.isInited)
        {
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
            state.price = state.secondCoin!.coin.price / state.firstCoin!.coin!.price
            state.balanceFirstCoin = BalanceFirstCoin;
            state.balanceSecondCoin = BalanceSecondCoin;
        }
        return state;
    }
    handleSelectSecondCoin = ()=>{
        this.setState({
            callbackSelectCoin :(coin:ICoin)=>{
                this.setState({
                    firstCoin:{
                        coin: this.state.firstCoin!.coin,
                        count: "0"
                    } ,
                    secondCoin:{
                        coin,
                        count: "0"
                    },
                    UsdCoin:{
                        coin:this.state.UsdCoin.coin,
                        count:"0"
                    },
                    isSelectCoin:false,
                })
            },
            isSelectCoin: true,
        })
    }
  
  
    handleClickCloseCoinSelect = ()=>{
        this.setState({
            isSelectCoin:false,
        })
    }
    handleSelectCoin = (coin: ICoin)=>{
        this.state.callbackSelectCoin!(coin);
    }
    validationCount = (val:string) => {
        if (!isNaN(+val))
        {   
            return true;
        }else{
            
            return false;
        }
    }
    handleChangeUsdCount = (e:React.ChangeEvent<HTMLInputElement>):void => {
        let {target:{value}} = e;
        if(this.validationCount(value))
        {
            const halfValue = +value/2;
            const firstCoin : ICoinState = {
                coin: this.state.firstCoin!.coin,
                count: (halfValue/this.state.firstCoin!.coin.price).toString()
            }
            const secondCoin : ICoinState = {
                coin: this.state.secondCoin!.coin,
                count: (halfValue/this.state.secondCoin!.coin.price).toString()
            }
            this.setState({
               UsdCoin:{
                   coin: this.state.UsdCoin.coin,
                   count: value
               },
               firstCoin,
               secondCoin,
               error:""
           })
        }
    };
    handleCreatePool = ()=>{
        if(+this.state.firstCoin!.count > this.state.balanceFirstCoin || +this.state.secondCoin!.count > this.state.balanceSecondCoin)
        {
            this.setState({
                error: "Insufficient balance"
            })
        }
        else{
            const pool: IPool = {
                APR: 0,
                Earned:0,
                Liquidity: +this.state.UsdCoin.count,
                swapCoins:{
                    fromCoin: {
                        coin: this.state.firstCoin!.coin,
                        count: +this.state.firstCoin!.count,
                    },
                    toCoin: {
                        coin: this.state.secondCoin!.coin,
                        count: +this.state.secondCoin!.count,
                    }
                }
    
            }
            this.props.createPool(pool);
            this.props.onCloseClick();
        }
      
    }
    render(): React.ReactNode {
        const {buttons, firstCoin,secondCoin,balanceFirstCoin,balanceSecondCoin,isSelectCoin,price,UsdCoin,error} = this.state;
        const {title,platform,account} = this.props
        return(
            <Window className='addPoolWindow'>
            {isSelectCoin && <SelectCoinWindow CoinSelect={this.handleSelectCoin} OnClose={this.handleClickCloseCoinSelect} platform={platform!} wallet={account?.wallet!}></SelectCoinWindow>}
            <WindowHeader buttons={buttons} title={title}/>
                <div className='addPoolContainer'>
                    <SelectCoin showBalance={true} canChangeCoin={true} readonly={true} OnClickCoin={this.handleSelectFirstCoin} coin={firstCoin!.coin}   balance={balanceFirstCoin} title='' countCoin={firstCoin?.count!} direction={false}></SelectCoin>
                    <div className='marginLeftRightAuto iconPlus'>
                        <img className='center' src={iconPlus}></img>
                    </div>
                    <SelectCoin showBalance={true} canChangeCoin={true} readonly={true} OnClickCoin={this.handleSelectSecondCoin} coin={secondCoin!.coin}   balance={balanceSecondCoin} title='' countCoin={secondCoin?.count!} direction={false}></SelectCoin>
                    <div className='poolInfo' >
                        <div>
                            <p className='MulishText'>Price</p>
                            <p className='marginLeftAuto MulishText'>{price} {firstCoin?.coin.name} for {secondCoin?.coin.name}</p>
                        </div>
                        <div>
                            <p className='MulishText'>Share of pool</p>
                            <p className='marginLeftAuto MulishText' >15%</p>
                        </div>
                    </div>
                    <SelectCoin  OnChange={this.handleChangeUsdCount} showBalance={false} canChangeCoin={false} readonly={false} coin={UsdCoin.coin}   balance={0} title='Usd value' countCoin={UsdCoin.count} direction={false}></SelectCoin>
                    <a className='createPoolButton' onClick={()=>this.handleCreatePool()}>
                        <p className='MulishText'>
                            {title}   
                        </p>
                    </a>
                    { error.length>0 &&
                        <div className='PoolError'>
                            <p className='MulishText'>{error}</p>
                        </div>
                    }
                </div>
            </Window>
        )
    }
}

export default AddPool;