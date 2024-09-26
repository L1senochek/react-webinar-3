import { cn as bem } from '@bem-react/classname';
import PageLayout from '../../components/page-layout';
import './style.css';
import { useNavigate } from 'react-router-dom';

/**
 * @returns {React.ReactElement}
 */
function NotFound() {
  const cn = bem('NotFound');
  const navigate = useNavigate();

  const redirectClick = () => navigate('/');

  return (
    <PageLayout>
      <div className={cn()}>
        <div className={cn('wrapper')}>
          <span className={cn('error-title')}>404 </span>
          <span className={cn('separate')}>|</span>
          <span>Not Found</span>
        </div>
        <button className={cn('redirect')} onClick={redirectClick}>
          на главную страницу
        </button>
      </div>
    </PageLayout>
  );
}

export default NotFound;
