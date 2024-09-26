import * as React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import CatalogPage from '../pages/catalog';
import ProductPage from '../pages/product';
import Loading from '../components/loading';
import Basket from '../app/basket';

const router = createBrowserRouter([
  {
    path: '/',
    element: <CatalogPage />,
    children: [
      {
        path: '/product/:id',
        element: <ProductPage />,
      },
      {
        path: '/basket',
        element: <Basket />,
      },
    ],
  },
]);

export default router;
