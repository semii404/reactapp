import {  createStore, applyMiddleware } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

//config imports
import rootReducer from "./rootReducer";


const middleware = [thunk];

export const store = createStore(rootReducer, 
    composeWithDevTools(applyMiddleware(...middleware)));


