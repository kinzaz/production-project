import { Link, LinkProps } from "react-router-dom";
import styles from "./AppLink.module.scss";
import { classNames } from "shared/lib/classNames/classNames";

export enum AppLinkTheme {
  PRIMARY = "primary",
  SECONDARY = "secondary",
}

interface AppLinkProps extends LinkProps {
  className?: string;
  theme?: AppLinkTheme;
}

export const AppLink = ({
  className,
  children,
  to,
  theme = AppLinkTheme.PRIMARY,
  ...props
}: AppLinkProps) => {
  return (
    <Link
      to={to}
      className={classNames(styles.AppLink, {}, [className, styles[theme]])}
      {...props}
    >
      {children}
    </Link>
  );
};
