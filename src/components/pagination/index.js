import React, { memo, useMemo } from 'react';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function Pagination({ currentPage, totalPages, onPageChange }) {
  const cn = bem('Pagination');

  const pagination = useMemo(() => {
    const pages = [];

    if (currentPage > 2) {
      pages.push(1);
    }

    if (currentPage >= 3) {
      pages.push('...');
    }

    if (currentPage > 1) {
      pages.push(currentPage - 1);
    }

    pages.push(currentPage);

    if (currentPage < totalPages) {
      pages.push(currentPage + 1);
    }

    if (currentPage < totalPages - 1) {
      pages.push('...');
    }

    if (currentPage < totalPages - 1) {
      pages.push(totalPages);
    }

    return pages;
  }, [currentPage, totalPages]);

  return (
    <div className={cn()}>
      {pagination.map((pageNum, index) => (
        <button
          key={index}
          className={cn('button', {
            active: pageNum === currentPage,
            disabled: pageNum === currentPage || pageNum === '...',
          })}
          onClick={() => typeof pageNum === 'number' && onPageChange(pageNum)}
          disabled={pageNum === currentPage || pageNum === '...'}
        >
          {pageNum}
        </button>
      ))}
    </div>
  );
}

export default memo(Pagination);
