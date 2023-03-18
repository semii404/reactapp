import { combineReducers } from 'redux';
import {
   counterSlice,
   postsSlice,
   loginSlice,
} from './Slices/sampleSlice'



const rootReducer = combineReducers({
  counter:counterSlice.reducer ,
  posts:postsSlice.reducer,
  login:loginSlice.reducer,
 
});


export default rootReducer;