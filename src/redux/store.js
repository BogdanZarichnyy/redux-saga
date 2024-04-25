import { configureStore, combineReducers } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';

import { helloSaga, rootSaga } from './sagas/rootSaga'
// import { takeEvery } from 'redux-saga/effects'

// import { testReducer}  from './slices/testSlice';
import counterReducer  from './reducers/counter';
import newsReducer from './reducers/news';
import errorsReducer from './reducers/errors';

const sagaMiddleware = createSagaMiddleware();

const combine = combineReducers({
    // test: testReducer,
    counter: counterReducer,
    news: newsReducer,
    errors: errorsReducer
});


export const store = configureStore({
    reducer: combine,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
    devTools: true,
});

sagaMiddleware.run(helloSaga);
sagaMiddleware.run(rootSaga);