import { combineReducers } from 'redux';
import operate from './operate ';
import todo from './todo';
const rootReducer = combineReducers({
  operate,
  todo,
});
export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
