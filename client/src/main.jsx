import React from 'react'
import ReactDOM from 'react-dom/client'
import { unstable_HistoryRouter as HistoryRouter, Routes, Route } from "react-router-dom";
import { createBrowserHistory } from "history";
import store from './store/index.js'
import { Provider } from 'react-redux'

import Home from './views/Home'
import Login from './views/Login'
import Register from './views/Register'
import Profile from './views/Profile'
import Follow from './views/Follow'

import Navbar from './components/Navbar'
import './utils/axios'
import './assets/index.css'
import './assets/tailwind.css'

const history = createBrowserHistory({ window });

const root = ReactDOM.createRoot(
  document.getElementById("root")
);

root.render(
  <HistoryRouter history={history}>
    <Provider store={store} >
      <div className='flex w-full' >
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="home" element={<Home />} />
          <Route path=":username" element={<Profile />} />
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
          <Route path=":username/:type" element={<Follow />} />
        </Routes>
      </div>

    </Provider>
  </HistoryRouter>
);