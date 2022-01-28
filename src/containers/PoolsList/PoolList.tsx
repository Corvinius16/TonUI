import React, { Component } from 'react';
import { connect } from 'react-redux';
import IPlatrform, { ICoin, IPool } from '../../types/PlatformType';
import Window from '../../components/Window/Window';
import "./PoolList.css";
import backImg from "./BackImgWindow.svg";
import frontImg from "./FrontImgWindow.svg";
import PoolTable from '../../components/PoolsList/PoolTable';
import IAccount from '../../types/AccountType';
import AddPool from '../../components/AddPool/AddPool';
import ModalPool from '../../components/Modal/Modal';
import { AddPoolOnAccountAction, RemovePoolOnAccountAction } from '../../ThunkActions/StoreCall/AccountStoreCall';
import { AddPoolAction, RemovePoolAction } from '../../ThunkActions/StoreCall/PlatformStoreCall';
interface IPoolsListProps{
    platform? : IPlatrform
    account? : IAccount
}

interface IPoolListState{
    isCreatePool: boolean,
    titleCreatePoolWindow: string,
    firstCoinStake?:ICoin,
    secondCoinStake?:ICoin
}


class PoolsList extends Component<IPoolsListProps,IPoolListState>{
    state: IPoolListState = {
        isCreatePool: false,
        titleCreatePoolWindow: "Create pool"
    }
    handleCreatePool = () =>{
        this.setState({
            isCreatePool: true,
            titleCreatePoolWindow: "Create pool",
            firstCoinStake:undefined,
            secondCoinStake:undefined,
        })
    }
    handleCloseCreatePool = () =>{
        this.setState({
            isCreatePool: false,
        })
    }
    handleStakePool= (firstCoin:ICoin, secondCoin:ICoin,isStaking:boolean)=>{
        if(!isStaking)
        {
            this.setState({
                isCreatePool: true,
                titleCreatePoolWindow: "Add liquidity",
                firstCoinStake: firstCoin,
                secondCoinStake:secondCoin
            })
        }
        else{
            const pool = this.props.account?.pools.find(el=>el.swapCoins.fromCoin.coin == firstCoin && el.swapCoins.toCoin.coin == secondCoin);
           
           
            RemovePoolOnAccountAction(this.props.account!,pool!);
            RemovePoolAction(this.props.platform!,pool!)
        }
    }

    createPool = (pool: IPool) =>{
        AddPoolOnAccountAction(this.props.account!,Object.assign({}, pool));
        AddPoolAction(this.props.platform!,Object.assign({}, pool)
        );
    }

    render(): React.ReactNode{
        const {platform,account} = this.props;
        const {isCreatePool,titleCreatePoolWindow, firstCoinStake,secondCoinStake} = this.state;
        return (
                <div className='PoolContainer'>
                    <Window className='PoolHeaderWindow'>
                        <div className='WindowImg'>
                            <img className="BackWindowImg" src={backImg}/>
                            <img className="FrontWindowImg" src={frontImg}/>
                        </div>
                        <div className='TextHeader'>
                            <h1 className='MulishText'>Liquidity Pools</h1>
                            <h2 className='MulishText'>Stake LP tokens to earn</h2>
                        </div>
                    </Window>
                    <PoolTable createStakeClick={this.handleStakePool} createPoolClick={this.handleCreatePool} platform={platform!} account={account!}></PoolTable>
                    {isCreatePool && 
                     <ModalPool>
                        <AddPool createPool={this.createPool} firstCoin={firstCoinStake} secondCoin={secondCoinStake} platform={platform!} account={account!}  title={titleCreatePoolWindow} onCloseClick={this.handleCloseCreatePool}></AddPool>
                    </ModalPool>}
                   
                </div>
           
        )
    };
}

export default connect(
    (state) => ({
      ...state,
    }), {
    }
  )(PoolsList);
  
  