import { AnyObject, DeepPartial, ISearchesType } from '@/typings';
import { getUUID } from '@/utils/utils';
import { Form } from 'antd-mobile';
import { FormInstance } from 'antd-mobile/es/components/form';
import React, { Fragment, useImperativeHandle } from 'react';
import { renderFormItem } from './utils';

export interface IUpdateControlProps<
  Values = AnyObject,
  Rest = AnyObject,
  Extra = unknown,
  FormValues = Values,
> {
  itemProps?: {
    shouldUpdate?: (prevValues: Values, nextValues: Values) => boolean;
    next?: (
      values: FormValues,
      form: Omit<FormInstance, 'scrollToField' | 'getFieldInstance'>,
    ) =>
      | false
      | React.ReactNode
      | DeepPartial<ISearchesType<Values, Rest, Extra>>;
    isComponent?: boolean;
  };
}

const UpdateControl = React.forwardRef<any, IUpdateControlProps>(
  (props, ref) => {
    const { itemProps = {}, ...controlProps } = props;
    const { next, shouldUpdate, isComponent = true } = itemProps;

    useImperativeHandle(ref, () => ({}));

    if (!next) return null;

    return (
      <Form.Item noStyle shouldUpdate={shouldUpdate}>
        {(form) => {
          const values = form.getFieldsValue();
          if (!next) return null;
          const nextValues = next(values, form);
          if (nextValues === false) return null;
          if (
            typeof nextValues === 'string' ||
            (React.isValidElement(nextValues) && !Array.isArray(nextValues))
          ) {
            return nextValues;
          }

          return (
            <Fragment key={getUUID()}>
              {((nextValues as any[]) || []).map((item: any, index: number) => {
                if (!isComponent) {
                  return <Fragment key={index}>{renderFormItem({ ...item, form })}</Fragment>
                }
                return (
                  <Fragment key={index}>
                    <Form.Item
                      labelAlign="right"
                      label={item?.label}
                      name={item?.name}
                      rules={item?.rules || []}
                      initialValue={item?.initialValue}
                      {...item.layout}
                      {...item.itemProps}
                    >
                      {renderFormItem(item)}
                    </Form.Item>
                  </Fragment>
                )
              })}
            </Fragment>
          );
        }}
      </Form.Item>
    );
  },
);

UpdateControl.defaultProps = {};

export default UpdateControl;
