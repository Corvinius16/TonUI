import { combineReducers } from 'redux';
import wallet from './wallet';
import platform from './platform';
const rootReducer = combineReducers({wallet,platform});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
