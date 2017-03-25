import {combineReducers} from 'redux';

// Defined types, can be based on your scenes that you want they get data each the other.
const types = {
  dataScene1: 'textScene1',
  dataScene3: 'textScene3'
}

// Defined actions
export const actionCreators = {
  storeDataScene1 (params){
    return {
      type: types.dataScene1,
      payload: params,
    }
  },

  storeDataScene3 (params){
    return {
      type: types.dataScene3,
      payload: params,
    }
  }
}

const initialState = {};

// Store your data to Redux based on your action
const searchReducer = (state = initialState, action) => {
  const {type, payload} = action;
  switch(type) {
    case types.dataScene1: {
      return {
        ...state,
        params: payload,
      }
    }
    case types.dataScene3: {
      return {
        ...state,
        params: payload,
      }
    }
    default:
      return state;
  }
}

export default combineReducers({
  searchReducer,
})
