import { useCallback, useContext, useEffect, useState } from 'react';
import Main from './main';
import Basket from './basket';
import useStore from '../store/use-store';
import useSelector from '../store/use-selector';
import { RouterProvider } from 'react-router-dom';
import router from '../router/router';

/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {
  return <RouterProvider router={router} />;
}

export default App;
