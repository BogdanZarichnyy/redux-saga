import { 
    take, // блок-ефект yield з генератора виконається тільки перший один раз
    takeEvery, // yield з генератора виконується кожного разу
    takeLatest, // yield з генератора виконується тільки останній кожного разу
    takeLeading, // yield з генератора виконується тільки попередній кожного разу
    select, // аналог useSelect() в redux
    put, // аналог useDispatch() в redux
    call, // блок-ефект який виконує передану в нього функцію
    fork, // не блок-ефект, для паралельного виконання коду, наприклад запитів для АРІ, як правило використовується постійно
    all, // не блок-ефект, також для паралельних задач, аналог Promise.all(), повертає результат коли виконаються всі запити, як правило використовується для обробки "важких" функцій зв'язаних з обробкою даних для прискорення отримання фінального результату
    race, // не блок-ефект, також для паралельних задач, аналог Promise.race(), повертає результат найшвидшого виконаного запиту, як правило використовується для відміни якоїсь фонової задачі яка виконується "вічно" поки щось не відбудеться
    spawn, // не блок-ефект, для створення незалежних задач які не залежать від батьківської саги, і будуть виконуватися навіть якщо інша дочірня сага "впаде", по суті це створення паралельної задачі в корені саги
} from 'redux-saga/effects' 
import { DECREASE_COUNT, INCREASE_COUNT, GET_LATEST_NEWS, GET_POPULAR_NEWS, GET_NEWS, SET_LATEST_NEWS_ERROR, SET_POPULAR_NEWS_ERROR } from '../constants';
import { getLatestNews, getPopularNews } from '../../api/news';
import { setLatestNews, setPopularNews } from '../actions/actionCreator';

const delay = (time) => new Promise((resolve, reject) => {
    setTimeout(resolve, time * 1000)
});

// export function* handleLatestNews() {
//     // const { hits } = yield getLatestNews(); //тут виконується проміс
//     const { hits } = yield call(getLatestNews, 'react'); //тут виконується функція коли проміс виконається, це дозволяється застосовувати тестування
//     console.log(hits);
//     yield put(setLatestNews(hits));
// }

export function* handleLatestNews() {
    // throw new Error(); // 08
    try {
        const { hits } = yield call(getLatestNews, 'react'); //тут виконується функція коли проміс виконається, це дозволяється застосовувати тестування
        console.log('getLatestNews', hits);
        yield put(setLatestNews(hits));
    }
    catch {
        // throw new Error('Error fetching latest news'); // 08
        yield put({ type: SET_LATEST_NEWS_ERROR, payload: 'Error fetching latest news' });
    }
}

export function* handlePopularNews() {
    try {
        const { hits } = yield call(getPopularNews); //тут виконується функція коли проміс виконається, це дозволяється застосовувати тестування
        console.log('getPopularNews', hits);
        yield put(setPopularNews(hits));
    }
    catch {
        yield put({ type: SET_POPULAR_NEWS_ERROR, payload: 'Error fetching popular news' });
    }
}

export function* handleNews() {
    // yield call(handleLatestNews);
    // yield call(handlePopularNews);

    // yield fork(handleLatestNews); // ці два запити виконаються паралельно
    // yield fork(handlePopularNews); // ці два запити виконаються паралельно

    // yield all([ // результат повернеться коли виконаються всі запити, або якщо хоча б один з них "впаде" не повернеться нічого
    //     call(handleLatestNews),
    //     call(handlePopularNews),
    // ]);

    // yield race([ // повернеться результат запиту який виконається найшвидше
    //     call(handleLatestNews),
    //     call(handlePopularNews),
    // ]);

    // yield spawn(handleLatestNews); // 08 ці два запити виконаються паралельно, якщо один з них впаде інший виконається всеодно
    // yield spawn(handlePopularNews); // 08 ці два запити виконаються паралельно, якщо один з них впаде інший виконається всеодно

    yield fork(handleLatestNews); // можна замінити на fork оскільки вже є блок try-catch
    yield fork(handlePopularNews); // можна замінити на fork оскільки вже є блок try-catch
}

export function* workerSaga() {
    // console.log('request 1');
    // yield;

    // const count = yield select(({ counter }) => counter.count);
    // yield delay(2);
    // console.log(`request ${count}`);

    const data = yield getLatestNews();
    console.log(data);
}

export function* watchLatestNewsSaga() {
    yield takeEvery(GET_LATEST_NEWS, handleLatestNews);
}

export function* watchPopularNewsSaga() {
    yield takeEvery(GET_POPULAR_NEWS, handlePopularNews);
}

export function* watchClickSaga() {
    // yield take(INCREASE_COUNT);
    // console.log('request 1');
    // yield take(DECREASE_COUNT);
    // console.log('request 2');

    // yield takeEvery(INCREASE_COUNT, () => console.log('request 1'));
    // yield takeEvery(INCREASE_COUNT, workerSaga);

    // yield takeLatest(INCREASE_COUNT, workerSaga);
    // yield takeLeading(INCREASE_COUNT, workerSaga);

    // yield takeEvery(INCREASE_COUNT, workerSaga);

    // yield takeEvery(GET_LATEST_NEWS, workerSaga);

    // yield takeEvery(GET_LATEST_NEWS, handleLatestNews);

    yield takeEvery(GET_NEWS, handleNews); // 07 паралельні виклики
}

export function* rootSaga() {
    // yield watchClickSaga();
    yield all([
        fork(watchLatestNewsSaga),
        fork(watchPopularNewsSaga)
    ]);
}

export function* helloSaga() {
    yield console.log('Hello saga');
}
