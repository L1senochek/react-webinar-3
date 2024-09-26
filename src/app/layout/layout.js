import { Outlet } from 'react-router-dom';
import Basket from '../../app/basket';
import Main from '../../app/main';
import useSelector from '../../store/use-selector';

/**
 * @returns {React.ReactElement}
 */
function Layout() {
  const activeModal = useSelector(state => state.modals.name);

  return (
    <>
      <Outlet />
      {activeModal === 'basket' && <Basket />}
    </>
  );
}

export default Layout;
