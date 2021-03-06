import * as API from '../utils/NetworkAPI';
import * as Types from './ActionTypes.js';

export const fetchCategories = () => {
  return (dispatch) => {
    API.fetchCategories().then(res => {
      dispatch({ type: Types.FETCH_CATEGORY, res });
    });
  }
};
