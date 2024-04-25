// import { useState } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { increaseCount, decreaseCount, getLatestNews, getNews } from './redux/actions/actionCreator';

import News from './components/news/news';
import Header from "./components/header/header";
import Footer from "./components/footer/footer";

import './App.css';

function App({ children }) {
  const count = useSelector(store => store?.counter?.count);
  const latestNews = useSelector(store => store?.news?.latestNews || []);
  const popularNews = useSelector(store => store?.news?.popularNews || []);
  const { latestNewsError, popularNewsError } = useSelector(store => store?.errors || {});
  const dispatch = useDispatch();

  // const [count, setCount] = useState(0);

    
  const handlerDecrease = () => {
    // setCount(count - 1);
    dispatch(decreaseCount());
  }

  const handlerIncrease = () => {
    // setCount(count + 1);
    dispatch(increaseCount());
  }

  const handlerGetNews = () => {
    // setCount(count + 1);
    // dispatch(getLatestNews());
    dispatch(getNews());
  }

  return (
    // <div className="App">
    //   <h1>Hello world</h1>
    //   <button onClick={handlerDecrease}>-1</button>
    //   <button onClick={handlerIncrease}>+1</button>
    //   <p>Count: {count}</p>
    //   <button onClick={handlerGetNews}>Get news</button>
    //   <News news={latestNews} error={latestNewsError} title="Latest News" />
    //   <News news={popularNews} error={popularNewsError} title="Popular News" />
    // </div>
    <>
      <Header />
        <main>
          {children}
        </main>
      <Footer />
    </>
  );
}

export default App;