import { UPDATE_PLATFORM_INFO } from '../constants/actionConstants';
import  IPlatrform  from '../types/PlatformType';
import  {UpdatePlatformActionType} from '../actions/platformActions'

type platrformState = IPlatrform;

const initialPlatformState: IPlatrform = {
    priceTON: 0,
    coins: [],
    isInited: false,
    slippageTolerance: 0.5,
    pools: []
}
const UpdatePlatform = (state = initialPlatformState, action: UpdatePlatformActionType): platrformState=> {
  switch (action.type) {
    case UPDATE_PLATFORM_INFO :
        const {priceTON, coins} = action;
        state = {
          priceTON,
          coins,
          isInited: true,
          slippageTolerance: state.slippageTolerance,
          pools: action.pools
        }
        return state;
    default:
      return state;
  }
}
  
export default UpdatePlatform;

