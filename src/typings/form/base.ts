import { IPickerControlProps } from '@/components/CustomForm/FormItem/picker';
import { ISimpleControlProps } from '@/components/CustomForm/FormItem/simple';
import { FormItemProps } from 'antd-mobile';
import { FormInstance } from 'antd-mobile/es/components/form';
import { ISearchesType, Search } from '.';
import { AnyObject, DeepPartial } from '../type';

export const FORM_TYPE_DICT = [
  'input',

  'textarea',
  'stepper',

  'checkbox',
  'radio',
  'rate',
  'slider',
  'switch',

  'picker',
  'cascadePicker',
  'datePicker',

  'update',
  'custom',
] as const;

export type FormControlType = (typeof FORM_TYPE_DICT)[number];

export type ItemProps<Values, Rest, Extra> = FormItemProps & {
  next?: (
    values: Values,
    form: Omit<FormInstance, 'scrollToField' | 'getFieldInstance'>,
  ) =>
    | false
    | React.ReactNode
    | DeepPartial<ISearchesType<Values, Rest, Extra>>;
};

export interface IFetchConfig<Record = AnyObject> {
  request?: (params?: any) => Promise<Record>;
}

export type Dict = ReadonlyArray<{
  label?: string;
  value?: string | number;
  disabled?: boolean;
  children?: Array<Dict>;
  rules?: any[];
  placeholder?: string;
  onChange?: (...args: any[]) => any;
}>;

/*---------------------IControlProps--------------------------------- */

export interface IBaseControlProps<
  Values = AnyObject,
  Rest = AnyObject,
  Extra = unknown,
> extends Pick<
    Search<Values, Rest, Extra>,
    'fetchConfig' | 'itemProps' | 'dict' | 'Component' | 'label'
  > {}

export type IControlProps<
  Values = AnyObject,
  Rest = AnyObject,
  Extra = unknown,
> = IBaseControlProps<Values, Rest, Extra> &
  ISimpleControlProps<Values>['controlProps'] &
  IPickerControlProps<Values>['controlProps'];
