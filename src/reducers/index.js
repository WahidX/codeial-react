import { combineReducers } from 'redux';
import posts from './posts';
import user from './user';
import friends from './friends';
import snackbar from './snackbar';

export default combineReducers({
  user,
  posts,
  friends,
  snackbar,
});
