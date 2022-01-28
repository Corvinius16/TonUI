import React, { Component } from 'react';
import { CONNECT_WALLET_TEXT } from '../../../constants/TextConstants';
import { ConnectWalletAction } from '../../../ThunkActions/StoreCall/AccountStoreCall';
import IAccount from '../../../types/AccountType';
import { ICoin, IPool } from '../../../types/PlatformType';
import './PoolItemTable.css'

interface IPoolProps{
    pool: IPool,
    account: IAccount,
    ClickStake: (firstCoin:ICoin,secondCoin:ICoin,isStaking: boolean)=>void,
}

class PoolItemTable extends Component<IPoolProps>{
    handleConnectWallet = () =>{
        ConnectWalletAction();
    }
    render(): React.ReactNode {
        const {pool: {swapCoins, APR, Liquidity,Earned},account} = this.props;
       
        const {wallet:{isConnected}} = account;
        const accountPool = account.pools.find(x=>x.swapCoins.fromCoin.coin == swapCoins.fromCoin.coin && x.swapCoins.toCoin.coin == swapCoins.toCoin.coin);
        const isStaking: boolean =  accountPool!= null;
        
        return (
            <tr>
                <td>
                    <div className='poolItem'>
                        <div className='poolLogos'>
                            <div className='poolLogosBack'>
                                <img src={swapCoins.fromCoin.coin.icon}/>
                            </div>
                            <div className='poolLogosBack'>
                                <img src={swapCoins.toCoin.coin.icon}/>
                            </div>
                            
                           
                        </div>
                    </div>
                </td>
                <td>
                    <div className='poolItem'>
                        <div className='poolNames'>
                            <p className='MulishText'>{swapCoins.fromCoin.coin.name + '-'+ swapCoins.toCoin.coin.name}</p>
                        </div>
                    </div>
                </td>
                <td>
                    <div className='poolItem'>
                        <div className='poolInfo'>
                            <p className='MulishText poolInfoHeader'>Earned</p>
                            <p className='MulishText poolInfoText'>{Earned}</p>
                        </div>
                    </div>
                </td>
                <td>
                    <div className='poolItem'>
                        <div className='poolInfo'>
                            <p className='MulishText poolInfoHeader'>APR</p>
                            <p className='MulishText poolInfoText'>{APR}%</p>
                        </div>
                    </div>
                </td>
                <td>
                    <div className='poolItem'>
                        <div className='poolInfo'>
                            <p className='MulishText poolInfoHeader'>Liquidity</p>
                            <p className='MulishText poolInfoText'>{Liquidity}$</p>
                        </div>
                    </div>
                </td>
                <td>
                    <div className='poolItem'>
                    {!isConnected && 
                        <a className='stakePool' onClick={this.handleConnectWallet}> 
                            <p>
                                Connect
                            </p>
                        </a>
                    }
                    {
                        isConnected &&
                        <a onClick={()=>this.props.ClickStake(swapCoins.fromCoin.coin,swapCoins.toCoin.coin,isStaking)} className={`stakePool ${!isStaking ? "stakeButton" : "unstakeButton"}`}> 
                            <p>
                               {(isStaking ? "Unstake" : "Stake")}
                            </p>
                        </a>
                    }
                        
                    </div>
                </td>
            </tr>
            
        )
    }
}

export default PoolItemTable;