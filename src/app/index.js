import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './layout/layout';
import CatalogPage from '../pages/catalog';
import NotFound from '../pages/not-found';
import ProductPage from './product';
import Basket from './basket';

/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {
  return (
    <RouterProvider
      router={createBrowserRouter([
        {
          path: '/',
          element: <Layout />,
        },
        {
          path: '/product/:id',
          element: <ProductPage />,
        },
        {
          path: '*',
          element: <NotFound />,
        },
      ])}
    />
  );
}

export default App;
