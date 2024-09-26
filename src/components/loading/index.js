import { memo } from 'react';
import PageLayout from '../page-layout';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function Loading() {
  const cn = bem('Loading');

  return (
    <PageLayout>
      <div className={cn()}>Loading...</div>
    </PageLayout>
  );
}

export default memo(Loading);
