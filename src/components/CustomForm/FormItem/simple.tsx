import {
  AnyObject,
  DeepPartial,
  IBaseControlProps,
  IBaseCustomFormItemProps,
} from '@/typings';
import {
  Checkbox,
  CheckboxGroupProps,
  CheckboxProps,
  Input,
  InputProps,
  Radio,
  RadioGroupProps,
  RadioProps,
  Rate,
  RateProps,
  Selector,
  SelectorProps,
  Slider,
  SliderProps,
  Stepper,
  StepperProps,
  Switch,
  SwitchProps,
  TextArea,
  TextAreaProps,
} from 'antd-mobile';
import moment from 'moment';
import 'moment/locale/zh-cn';
import React, { useImperativeHandle } from 'react';
const RadioGroup = Radio.Group;
const CheckboxGroup: any = Checkbox.Group;

moment.locale('zh-cn');

interface IBaseSimpleBaseControlProps
  extends Pick<IBaseControlProps, 'Component' | 'dict'> {}

type ISimpleBaseControlProps = IBaseSimpleBaseControlProps &
  InputProps &
  TextAreaProps &
  StepperProps &
  RateProps &
  SliderProps &
  SwitchProps &
  CheckboxProps &
  CheckboxGroupProps &
  RadioProps &
  RadioGroupProps &
  SelectorProps<any>;

export interface ISimpleControlProps<T = AnyObject>
  extends Omit<IBaseCustomFormItemProps<T>, 'type'> {
  controlProps: DeepPartial<Omit<ISimpleBaseControlProps, 'placeholder'>> & {
    onChange?: any;
    placeholder?: string | string[] | undefined;
  };
  defaultVal?: any;
  checked?: boolean;
  onChange: (value: T) => any;
  type:
    | 'input'
    | 'textarea'
    | 'rate'
    | 'switch'
    | 'stepper'
    | 'slider'
    | 'checkbox'
    | 'radio'
    | 'selector'
    | 'custom';
  value: T;
}

const SimpleControl = React.forwardRef<any, ISimpleControlProps>(
  (props, ref) => {
    const {
      name,
      label,
      form,
      type,
      dict,
      defaultVal,
      Component: CustomComponent,
      checked = false,
      controlProps: defaultControlProps = {},
      itemProps,
      ...restProps
    } = props;

    const _getPlaceholder = () => {
      let defaultType = ['input', 'textarea', 'stepper'].includes(type)
        ? 'input'
        : 'select';

      return defaultControlProps?.placeholder
        ? defaultControlProps?.placeholder
        : typeof label === 'string' && label?.length <= 5
          ? `${defaultType === 'input' ? `请输入${label}` : `请选择${label}`}`
          : `${defaultType === 'input' ? '请输入' : '请选择'}`;
    };

    let Component: any;
    let controlProps: any = {
      ...defaultVal[type],
      placeholder: _getPlaceholder(),
      ...defaultControlProps,
      ...restProps,
    };

    useImperativeHandle(ref, () => ({}));

    switch (type) {
      case 'input':
        Component = Input;
        break;
      case 'textarea':
        Component = TextArea;
        break;
      case 'rate':
        Component = Rate;
        break;
      case 'switch':
        Component = Switch;
        break;
      case 'stepper':
        Component = Stepper;
        break;
      case 'slider':
        Component = Slider;
        break;
      case 'custom':
        Component = CustomComponent;
    }

    const formProps = { form, name, type };

    if (type === 'checkbox') {
      return (
        <CheckboxGroup {...(controlProps as any as CheckboxGroupProps)}>
          {dict?.map((item) => (
            <Checkbox {...item} key={item.value} value={item.value}>
              {item?.label}
            </Checkbox>
          ))}
        </CheckboxGroup>
      );
    } else if (type === 'radio') {
      let RadioComp: any = Radio;
      return (
        <RadioGroup ref={ref} {...controlProps}>
          {dict?.map((item) => (
            <RadioComp
              {...item}
              key={item.value}
              value={item.value}
              title={item.label}
            >
              {item.label}
            </RadioComp>
          ))}
        </RadioGroup>
      );
    } else if (type == 'selector') {
      return (
        <Selector
          ref={ref}
          options={controlProps?.options || []}
          {...controlProps}
        />
      );
    } else {
      if (type === 'switch') {
        controlProps = { ...controlProps, checked: !!checked };
      }

      if (type === 'custom') {
        return Component({
          ref,
          ...controlProps,
          ...formProps,
          ...controlProps?.style,
        });
      }

      return (
        <Component
          ref={ref}
          {...controlProps}
          {...formProps}
          style={{ ...controlProps?.style }}
        />
      );
    }
  },
);

SimpleControl.defaultProps = {
  defaultVal: {
    input: {
      allowClear: true,
    },
    textarea: {
      autoSize: { minRows: 2, maxRows: 5 },
      allowClear: true,
    },
    stepper: {
      min: 0,
      max: 100,
    },
  },
};

export default SimpleControl;
