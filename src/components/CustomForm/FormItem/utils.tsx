import { FieldCompType, Search } from '@/typings/form';
import { getUUID } from '@/utils/utils';
import { Form } from 'antd-mobile';
import _ from 'lodash';
import React from 'react';

const Simple = React.lazy(() => import('./simple'));
const Update = React.lazy(() => import('./update'));
const Picker = React.lazy(() => import('./picker'));

/**
 * 获取控件
 * @param props
 */
export const getFieldComp: FieldCompType = ({
  form,
  name,
  label,
  type,
  initialValue: initValue,

  fetchConfig,
  dict,
  record = {} as any,
  controlProps = {} as any,
  itemProps = {} as any,
  Component,
}) => {
  let formProps: Partial<Search> = {
    label,
    name,
    type: type ?? 'input',
    record,
    form: form as any,
    fetchConfig,
    dict,
    itemProps,
    controlProps,
    Component,
  };
  if (!fetchConfig) formProps = _.omit(formProps, ['fetchConfig']);

  let FieldComp: React.LazyExoticComponent<React.FC<any>> | null = null;

  // 特殊处理
  if (initValue) {
    itemProps.initialValue = initValue;
  }
  if (type === 'switch') {
    itemProps.valuePropName = 'checked';
  }

  switch (type) {
    case 'input':
    case 'textarea':
    case 'radio':
    case 'checkbox':
    case 'rate':
    case 'switch':
    case 'slider':
    case 'stepper':
    case 'selector':
    case 'custom':
      FieldComp = Simple;
      break;
    case 'picker':
    case 'cascadePicker':
    case 'datePicker':
      FieldComp = Picker;
      break;

    case 'update':
      FieldComp = Update;
      break;
    default:
      FieldComp = null;
  }

  if (!FieldComp) return null;

  if (form) {
    return (
      <Form.Item
        key={name}
        name={name}
        label={label ?? ''}
        rules={formProps?.rules || []}
        {...(formProps?.itemProps as any)}
      >
        <FieldComp {...formProps} />
      </Form.Item>
    );
  } else {
    // TODO: 如果用了 Suspense, Form.Item就传递不了onchange value了 需要类似上边的
    return <FieldComp key={name} {...formProps} />;
  }
};

export const renderFormItem = (item: any, index?: number) => {
  const {
    name,
    type,
    initialValue,
    formFieldProps,
    controlProps,
    ...otherProps
  } = item;
  const myControlProps = {
    ...controlProps,
    size: (controlProps && controlProps.size) || 'small',
  };
  const fieldProps = {
    name,
    type,
    initialValue,
    formFieldProps,
    controlProps: myControlProps,
    ...otherProps,
  };
  if (item.children) {
    return item.children.map((child: any, childIndex: number) =>
      renderFormItem(child, childIndex),
    );
  }
  return getFieldComp(fieldProps);
};
