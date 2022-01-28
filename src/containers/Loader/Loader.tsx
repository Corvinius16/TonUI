import React, { Component } from 'react';
import { connect } from 'react-redux';
import IAccount from '../../types/AccountType';
import IPlatrform from '../../types/PlatformType';
import './Loader.css'

interface PropsInterface {
    avatar: string;
    loggedIn: boolean;
    fullName: string;
  }
interface ILoaderProps {
    platform? : IPlatrform
    account? : IAccount
    children?: React.ReactNode,

}
interface ILoaderState{
    isInited: boolean
}
class Loader extends Component<ILoaderProps, ILoaderState>{

    state: ILoaderState = {
        isInited: false,
    }

    static getDerivedStateFromProps(props:ILoaderProps, state:ILoaderState)  {
        const {platform } = props;
        if(!state.isInited){
            if(platform != null && platform.isInited ){
                state.isInited = true;
                return state;
            }
        }
        
        return state;
    }
    render(): React.ReactNode {
       const {isInited} = this.state;
       const {children,platform,account} = this.props;
       if(!isInited)
       {
            return (
                <div className='loaderContainer'>
                    <div className='loaderAnim'> 
                        <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
                    </div>
                </div>
              
            
            )
       }
       else{
            return (React.cloneElement(children as React.ReactElement<any>, {
                platform: {platform},
                account: {account},
            }))
       }
 
    }
}

export default connect(
    (state) => ({
      ...state,
    }), {
    }
  )(Loader);