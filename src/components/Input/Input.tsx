import React, { Component, Fragment } from 'react';
import './Input.css'

interface IInputProps{
    value:string,
    OnChange: (e: React.ChangeEvent<HTMLInputElement>) =>void;
    placeholder: string

}
class CustomInput extends Component<IInputProps>{
    render(): React.ReactNode {
        const {value, OnChange, placeholder} = this.props;
        return (
            <input value={value} onChange={OnChange}  className='MulishText CustomInput' placeholder={placeholder}></input>
        )
    }
}

export default CustomInput;