import { GET_PRICE_TON } from '../constants/actionConstants';
import  IPlatrform  from '../types/priceTONType';
import  {GetPriceTONActionType} from '../actions/platformActions'

type platrformState = IPlatrform;

const initialPlatformState: IPlatrform = {
    price: 0,
}
const platformTONPrice = (state = initialPlatformState, action: GetPriceTONActionType): platrformState=> {
  switch (action.type) {
    case GET_PRICE_TON :
        const {price} = action;
        state = {
            price
        }
        return state;
    default:
      return state;
  }
}
  
export default platformTONPrice;

