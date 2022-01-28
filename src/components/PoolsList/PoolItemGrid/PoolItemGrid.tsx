import React, { Component } from 'react';
import { CONNECT_WALLET_TEXT } from '../../../constants/TextConstants';
import { ConnectWalletAction } from '../../../ThunkActions/StoreCall/AccountStoreCall';
import IAccount from '../../../types/AccountType';
import { ICoin, IPool } from '../../../types/PlatformType';
import Window from '../../Window/Window';
import './PoolItemGrid.css'

interface IPoolProps{
    pool: IPool,
    account: IAccount,
    ClickStake: (firstCoin:ICoin,secondCoin:ICoin,isStaking: boolean)=>void,
}

class PoolItemGrid extends Component<IPoolProps>{
    handleConnectWallet = () =>{
        ConnectWalletAction();
    }
    render(): React.ReactNode {
        const {pool: {swapCoins, APR, Liquidity,Earned},account} = this.props;
       
        const {wallet:{isConnected}} = account;
        const accountPool = account.pools.find(x=>x.swapCoins.fromCoin.coin == swapCoins.fromCoin.coin && x.swapCoins.toCoin.coin == swapCoins.toCoin.coin);
        const isStaking: boolean =  accountPool!= null;
        
        return (
            <Window className='poolItemGridWindow'>
                <div className='poolItemGridContainer'>
                    <div className='poolItemGridContainerName'>
                        <div className='poolItemGridContainerLogos'>
                            <div className='poolItemGridContainerLogosBack'>
                                <img src={swapCoins.fromCoin.coin.icon}/>
                            </div>
                            <div className='poolItemGridContainerLogosBack'>
                                <img src={swapCoins.toCoin.coin.icon}/>
                            </div>
                        </div>
                        <div className='poolNames'>
                                <p className='MulishText'>{swapCoins.fromCoin.coin.name + '-'+ swapCoins.toCoin.coin.name}</p>
                        </div>
                    </div>
                    <div className='poolInfoContainer'>
                        <div className='poolInfo'>
                            <p className='MulishText poolInfoHeader'>Earned</p>
                            <p className='MulishText poolInfoText'>{Earned}</p>
                        </div>
                        <div className='poolInfo'>
                            <p className='MulishText poolInfoHeader'>APR</p>
                            <p className='MulishText poolInfoText'>{APR}%</p>
                        </div>
                        <div className='poolInfo'>
                            <p className='MulishText poolInfoHeader'>Liquidity</p>
                            <p className='MulishText poolInfoText'>{Liquidity}$</p>
                        </div>
                    </div>
                    <div>
                        {!isConnected && 
                            <a className='stakePoolGrid' onClick={this.handleConnectWallet}> 
                                <p>
                                    Connect
                                </p>
                            </a>
                        }
                        {isConnected &&
                            <a onClick={()=>this.props.ClickStake(swapCoins.fromCoin.coin,swapCoins.toCoin.coin,isStaking)} className={`stakePoolGrid ${!isStaking ? "stakeButton" : "unstakeButton"}`}> 
                                <p>
                                {(isStaking ? "Unstake" : "Stake")}
                                </p>
                            </a>
                        }
                    </div>
                      
                </div>
            </Window>
        )
    }
}

export default PoolItemGrid;