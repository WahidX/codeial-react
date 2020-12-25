import { combineReducers } from 'redux';
import posts from './posts';
import user from './user';
import friends from './friends';

export default combineReducers({
  user,
  posts,
  friends,
});
