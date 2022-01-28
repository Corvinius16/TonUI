import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './containers/App';
import store from './store/store';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './containers/Home/Home'
import SwapWindow from './containers/SwapWindow/SwapWindow'
import PoolsList from './containers/PoolsList/PoolList'
import './index.css';
import Loader from './containers/Loader/Loader';

ReactDOM.render((
  <Provider store={store}>
    <BrowserRouter>
      <App>
        <Routes>
          <Route path='/' element={<Loader><Home/></Loader>} />
          <Route path='/swap' element={<Loader><SwapWindow/></Loader>} />
          <Route path='/pools' element={<Loader><PoolsList/></Loader>} />
        </Routes>
      </App>
    </BrowserRouter>
  </Provider>
), document.getElementById('root'));