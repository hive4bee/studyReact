import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
import sample , { sampleSaga } from './sample';
import loading from './loading';

const rootReducer = combineReducers({
    sample,
    loading
});

export function* rootSaga(){
    yield all([ sampleSaga() ]);
}
export default rootReducer;