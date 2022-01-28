import { GET_PRICE_TON, UPDATE_PLATFORM_INFO } from '../constants/actionConstants';
import {ICoin, IPool} from '../types/PlatformType'


interface IPlatformUpdateAction{
    type: typeof UPDATE_PLATFORM_INFO,
    priceTON: number,
    coins: ICoin[],
    pools: IPool[]
}

export type UpdatePlatformActionType = IPlatformUpdateAction;

