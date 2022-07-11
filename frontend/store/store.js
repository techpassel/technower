import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { createWrapper } from "next-redux-wrapper";
import { userLoginReducer, userRegisterReducer } from './reducers/userReducer';
import monitorReducerEnhancer from './enhancers/monitorReducerEnhancer'

// initial states
const initalState = {};

//reducer
const reducer = combineReducers({
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer
});


// creating store
export const store = configureStore({
    reducer,
    middleware: (getDefaultMiddleware) => [...getDefaultMiddleware()],    //We have written this way so that in future we can ad more middlewares here.
    initalState,
    enhancers: [monitorReducerEnhancer]        //monitorReducersEnhancer logs the time taken for the reducers to process each action.
})
/*
    By default, configureStore from Redux Toolkit will:
    Call applyMiddleware with a default list of middleware, including redux-thunk, and some development-only middleware that catch common mistakes like mutating state
    Call composeWithDevTools to set up the Redux DevTools Extension
*/

/*
    When using Redux with server rendering, we must also send the state of our app along in our 
    response, so the client can use it as the initial state. This is important because, if we 
    preload any data before generating the HTML, we want the client to also have access to this 
    data. Otherwise, the markup generated on the client won't match the server markup, and the 
    client would have to load the data again.
    To achieve this we need to follow the following steps :
    1.) Initialize and create a new redux store for new user request
    2.) (Optional) Populate the store with information, for example, you could make use of the 
        user-cookies in the request to identify the user and populate the store with the user 
        information.
    3.) Send the redux state to the client
    4.) The client then uses the received state to initialize the client-side redux store.
*/
// assigning store to next wrapper
const makeStore = () => store;

export const wrapper = createWrapper(makeStore);