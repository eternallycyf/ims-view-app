import { Checkbox as AntdCheckbox, CheckboxProps } from 'antd-mobile';
import styles from './index.less';
export default function Checkbox(props: CheckboxProps) {
  return (
    <AntdCheckbox
      icon={(flag) => (
        <img
          className={styles.icon}
          src={require(`@/assets/images/${flag ? 'checked' : 'unChecked'}.png`)}
        />
      )}
    ></AntdCheckbox>
  );
}
