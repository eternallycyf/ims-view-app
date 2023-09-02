import { history } from '@umijs/max';
import { NavBar, NavBarProps } from 'antd-mobile';
import { FC } from 'react';
import styles from './index.less';

export interface INavBarProps extends NavBarProps {
  children?: React.ReactNode;

  rightText?: React.ReactNode;
  onRightPress?: () => void;
}

interface IProps {
  style?: React.CSSProperties;
  children: React.ReactNode;
  className?: string;

  navBar?: INavBarProps;
}

const Page: FC<IProps> = (props) => {
  const { children, className, style, navBar } = props;

  const handleBack = (): void => {
    history.back();
    navBar?.onBack && navBar.onBack();
  };

  const renderRightButton = () => {
    if (navBar?.right) return navBar.right;

    if (navBar?.rightText) {
      return (
        <span className={styles.submitBtn} onClick={navBar?.onRightPress}>
          {navBar?.rightText}
        </span>
      );
    }

    return null;
  };

  return (
    <div style={style} className={`${styles.container} ${className}`}>
      {navBar && (
        <div className={styles.headerContainer}>
          <NavBar {...navBar} onBack={handleBack} right={renderRightButton()} />
        </div>
      )}
      {children}
    </div>
  );
};

export default Page;
