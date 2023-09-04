import Icon from '@/components/Icon';
import { ReactNode } from 'react';
import styles from './index.less';

interface ICollapseTitleProps {
  title: string | ReactNode;
  tagList?: { name: string; [key: string]: any }[];
  detailToggle?: boolean;
  setDetailToggle?: (toggle: boolean) => void;
  isDetail?: boolean;
  onClick?: () => void;
}

const CollapseTitle: React.FC<ICollapseTitleProps> = (props) => {
  const {
    title,
    tagList = [],
    detailToggle,
    setDetailToggle,
    isDetail,
    onClick,
  } = props;

  return (
    <div className={styles.titleCard}>
      <span>{title}</span>

      {isDetail ? (
        <span
          onClick={() => setDetailToggle?.(!detailToggle)}
          className={styles.subTitle}
          style={{ margin: 0 }}
        >
          共{tagList?.length ?? '--'}人
          {tagList?.length > 5 && (
            <span className={`${styles.collapseTag} primaryColor`}>
              {detailToggle ? (
                <>
                  收起
                  <Icon type="icon-shang2" className={styles.icon} />
                </>
              ) : (
                <>
                  展开
                  <Icon type="icon-xia2" className={styles.icon} />
                </>
              )}
            </span>
          )}
        </span>
      ) : (
        <div className={styles.add} onClick={onClick}>
          <Icon type="icon-tianjia" className={styles.icon} />
          添加
        </div>
      )}
    </div>
  );
};

export default CollapseTitle;
