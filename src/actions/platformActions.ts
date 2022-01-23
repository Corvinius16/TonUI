import { GET_PRICE_TON } from '../constants/actionConstants';
interface IGetPriceTONAction{
    type: typeof GET_PRICE_TON,
    price:number
}
export type GetPriceTONActionType = IGetPriceTONAction;

export const GetPriceTON = () : GetPriceTONActionType =>({
    type: GET_PRICE_TON,
    price: 0
});



