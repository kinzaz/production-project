import {
  FunctionComponent,
  ImgHTMLAttributes,
  ReactElement,
  useLayoutEffect,
  useState,
} from 'react';

interface AppImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  className: string;
  fallback?: ReactElement;
  errorFallback?: ReactElement;
}

export const AppImage: FunctionComponent<AppImageProps> = ({
  className,
  src,
  alt = 'image',
  fallback,
  errorFallback,
  ...props
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useLayoutEffect(() => {
    const img = new Image();
    img.src = src ?? '';
    img.onload = () => {
      setIsLoading(false);
    };
    img.onerror = () => {
      setIsLoading(false);
      setIsError(true);
    };
  }, [src]);

  if (isLoading && fallback) return fallback;
  if (isError && errorFallback) return errorFallback;

  return <img className={className} alt={alt} src={src} {...props} />;
};
