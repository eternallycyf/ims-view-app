import { DeepPartial, IBaseCustomFormItemProps } from '@/typings';
import {
  CalendarPicker,
  CalendarPickerProps,
  DatePicker,
  DatePickerProps,
  Picker,
  PickerProps,
} from 'antd-mobile';
import React, { Fragment, useImperativeHandle } from 'react';

export interface IPickerControlProps<T = PickerProps['value']>
  extends Omit<IBaseCustomFormItemProps<T>, 'type'> {
  controlProps: DeepPartial<
    PickerProps &
      CalendarPickerProps &
      DatePickerProps & {
        onChange?: any;
        placeholder?: string;
        /**
         * @description 自定义渲染内容
         */
        renderContent?: ((value: T) => React.ReactNode) | React.ReactNode;
      }
  >;
  defaultVal?: any;
  onChange: (value: T) => any;
  type: 'picker' | 'cascadePicker' | 'datePicker';
  value: T;
}

const PickerControl = React.forwardRef<any, IPickerControlProps>(
  (props, ref) => {
    const {
      type,
      controlProps: defaultControlProps,
      value,
      onChange,
      defaultVal,
      label,
      name,
      id,
    } = props;
    let Component: any = null;
    const [visible, setVisible] = React.useState<boolean>(false);
    useImperativeHandle(ref, () => ({}));

    const renderLabel = () => {
      let renderContent: any = () => '';
      if (type == 'cascadePicker' || type == 'picker') {
        renderContent = (v: any) => {
          return 'xxx';
        };
      }
      if (type == 'datePicker') {
        renderContent = (v: any) => {
          return 'xxx';
        };
      }
      return (
        <div onClick={() => setVisible(true)}>
          {value
            ? controlProps?.renderContent &&
              typeof controlProps?.renderContent == 'function'
              ? controlProps?.renderContent?.(value)
              : renderContent(value) || controlProps?.placeholder
            : controlProps?.placeholder}
        </div>
      );
    };

    const _getPlaceholder = () => {
      if (['datePicker'].includes(type)) {
        return (
          defaultControlProps?.placeholder || defaultVal[type]?.placeholder
        );
      }
      return defaultControlProps?.placeholder
        ? defaultControlProps?.placeholder
        : typeof label === 'string' && label?.length <= 5
          ? `${`请选择${label}`}`
          : `${'请选择'}`;
    };

    let controlProps: IPickerControlProps['controlProps'] = {
      ...defaultVal[type],
      placeholder: _getPlaceholder(),
      visible,
      onClose: () => setVisible(false),
      value,
      onConfirm: (v: any) => onChange(v),
      closeOnMaskClick: false,
      forceRender: true,
      ...defaultControlProps,
    };

    if (type === 'cascadePicker') {
      return (
        <Fragment>
          <CalendarPicker {...(controlProps as any)} />
          {renderLabel()}
        </Fragment>
      );
    } else if (type === 'datePicker') {
      return (
        <Fragment>
          <DatePicker {...(controlProps as any)} />
          {renderLabel()}
        </Fragment>
      );
    }

    return (
      <Fragment>
        <Picker {...(controlProps as any)} />
        {renderLabel()}
      </Fragment>
    );
  },
);

PickerControl.defaultProps = {
  defaultVal: {
    picker: {
      placeholder: '请选择',
    },
    cascadePicker: {
      placeholder: '请选择',
    },
    datePicker: {
      placeholder: '请选择',
    },
  },
};

export default PickerControl;
