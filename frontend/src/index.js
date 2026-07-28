import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import PublicationDashboard from './screens/PublicationDashboard';
import AdvertisingDashboard from './screens/AdvertisingDashboard';
import SinglePublication from './screens/SinglePublication';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index={true} path='/' element={<AdvertisingDashboard />} />
      <Route path='/publications' element={<PublicationDashboard />} />
      <Route path='/publications/:id' element={<SinglePublication />} />
    </Route>
  )
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

reportWebVitals();
