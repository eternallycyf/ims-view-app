import { Search } from '.';
import { AnyObject } from '../type';

export interface IBaseCustomFormItemProps<
  Values = AnyObject,
  Rest = AnyObject,
  Extra = unknown,
> extends Pick<
    Search<Values, Rest, Extra>,
    | 'form'
    | 'itemProps'
    | 'name'
    | 'record'
    | 'dict'
    | 'Component'
    | 'fetchConfig'
    | 'type'
    | 'label'
  > {
  id?: string;
}
