import { FormItemProps } from 'antd-mobile';
import { FormInstance } from 'antd-mobile/es/components/form';
import { AnyObject } from '../type';
import {
  Dict,
  type FormControlType,
  type IControlProps,
  type IFetchConfig,
  type ItemProps,
} from './base';
import { IBaseCustomFormItemProps } from './formItem';

export type NameKey<Values = AnyObject> =
  | (keyof Values & string)
  | [number, keyof Values & string];

export interface IBaseFormControl<
  Values = AnyObject,
  Rest = AnyObject,
  Extra = unknown,
> {
  form?: FormInstance;
  name?: NameKey<Values>;
  label?: React.ReactNode;
  type?: FormControlType;
  initialValue?: any;
  record?: Values;
  dict?: Dict;

  fetchConfig?: IFetchConfig<any>;
  controlProps?: IControlProps<Values, Rest, Extra>;
  itemProps?: ItemProps<Values, Rest, Extra>;

  Component?: (
    props: IBaseCustomFormItemProps & {
      controlProps: IControlProps & {
        onChange?: any;
      };
      onChange: (value: any) => any;
      value?: any;
      placeholder?: IControlProps['placeholder'];
    },
  ) => React.ReactNode;
}

export type Search<
  Values = AnyObject,
  Rest = AnyObject,
  Extra = unknown,
> = IBaseFormControl<Values, Rest, Extra> & Rest;

export type FieldCompType = {
  <Values = AnyObject, Rest = AnyObject, Extra = unknown>(
    ...args: Search<Values, Rest, Extra>[]
  ): React.ReactNode;
};

export type ISearchesType<
  Values = AnyObject,
  Rest = AnyObject,
  Extra = unknown,
> = Search<Values, Rest, Extra>[];

export type IUpdateSearchType<
  Values = AnyObject,
  Rest = AnyObject,
  Extra = unknown,
  FormValues = Values,
> = Omit<IBaseFormControl<FormValues, Rest, Extra>, 'itemProps' | 'name'> & {
  name?: NameKey<Values>;
  itemProps?: Omit<Search<FormValues, Rest>['itemProps'], 'shouldUpdate'> & {
    shouldUpdate?: FormItemProps['shouldUpdate'];
  };
} & Rest;

export type IUpdateSearchesType<
  Values = AnyObject,
  Rest = AnyObject,
  Extra = unknown,
  FormValues = Values,
> = IUpdateSearchType<Values, Rest, Extra, FormValues>[];
