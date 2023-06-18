import { classNames } from 'shared/lib/classNames/classNames';
import './Loader.scss';

interface LoaderProps {
  className?: string;
}

export const Loader = ({ className }: LoaderProps) => {
  return (
    <div
      className={classNames('loadingio-spinner-eclipse-2xh8bf75jes', {}, [
        className,
      ])}
    >
      <div className="ldio-i1tj8ccdvsg">
        <div />
      </div>
    </div>
  );
};
