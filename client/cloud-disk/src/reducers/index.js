import {applyMiddleware, combineReducers, createStore} from 'redux';
import { composeWithDevTools  } from "redux-devtools-extension";
import userReducers from './userReducers';
import fileReducers from './fileReducers';
import thunk from 'redux-thunk';


const rootReducer = combineReducers({
    user: userReducers,
    files: fileReducers
})

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))
