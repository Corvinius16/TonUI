
import { ThunkAction } from 'redux-thunk'
import IPlatrform, { IPool } from '../../types/PlatformType';
import {UPDATE_PLATFORM_INFO} from '../../constants/actionConstants';
import {GetPriceTON, GetCoins, GetPools, AddPool, RemovePool} from '../../TonApi/platfromApi';
import {UpdatePlatformActionType} from "../../actions/platformActions"

function UpdatePlatformThunk(): ThunkAction<void, IPlatrform, unknown, UpdatePlatformActionType> {
    return async function (dispatch) {
      const priceTON = await GetPriceTON();
      const coins = await GetCoins();
      const pools = await GetPools();
      dispatch({
        type: UPDATE_PLATFORM_INFO,
        priceTON,
        coins,
        pools
      })
    }
}
function addPoolThunk(platform: IPlatrform, pool: IPool): ThunkAction<void, IPlatrform, unknown, UpdatePlatformActionType> {
  return async function (dispatch) {
    const {priceTON,coins} = platform;
    const pools = await AddPool(platform,pool);
    dispatch({
      type: UPDATE_PLATFORM_INFO,
      priceTON,
      coins,
      pools
    })
  }
}
function removePoolThunk(platform: IPlatrform, pool: IPool): ThunkAction<void, IPlatrform, unknown, UpdatePlatformActionType> {
  return async function (dispatch) {
    const {priceTON,coins} = platform;
    const pools = await RemovePool(platform,pool);
    dispatch({
      type: UPDATE_PLATFORM_INFO,
      priceTON,
      coins,
      pools
    })
  }
}
export const UpdatePlatform = UpdatePlatformThunk;
export const addPool = addPoolThunk;
export const removePool = removePoolThunk;