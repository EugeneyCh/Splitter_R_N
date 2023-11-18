import { combineReducers } from 'redux';
import { tipCount } from './tipCount/tipCount-reducer';

export const rootReducer = combineReducers({
  tipCount,
});
