import React, { Component, Fragment } from 'react';
import './WindowHeader.css'
interface IWindowButton{
    icon:string,
    OnClick: ()=>void
}
interface IWindowHeaderProps{
    className?:string,
    title?:string
    buttons?: IWindowButton[]
}
class WindowHeader extends Component<IWindowHeaderProps>{
    render(): React.ReactNode {
        const {className, title, buttons} = this.props;
       // const isButtons:boolean = (buttons != null && buttons.length > 0) ? true : false;

        return (
            <Fragment>
                <div className={`WindowHeader ${className}`}> 
                <div className='WindowHeaderContainer'>
                    <h2 className='MulishText'>{title}</h2>
                    <div className='WindowHeaderButtons'>
                        {buttons!.map(({ icon, OnClick }) => (
                             <a key={icon} onClick={()=>OnClick()}><img src={icon} /></a>
                        ))}
                    </div>
                </div>
                </div>
                <div className='line'/>
            </Fragment>
        )
    }
}

export default WindowHeader;
export type {IWindowButton};