import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import App from './containers/App';
import store from './store/store';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home/Home'
import Swap from './components/Swap/Swap'
import Pool from './components/Pool/Pool'
import './index.css';

ReactDOM.render((
  <Provider store={store}>
    <BrowserRouter>
      <App>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/swap' element={<Swap/>} />
          <Route path='/pools' element={<Pool/>} />
        </Routes>
      </App>
    </BrowserRouter>
  </Provider>
), document.getElementById('root'));