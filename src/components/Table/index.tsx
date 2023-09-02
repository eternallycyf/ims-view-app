import { Empty, Loading, Popover } from 'antd-mobile';
import { get, isEmpty, isNil } from 'lodash';
import React, { FC } from 'react';
import styles from './index.less';

interface IColumnsProps {
  dataIndex: string;
  key?: string;
  title?: string;
  align?: 'left' | 'right' | 'center';
  width?: number;
  render?: (text: string, record: any, index: number) => React.ReactNode;
}

interface IProps {
  dataSource?: Array<any>;
  columns?: Array<IColumnsProps>;
  loading?: boolean;
  className?: string | undefined;
}

const Table: FC<IProps> = (props) => {
  const { columns = [], dataSource = [], loading = false, className } = props;

  return (
    <div className={`${styles.table} ${className}`}>
      <div className={styles.tableColumnHolder}>
        {columns?.map((item, index) => (
          <div
            key={item.dataIndex}
            className={styles.tableColumn}
            style={{ width: item.width }}
          >
            <div
              className={styles.tableColumnItem}
              style={{ textAlign: item?.align || 'left' }}
            >
              {item.title}
            </div>
            {dataSource?.map((data, index) => {
              const text = get(data, item.dataIndex, '--');
              const renderNode = !isNil(item.render)
                ? item?.render(text, data, index)
                : text;
              return (
                <Popover
                  content={renderNode}
                  placement="top"
                  trigger="click"
                  key={index}
                  mode="dark"
                >
                  <div
                    className={styles.tableColumnItem}
                    style={{ textAlign: item?.align || 'left' }}
                  >
                    {renderNode}
                  </div>
                </Popover>
              );
            })}
          </div>
        ))}
        {isEmpty(dataSource) && <Empty description="暂无数据" />}
        {loading && (
          <div className={styles.tableLoading}>
            <Loading color="primary" />
          </div>
        )}
      </div>
    </div>
  );
};

export default React.memo(Table);
