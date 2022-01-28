import {UpdatePlatform,addPool, removePool } from '../Thunk/platform';
import { UpdatePlatformActionType } from '../../actions/platformActions';
import { ThunkDispatch } from 'redux-thunk';
import store from '../../store/store'
import IPlatform, { IPool } from '../../types/PlatformType';
export const UpdatePlatrformAction = () =>{
    (store.dispatch as ThunkDispatch<IPlatform, unknown, UpdatePlatformActionType>)(UpdatePlatform())
}
export const AddPoolAction = (platform: IPlatform,pool:IPool) =>{
    (store.dispatch as ThunkDispatch<IPlatform, unknown, UpdatePlatformActionType>)(addPool(platform,pool))
}
export const RemovePoolAction = (platform: IPlatform,pool:IPool) =>{
    (store.dispatch as ThunkDispatch<IPlatform, unknown, UpdatePlatformActionType>)(removePool(platform,pool))
}