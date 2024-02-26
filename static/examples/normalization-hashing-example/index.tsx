
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter } from 'react-router-dom';


import {App} from './App';

import './App.scss';

const router = createBrowserRouter([
    {
      path: 'examples/normalization-hashing-example/',
      element: (
        <App />
      )
    },
  ]);
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render();

