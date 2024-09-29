import Basket from '../../app/basket';
import Main from '../../app/main';
import MainMenu from '../../components/main-menu';
import useSelector from '../../store/use-selector';

/**
 * @returns {React.ReactElement}
 */
function Layout() {
  const activeModal = useSelector(state => state.modals.name);

  return (
    <>
      <Main />
      {activeModal === 'basket' && <Basket />}
    </>
  );
}

export default Layout;
