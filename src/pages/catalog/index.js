import Basket from '../../app/basket';
import Main from '../../app/main';
import useSelector from '../../store/use-selector';

/**
 * @returns {React.ReactElement}
 */
function CatalogPage() {
  const activeModal = useSelector(state => state.modals.name);

  return (
    <>
      <Main />
      {activeModal === 'basket' && <Basket />}
    </>
  );
}

export default CatalogPage;
