import { Radio, RadioGroupProps } from 'antd-mobile';
import styles from './index.less';

interface IRadioGroupProps extends RadioGroupProps {
  list: { value: string; label: string }[];
}

const RadioGroup: React.FC<IRadioGroupProps> = (props) => {
  const { list = [], value, onChange, disabled, ...restProps } = props;
  return (
    <Radio.Group
      value={value}
      disabled={disabled}
      onChange={onChange}
      {...restProps}
    >
      {list.map((item) => (
        <Radio
          value={item.value}
          key={item.value}
          icon={(flag) => (
            <img
              className={styles.icon}
              src={require(
                `@/assets/images/${flag ? 'checked' : 'unChecked'}.png`,
              )}
            />
          )}
        >
          {item?.label ?? '--'}
        </Radio>
      ))}
    </Radio.Group>
  );
};

export default RadioGroup;
