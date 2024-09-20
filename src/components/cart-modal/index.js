import React from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';
import PageLayout from '../page-layout';
import Head from '../head';
import Controls from '../controls';
import List from '../list';

function CartModal({ cart, onRemoveFromCart, onClose }) {
  const cn = bem('CartModal');
  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className={cn()}>
      <PageLayout>
        <Head title="Корзина">
          <button className={cn('close')} onClick={onClose}>
            Закрыть
          </button>
        </Head>
        <Controls />
        <List list={cart} buttonFunction={onRemoveFromCart} buttonLabel={'Удалить'} />
        <div className={cn('total')}>
          <strong className={cn('result')}>
            <span className={cn('result_title')}>Итого: </span>
            {totalPrice.toLocaleString()} ₽
          </strong>
        </div>
      </PageLayout>
    </div>
  );
}

CartModal.propTypes = {
  cart: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      quantity: PropTypes.number.isRequired,
    }),
  ).isRequired,
  onRemoveFromCart: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default React.memo(CartModal);
