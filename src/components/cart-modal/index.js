import React from 'react';
import PropTypes from 'prop-types';
import './style.css';
import PageLayout from '../page-layout';
import Head from '../head';
import Controls from '../controls';
import List from '../list';

function CartModal({ cart, onRemoveFromCart, onClose }) {
  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="CartModal">
      <PageLayout>
        <Head title="Корзина">
          <button className="CartModal-close" onClick={onClose}>
            Закрыть
          </button>
        </Head>
        <Controls />
        <List list={cart} buttonFunction={onRemoveFromCart} buttonLabel={'Удалить'} />
        <div className="CartModal-total">
          <strong>Итого: {totalPrice} ₽</strong>
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
