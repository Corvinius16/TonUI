import React, { Component,createRef} from 'react';
import { NavLink } from 'react-router-dom';
import ReactDOM from 'react-dom';
import './Header.css';
import logo from '../../assets/logo.svg';
import coinImg from '../../assets/coin.svg';
import settingsImg from "../../assets/settings2.svg";

import burger from "../../assets/burger.svg";
import {CONNECT_WALLET_TEXT} from '../../constants/TextConstants';
import Switch from '../Switch/Switch';
import { ThemeType } from '../../types/ThemeType';
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
    UpdateTheme: (theme:ThemeType) =>void
    accountId:string,
    theme: ThemeType,
    isConnectedToWallet: boolean

}

interface IHeaderState{
    isOpenSettings: boolean,
    isOpenMobileMenu:boolean
}

class Header extends Component<IHeaderProps, IHeaderState>{

    state: IHeaderState = {
        isOpenSettings: false,
        isOpenMobileMenu:false
    }
    constructor(props:IHeaderProps){
        super(props);
        this.close = this.close.bind(this);
    }
    connectWalletHandler(){
        const {isConnectedToWallet} = this.props
        const { ConnectWalletClick } = this.props;
        if(!isConnectedToWallet){
            ConnectWalletClick();
        }
    }
    handleChangeTheme = (e:React.ChangeEvent<HTMLInputElement>)=>{
        const {target:{checked}} = e;
        if(checked){
            this.props.UpdateTheme(ThemeType.Dark);
        }
        else{
            this.props.UpdateTheme(ThemeType.Light);
        }
    }
    handleOpenSettings = ()=>{
        if(!this.state.isOpenSettings)
        {
            this.setState({
                isOpenSettings: true,
            })
            
            setTimeout(()=>{
                window.addEventListener('click', this.close)
            },0);
        }
       
    }
    
    close(evt:any){
        if (!this.Settings.current!.contains(evt.target)&&!this.Settings2.current!.contains(evt.target)) {
            this.setState({
                isOpenSettings:false,
            })
            window.removeEventListener('click', this.close)
        }
    }
    handleBurgerMenu = () =>{
        this.setState({
            isOpenMobileMenu: !this.state.isOpenMobileMenu
        })
    }
    Settings = createRef<HTMLDivElement>()
    Settings2 = createRef<HTMLDivElement>()
    render(): React.ReactNode {
        const { priceTON } = this.props;
        const {isConnectedToWallet,accountId,theme} = this.props;
        const { isOpenSettings,isOpenMobileMenu  } = this.state;
        const isDark = theme == ThemeType.Dark;
        return (
            <div>
                <div className='headerMobile'>
                    <div className='headerMobileMenu'>
                        <div className='mobileLogo'>
                            <img className='marginBottomTopAuto' height={"34px"}  src={logo}></img>
                            <h1 className='MulishText'>TON</h1>
                        </div>
                        <div className='headerMobileControls'>
                            <div className='settingsIcon'>
                                <a onClick={this.handleOpenSettings} className='marginBottomTopAuto link flex'><img height={'20px'} className='marginBottomTopAuto' src={settingsImg}/></a>
                                    {isOpenSettings && 
                                        <div ref={this.Settings2} className='settingsModal'>
                                            <div className='settingsModalLine'>
                                                <Switch ChangeCheck={this.handleChangeTheme} checked={isDark} ></Switch>
                                                <p className='MulishText'>Dark Mode</p>
                                            </div>
                                        </div>
                                    }
                            </div>
                            <a onClick={this.handleBurgerMenu} className='marginBottomTopAuto link flex burger'><img height={'14x'} className='marginBottomTopAuto' src={burger}/></a>
                        </div>
                    </div>
                    {isOpenMobileMenu &&
                        <div className='headerMobileMenuDropdown'>
                            <div className='headerMobileMenuDropdownInnerContainer'>
                                <ul className='nav'>
                                    {links.map(({ href, title }) => (
                                        <li key={href+title}><NavLink className={'Text'} to={href}>{title}</NavLink></li>
                                    ))}
                                </ul>
                                <div className='flex'>
                                    <img className='marginBottomTopAuto' height={'15px'} src={coinImg}/>
                                    <p className='Text marginBottomTopAuto price'>${priceTON}</p>
                                </div>
                                <a className='connectWallet' onClick={()=>this.connectWalletHandler()}>
                                    <p className='Text'>
                                        {!isConnectedToWallet ? CONNECT_WALLET_TEXT : accountId}
                                    </p>
                                </a>
                            </div>
                        </div>
                        
                    }
                
                </div>
                <div className='headerDesktop'>
                    <div className='navigationMenu'>
                        <img  src={logo}></img>
                        <h1 className='MulishText'>TON</h1>
                        <nav>
                            <ul className='nav'>
                                {links.map(({ href, title }) => (
                                    <li key={href+title}><NavLink className={'Text'} to={href}>{title}</NavLink></li>
                                ))}
                            </ul>
                        </nav>
                    </div>
                    <div className='settingsContainer'>
                        <img className='marginBottomTopAuto' height={'15px'} src={coinImg}/>
                        <p className='Text marginBottomTopAuto price'>${priceTON}</p>
                        <div className='settingsIcon'>
                            <a onClick={this.handleOpenSettings} className='marginBottomTopAuto link flex'><img height={'20px'} className='marginBottomTopAuto' src={settingsImg}/></a>
                            {isOpenSettings && 
                                <div ref={this.Settings} className='settingsModal'>
                                    <div className='settingsModalLine'>
                                        <Switch ChangeCheck={this.handleChangeTheme} checked={isDark} ></Switch>
                                        <p className='MulishText'>Dark Mode</p>
                                    </div>
                                </div>
                            }
                        </div>

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