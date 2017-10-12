import { combineReducers } from 'redux';

import posts from './Post';
import categories from './Categories';
import comments from './Comments';

export default combineReducers({
  posts,
  categories,
  comments
});