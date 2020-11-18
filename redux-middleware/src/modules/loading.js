import { createAction, handleActions } from 'redux-actions';

const START_LOADING = 'loading/START_LOADING';
const FINISH_LOADING = 'loading/FINISH_LOADING';
/*
const MY_ACTION = 'sample/MY_ACTION'
const myAction = createAction(MY_ACTION);
const action = myAction('hello world');
결과 : {type:MY_ACTION, payload:'hello world'}
*/
export const startLoading = createAction(
    START_LOADING,
    requestType=>requestType
);
export const finishLoading = createAction(
    FINISH_LOADING,
    requestType=>requestType
)

const initialState = {};

const loading = handleActions(
    {
        [START_LOADING]:(state,action) => ({
            ...state,
            [action.payload]:true
        }),
        [FINISH_LOADING]:(state,action)=>({
            ...state,
            [action.payload]:false
        })
    },
    initialState
);
export default loading;