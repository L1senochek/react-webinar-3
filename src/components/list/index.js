import React from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import Item from '../item';
import './style.css';

function List({ list, buttonFunction, buttonLabel }) {
  const cn = bem('List');

  return (
    <div className={cn()}>
      {list.map(item => (
        <div key={item.code} className={cn('item')}>
          <Item item={item} buttonFunction={buttonFunction} buttonLabel={buttonLabel} />
        </div>
      ))}
    </div>
  );
}

List.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number,
    }),
  ).isRequired,
  buttonFunction: PropTypes.func.isRequired,
  buttonLabel: PropTypes.node.isRequired,
};

export default React.memo(List);
