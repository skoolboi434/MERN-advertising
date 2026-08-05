import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store.js';
import './scss/custom.scss';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import PublicationDashboard from './screens/PublicationDashboard';
import AdvertisingDashboard from './screens/AdvertisingDashboard';
import SinglePublication from './screens/SinglePublication';
import LoginScreen from './screens/LoginScreen.jsx';
import RegisterScreen from './screens/RegisterScreen.jsx';
import AdvertisersDashboard from './screens/AdvertisersDashboard.jsx';
import SingleAdvertiser from './screens/SingleAdvertiser.jsx';
import UserProfile from './screens/UserProfile.jsx';
import AdminDashboard from './screens/admin/AdminDashboard.jsx';
import AccountsDashboard from './screens/admin/accounts/AccountsDashboard.jsx';
import ClassifiedsDashboard from './screens/admin/classifieds/ClassifiedsDashboard.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index={true} path='/' element={<AdvertisingDashboard />} />
      <Route path='/publications' element={<PublicationDashboard />} />
      <Route path='/publications/:id' element={<SinglePublication />} />
      <Route path='/advertisers' element={<AdvertisersDashboard />} />
      <Route path='/advertisers/:id' element={<SingleAdvertiser />} />
      <Route path='/users/profile/:id' element={<UserProfile />} />
      {/* Admin Routes */}
      <Route path='/admin' element={<AdminDashboard />} />
      <Route path='/admin/accounts' element={<AccountsDashboard />} />
      <Route path='/admin/classifieds' element={<ClassifiedsDashboard />} />

      <Route path='/login' element={<LoginScreen />} />
      <Route path='/register' element={<RegisterScreen />} />
    </Route>
  )
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
