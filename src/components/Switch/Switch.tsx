

import React, { Component } from 'react';
import './Switch.css'

interface ISwitchProps{
    checked:boolean
    ChangeCheck: (e:React.ChangeEvent<HTMLInputElement>)=>void;
}

class Switch extends Component<ISwitchProps>{
    render(): React.ReactNode {
        const {checked,ChangeCheck} = this.props;
        return (
            <label className="switch marginBottomTopAuto">
                <input onChange={ChangeCheck} checked={checked} type="checkbox"/>
                <span className="slider round"></span>
            </label>
        )
    }
}

export default Switch;