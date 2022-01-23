
import thunk, { ThunkAction } from 'redux-thunk'
import IPriceTON from '../types/priceTONType';
import {GET_PRICE_TON} from '../constants/actionConstants';
import {GetPriceTON} from '../TonApi/platfromApi';
import {GetPriceTONActionType} from "../actions/platformActions"

function GetPriceTONAction(): ThunkAction<void, IPriceTON, unknown, GetPriceTONActionType> {
    return async function (dispatch) {
      const price = await GetPriceTON();
      dispatch({
        type: GET_PRICE_TON,
        price
      })
    }
}
export default GetPriceTONAction;