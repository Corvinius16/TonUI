import React, { Component } from 'react';
import Window from '../Window/Window'
import './Swap.css'
import updateIcon from './update.svg';
import WindowHeader, {IWindowButton} from '../Window/WindowHeader/WindowHeader';

import settingsIcon from './settings.svg';



class Swap extends Component{
   
    buttons: IWindowButton[];
    constructor(props:any){
        super(props);
        this.buttons = [
            {
                icon:updateIcon,
                OnClick: this.handleUpdateClick
            },
            {
                icon:settingsIcon,
                OnClick: this.handleUpdateClick
            }
        ]
    }
    handleUpdateClick(){
        console.log("fsgsdfg");
    }
    handlSettingsClick(){
        console.log("fsgsdfg2");
    }
    render(): React.ReactNode {
        return (
            <Window className='swap'>
                <WindowHeader buttons={this.buttons} title='Swap'/>
            </Window>
        )
    }
}

export default Swap;