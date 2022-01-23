import React, { Component } from 'react';
import './Window.css'

interface IWindowProps{
    children?: React.ReactNode,
    className?:string
}
class Window extends Component<IWindowProps>{
    render(): React.ReactNode {
        const {children, className} = this.props;
        return (
            <div className={`window ${className}`}>
                {children}
            </div>
        )
    }
}

export default Window;