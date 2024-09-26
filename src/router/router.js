import * as React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import CatalogPage from '../pages/catalog';
import ProductPage from '../pages/product';
import Loading from '../components/loading';
import Basket from '../app/basket';
import Layout from '../app/layout/layout';
import NotFound from '../pages/not-found';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <CatalogPage />,
        children: [
          {
            path: '/basket',
            element: <Basket />,
          },
        ],
      },
    ],
  },
  {
    path: '/product/:id',
    element: <ProductPage />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);

export default router;
