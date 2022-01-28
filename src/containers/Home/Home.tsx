import React, { Component } from 'react';
import Window from '../../components/Window/Window';
import "./Home.css"
import backImg from "./HomeBack.svg";
import frontImg from "./HomeFront.svg";



class Home extends Component{
    
    render(): React.ReactNode {
        return (
            
            <div className='HomeContainer'>
                <Window className='HomeWindow'>
                    <div className='WindowImg'>
                        <img className="BackHomeWindowImg" src={backImg}/>
                        <img className="FrontHomeWindowImg" src={frontImg}/>
                    </div>
                    <div className='TextHeaderHome'>
                        <h1 className='MulishText'>What is TON?</h1>
                        <h2 className='MulishText'>Learn about Toncoin and more</h2>
                    </div>
                </Window>
                <div className='HomeAbout'>
                    <h2 className='MulishText'>
                        Welcome to The Open Network
                    </h2>
                    <p className='MulishText'> 
                        TON is a third-generation proof-of-stake blockchain designed in 2018 by the Durov brothers, the founders of Telegram Messenger. Later, it was handed over to our open TON Community, which has been supporting and developing it ever since.
                        <br/>
                        <br/>
                        TON was designed for lightning-fast transactions. It's ultra-cheap, user-friendly, and fully operational.
                    </p>
                    <h3 className='MulishText'>
                         Welcome to The Open Network
                    </h3>
                    <p className='MulishText'>
                        TON is a third-generation proof-of-stake blockchain designed in 2018 by the Durov brothers, the founders of Telegram Messenger. Later, it was handed over to our open TON Community, which has been supporting and developing it ever since.
                        <br/>
                        <br/>
                        TON was designed for lightning-fast transactions. It's ultra-cheap, user-friendly, and fully operational.
                    </p>
                </div>
            </div>
            
        )
    }
}

export default Home;