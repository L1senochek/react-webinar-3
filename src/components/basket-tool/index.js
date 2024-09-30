import { memo, useCallback } from 'react';
import { cn as bem } from '@bem-react/classname';
import { numberFormat, plural } from '../../utils';
import './style.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useSelector from '../../store/use-selector';
import useStore from '../../store/use-store';

function BasketTool() {
  const store = useStore();
  const navigate = useNavigate();
  const location = useLocation();

  const select = useSelector(state => ({
    list: state.catalog.list,
    amount: state.basket.amount,
    sum: state.basket.sum,
  }));

  const callbacks = {
    // Открытие модалки корзины
    openModalBasket: useCallback(() => {
      store.actions.modals.open('basket');
      if (location.pathname.includes('/product/')) {
        navigate('/');
      }
    }, [store]),
  };

  const cn = bem('BasketTool');
  return (
    <div className={cn()}>
      <div className={cn('left-side')}>
        <Link to={'/'}>Главная</Link>
      </div>
      <div className={cn('right-side')}>
        <span className={cn('label')}>В корзине:</span>
        <span className={cn('total')}>
          {select.amount
            ? `${select.amount} ${plural(select.amount, {
                one: 'товар',
                few: 'товара',
                many: 'товаров',
              })} / ${numberFormat(select.sum)} ₽`
            : `пусто`}
        </span>
        <button onClick={callbacks.openModalBasket}>Перейти</button>
      </div>
    </div>
  );
}

export default memo(BasketTool);
