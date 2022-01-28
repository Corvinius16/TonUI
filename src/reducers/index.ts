import { combineReducers } from 'redux';
import account from './account';
import platform from './platform';
import theme from './theme'
const rootReducer = combineReducers({account,platform,theme});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
