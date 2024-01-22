import { createStore , combineReducers} from 'redux';

const initialState = {
  posts: [],
  users: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_POSTS':
      return { ...state, posts: action.payload };
    case 'SET_USERS':
      return { ...state, users: action.payload };
    default:
      return state;
  }
};


const store = createStore(reducer);

export default store;
