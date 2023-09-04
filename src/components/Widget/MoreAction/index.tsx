import React, { ReactNode, useImperativeHandle, useState } from 'react';
import styles from './index.less';

interface IMoreActionProps {
  children: React.ReactNode;
  actions: {
    title: string;
    onClick: () => void;
    style?: React.CSSProperties;
    className?: string;
    icon?: ReactNode;
  }[];
}

type IMoreActionHandle = {
  setVisible: (visible: boolean) => void;
};

const MoreAction: React.ForwardRefRenderFunction<
  IMoreActionHandle,
  IMoreActionProps
> = (props, ref) => {
  const [visible, setVisible] = useState<boolean>(false);
  const { children, actions } = props;

  useImperativeHandle(ref, () => ({
    setVisible,
  }));

  return (
    <div
      className={styles.moreAction}
      onClick={(e) => {
        e.stopPropagation();
        setVisible(!visible);
      }}
    >
      {children}
      {visible && (
        <div
          className={styles.actionList}
          onClick={(e) => {
            e.stopPropagation();
            setVisible(true);
          }}
        >
          {actions.map((item) => {
            const { icon, title, className, style, onClick } = item;
            return (
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  onClick();
                  setVisible(false);
                }}
                className={`${styles.actionItem} ${className}`}
                style={style}
              >
                {icon}
                <span className={`${styles.title} ellipsis`}>{title}</span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default React.forwardRef(MoreAction);
