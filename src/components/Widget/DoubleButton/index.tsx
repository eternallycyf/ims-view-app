import { Button } from 'antd-mobile';
import { ReactNode } from 'react';
import styles from './index.less';

interface IDoubleButton {
  buttonList: {
    handleClick:
      | ((
          event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
        ) => void | Promise<void> | unknown)
      | undefined;
    title?: ReactNode;
    loading?: boolean;
    style?: React.CSSProperties;
  }[];
}

const DoubleButton: React.FC<IDoubleButton> = (props) => {
  const { buttonList = [] } = props;
  return (
    <div className={styles.buttonBtn}>
      {buttonList?.map((item, index) => (
        <Button
          className={styles.btn}
          style={item?.style}
          color="primary"
          onClick={item?.handleClick}
          loading={item?.loading}
          key={index}
        >
          {item?.title ?? '--'}
        </Button>
      ))}
    </div>
  );
};

export default DoubleButton;
