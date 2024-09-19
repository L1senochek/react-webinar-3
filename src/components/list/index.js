import React from 'react';
import PropTypes from 'prop-types';
import Item from '../item';
import './style.css';

function List({ list, buttonFunction, buttonLabel }) {
  return (
    <div className="List">
      {list.map(item => (
        <div key={item.code} className="List-item">
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
