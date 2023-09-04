import Icon from '@/components/Icon';
import _ from 'lodash';
import { useState } from 'react';
import styles from './index.less';

interface ICollapseTitleProps {
  tagList: { name: string; [key: string]: any }[];
  setTagList?: (tagList: any[]) => void;
  isDetail?: boolean;
  detailToggle?: boolean;
  hasBorder?: boolean;
}

const CollapseTag: React.FC<ICollapseTitleProps> = (props) => {
  const { tagList = [], setTagList, isDetail, detailToggle, hasBorder } = props;
  const [isShowTagInfo, setIsShowTagInfo] = useState<boolean>(false);
  if (isDetail && tagList?.length > 0) {
    return (
      <div
        style={detailToggle ? { maxHeight: 'unset' } : {}}
        className={styles.tag}
      >
        {tagList?.map((item: any) => (
          <div className={styles.tagItem}>{item?.name ?? '--'}</div>
        ))}
      </div>
    );
  }

  if (tagList?.length > 0) {
    return (
      <div
        style={detailToggle ? { maxHeight: 'unset' } : {}}
        className={styles.tag}
      >
        {tagList?.map((item: any, index) => (
          <div
            className={styles.tagItem}
            style={hasBorder ? { border: '1px solid #dde4f8' } : {}}
          >
            {item?.name ?? '--'}
            <Icon
              type="icon-guanbi"
              onClick={() => {
                const _selectList = _.cloneDeep(tagList);
                _selectList.splice(index, 1);
                setTagList?.(_selectList);
              }}
            />
          </div>
        ))}
      </div>
    );
  }

  if (tagList?.length > 4) {
    return (
      <div
        className={styles.collapse}
        onClick={() => setIsShowTagInfo(!isShowTagInfo)}
      >
        {isShowTagInfo ? (
          <>
            收起
            <Icon type="icon-shang2" className={styles.icon} />
          </>
        ) : (
          <>
            展开全部
            <Icon type="icon-xia2" className={styles.icon} />
          </>
        )}
      </div>
    );
  }

  return null;
};

export default CollapseTag;
