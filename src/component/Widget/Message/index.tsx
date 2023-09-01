import { Toast, ToastShowProps } from 'antd-mobile';
import {
  CheckCircleOutline,
  ExclamationCircleOutline,
  InformationCircleOutline,
} from 'antd-mobile-icons';
import styles from './index.less';

export function Message(
  content: ToastShowProps['content'],
  type: 'success' | 'error' | 'warning' | 'info',
  afterClose?: ToastShowProps['afterClose'],
) {
  const imgs = {
    success: <CheckCircleOutline />,
    warning: <InformationCircleOutline />,
    error: <ExclamationCircleOutline />,
    info: <CheckCircleOutline />,
  };
  return Toast.show({
    content,
    icon: imgs[type],
    maskClickable: false,
    duration: 1000,
    maskClassName: `${type} ${styles.mask}`,
    afterClose,
  });
}
