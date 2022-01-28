import React, { Component, Fragment } from 'react';
import Dropdown, {IDropDownItem} from '../Dropdown/DropDown';
import IPlatrform, { ICoin, IPool } from '../../types/PlatformType';
import IWallet from '../../types/walletType';
import CustomInput from '../Input/Input';
import Window from '../Window/Window';
import "./PoolTable.css"
import PoolItemTable from './PoolItemTable/PoolItemTable';
import PoolItemGrid from './PoolItemGrid/PoolItemGrid';
import IAccount from '../../types/AccountType';
import { CONNECT_WALLET_TEXT } from '../../constants/TextConstants';
import { ConnectWalletAction } from '../../ThunkActions/StoreCall/AccountStoreCall';
import Switch from '../Switch/Switch';

interface IPoolTableProps{
    platform: IPlatrform,
    account: IAccount,
    createPoolClick: ()=>void,
    createStakeClick: (firstCoin: ICoin, secondCoin:ICoin,isStaking:boolean)=>void
}
interface IPoolTableState{
    typeView : TypePoolView,
    showStaked:boolean,
    filter: FilterTable
    findPoolValue:string
}
enum TypePoolView{
    Grid,
    Table
}

enum FilterTable{
    HOT ="HOT",
    APR = "APR",
    Earned = "Earned",
    Liquidity="Liquidity"
}

const DropDownItems: IDropDownItem[] = [
    {
        id:0,
        selected: true,
        title: FilterTable.HOT
    },
    {
        id:1,
        selected: false,
        title: FilterTable.APR
    },
    {
        id:2,
        selected: false,
        title: FilterTable.Earned
    },
    {
        id:3,
        selected: false,
        title: FilterTable.Liquidity
    },
    
]

class PoolTable extends Component<IPoolTableProps,IPoolTableState>{
    state: IPoolTableState = {
        typeView: TypePoolView.Table,
        showStaked: false,
        filter: FilterTable.HOT,
        findPoolValue: ""
    }
    handleClickType = (typeView: TypePoolView)=>{
        this.setState({
            typeView
        })
    }
    handleClickTypeStaked = () =>{
        this.setState({
            showStaked: !this.state.showStaked
        })
    }
    handleFilterFindChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
        const {target:{value}} = e;
        this.setState({
            findPoolValue: value
        })
    }
    handleChangeFilter = (item: IDropDownItem) =>{
        const enumValue : FilterTable = (FilterTable as any)[item.title];
        this.setState({
            filter: enumValue
        })
    }
    sortByAPR = (pools: IPool[])=>{
        pools.sort((a,b) =>(a.APR<b.APR)?1:((b.APR<a.APR)?-1:0));
    }
    sortByLiquidity = (pools: IPool[])=>{
        pools.sort((a,b) =>(a.Liquidity<b.Liquidity)?1:((b.Liquidity<a.Liquidity)?-1:0));
    }
    sortByEarned = (pools: IPool[])=>{
        pools.sort((a,b) =>(a.Earned<b.Earned)?1:((b.Earned<a.Earned)?-1:0));
    }
    handleCreatePool = ()=>{
        const {account: {wallet: {isConnected}}} = this.props;
        if(!isConnected){
            ConnectWalletAction();
        }
        else{
            this.props.createPoolClick();
        }
    }
    componentDidMount = ()=>{
        if(window.innerWidth < 700){
            this.setState({
                typeView: TypePoolView.Grid
            })
        }
    }
    handleStakePool = (firstCoin: ICoin, secondCoin: ICoin, isStaking: boolean)=>{
        this.props.createStakeClick(firstCoin,secondCoin,isStaking);
    }
    poolsFilters = () :IPool[]=>{
        const {account,platform} = this.props;
        const {showStaked,findPoolValue, typeView} = this.state;
        let pools:IPool[] ;
        if(showStaked)
        {
            pools = [...account.pools];
        }
        else{
            pools = [...platform.pools ].map(item=>({...item}))
        }
        if(findPoolValue != ""){
            pools = pools.filter(function (p) { return p.swapCoins.fromCoin.coin.name.indexOf(findPoolValue.toUpperCase()) != -1 || p.swapCoins.toCoin.coin.name.indexOf(findPoolValue.toUpperCase()) != -1  });
        }
        const {filter} = this.state;
        account.pools.map(el=>{
            const indexP = pools.findIndex(x=>x.swapCoins.fromCoin.coin == el.swapCoins.fromCoin.coin && x.swapCoins.toCoin.coin == el.swapCoins.toCoin.coin);
            if(indexP != -1){
                pools[indexP].Earned = el.Earned;
            }
        });
        switch (filter){
            case FilterTable.APR:
                this.sortByAPR(pools);
                break;
            case FilterTable.Earned:
                this.sortByEarned(pools);
                break;
            case FilterTable.Liquidity:
                this.sortByLiquidity(pools);
        }
        return pools;
    }
    render(): React.ReactNode {
        const {typeView, showStaked,findPoolValue} = this.state;
        const pools = this.poolsFilters();
        const {account: {wallet: {isConnected}}} = this.props;
        const {account} = this.props;
        return (
            <Fragment>
                <div className='filterTable'>
                    <div className='typeView'>
                        <span onClick={()=>this.handleClickType(TypePoolView.Grid)} className={`typeGrid ${typeView==TypePoolView.Grid && 'typeSelect'}`}></span>
                        <span onClick={()=>this.handleClickType(TypePoolView.Table)} className={`typeTable ${typeView==TypePoolView.Table && 'typeSelect'}`}></span>
                        <div className='stakedFilter'>
                            <Switch checked={showStaked} ChangeCheck={this.handleClickTypeStaked} ></Switch>
                            <p className='MulishText marginBottomTopAuto'>Staked Only</p>
                        </div>
                    </div>
                    <div className='filtersContainer'>
                        <div className='filterType'>
                            <Dropdown items={DropDownItems} selectItem={this.handleChangeFilter}></Dropdown>
                        </div>
                        <div className='filterFind'>
                            <CustomInput OnChange={this.handleFilterFindChange} value={findPoolValue} placeholder='Search pools' ></CustomInput>
                        </div>
                        <a onClick={this.handleCreatePool} className={`createPool stakePool`}> 
                            <p>
                             {!isConnected ? CONNECT_WALLET_TEXT : "Create pool"}
                            </p>
                        </a>
                    </div>
                </div>
                {typeView == TypePoolView.Table && 
                    <Window className='pools'>
                        <div className='PoolContainerTable'>
                            <table>
                                <tbody>
                                { pools.map((pool) => (
                                    <PoolItemTable ClickStake={this.handleStakePool} account={account}  key={pool.swapCoins.fromCoin.coin.name+pool.swapCoins.toCoin.coin.name} pool={pool}/>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </Window>
                }
                {typeView ==TypePoolView.Grid &&
                    <div className='PoolContainerGrid'>
                                { pools.map((pool) => (
                                    <PoolItemGrid ClickStake={this.handleStakePool} account={account}  key={pool.swapCoins.fromCoin.coin.name+pool.swapCoins.toCoin.coin.name} pool={pool}/>
                                ))}
                    </div>
                
                }
            </Fragment>
        )
    }
}

export default PoolTable;
