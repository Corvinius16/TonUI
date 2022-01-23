import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './Header.css';
import logo from './logo.svg';
import coinImg from './coin.svg';
import settingsImg from "./settings.svg";
import {CONNECT_WALLET_TEXT} from '../../constants/TextConstants';
interface IHeaderLink{
    href:string,
    title:string
}

const links: IHeaderLink[] = [
    {
        href:"/",
        title:"Home"
    },
    {
        href:"/swap",
        title:"Swap"
    },
    {
        href:"/pools",
        title: "Pool"
    }
]

interface IHeaderProps{
    priceTON: number
    ConnectWalletClick: ()=>void
    accountId:string,
    isConnectedToWallet: boolean

}

class Header extends Component<IHeaderProps>{

    connectWalletHandler(){
        const {isConnectedToWallet} = this.props
        const { ConnectWalletClick } = this.props;
        if(!isConnectedToWallet){
            ConnectWalletClick();
        }
    }

    render(): React.ReactNode {
        const { priceTON } = this.props;
        const {isConnectedToWallet,accountId} = this.props;
        return (
            <div>
                <div className='header'>
                    <div className='navigationMenu'>
                        <img src={logo}></img>
                        <nav>
                            <ul className='nav'>
                                {links.map(({ href, title }) => (
                                    <li key={href+title}><NavLink className={'Text'} to={href}>{title}</NavLink></li>
                                ))}
                            </ul>
                        </nav>
                    </div>
                    <div className='settingsContainer'>
                        <img className='marginBottomTopAuto' height={'24px'} src={coinImg}/>
                        <p className='Text marginBottomTopAuto price'>${priceTON}</p>
                        <a className='marginBottomTopAuto link flex'><img height={'20px'} className='marginBottomTopAuto' src={settingsImg}/></a>
                        <a className='connectWallet' onClick={()=>this.connectWalletHandler()}>
                            <p className='Text'>
                                {!isConnectedToWallet ? CONNECT_WALLET_TEXT : accountId}
                            </p>
                        </a>
                        
                    
                    </div>
                </div>
                <div className='line'>

                </div>
            </div>
           
        )
    }
}

export default Header;