import { ReactNode } from 'react';
import styles from './index.less';

interface IEmptyProps {
  description?: ReactNode;
  image?: ReactNode;
  style?: React.CSSProperties;
  className?: string;
}

const Empty: React.FC<IEmptyProps> = (props) => {
  const { description = '暂无数据', image, style, className } = props;

  return (
    <div style={style} className={`${styles.empty} ${className}`}>
      {image ? image : <img src={require('@/assets/images/empty.png')} />}
      {description}
    </div>
  );
};

export default Empty;
