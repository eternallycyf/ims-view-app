import SearchBarContainer from '@/components/SearchBarContainer';
import { getCustomerList } from '@/services';
import { ICustomerItemProps } from '@/typings';
import { CheckList, NavBar, Popup } from 'antd-mobile';
import { usePropsValue } from 'antd-mobile/es/utils/use-props-value';
import _ from 'lodash';
import { ReactNode, useEffect, useState } from 'react';
import { useAsync } from 'react-use';
import styles from './index.less';

interface ISelectCustomerProps {
  visible?: boolean;
  value?: Array<string>;
  defaultCustomerList?: Array<ICustomerItemProps>;
  defaultValue?: Array<string>;
  multiple?: boolean;

  onClose?: () => void;
  children?: (items: Array<ICustomerItemProps>) => ReactNode;
  onConfirm?: (
    value: Array<string> | undefined,
    rawValue: Array<ICustomerItemProps>,
  ) => void;
}

const getRawItem = (
  dataSource: Array<ICustomerItemProps>,
  keys: Array<string>,
) => {
  return dataSource.filter((item) => keys.includes(String(item.id)));
};

const SelectCustomer: React.FC<ISelectCustomerProps> = (props) => {
  const { defaultValue = [], defaultCustomerList = [] } = props;
  const [searchValue, setSearchValue] = useState<string>('');

  const { loading, value: customerList = [] } = useAsync(async () => {
    if (!searchValue && _.isEmpty(defaultCustomerList))
      return defaultCustomerList;
    return await getCustomerList(searchValue);
  }, [searchValue, defaultCustomerList]);

  const [value, setValue] = usePropsValue({
    value: props.value,
    defaultValue,
    onChange: (val) => {
      props.onConfirm?.(val, getRawItem(customerList, val));
    },
  });

  const [formValue, setFormValue] = useState<string[]>(value);

  useEffect(() => {
    if (props?.visible) setFormValue(value);
  }, [props.visible]);

  useEffect(() => {
    if (!props.visible) setFormValue(value);
  }, [value]);

  return (
    <>
      <Popup
        visible={props?.visible}
        bodyStyle={{ height: '100vh', top: 0 }}
        destroyOnClose
      >
        <div className={styles.container}>
          <div className={styles.headerContainer}>
            <NavBar
              onBack={() => props?.onClose?.()}
              right={
                <span
                  className={styles.submitBtn}
                  style={{ color: '#000' }}
                  onClick={() => {
                    setValue(formValue);
                    props?.onClose?.();
                  }}
                >
                  确认
                </span>
              }
            >
              选择客户
            </NavBar>
          </div>

          <div className={styles.searchContainer}>
            <SearchBarContainer
              placeholder="请输入内容"
              style={{ '--border-radius': '100px' }}
              onSearch={(value) => {
                setSearchValue(value);
                setFormValue([]);
              }}
            />
          </div>

          <div className={styles.scrollContainer}>
            <CheckList
              multiple={props?.multiple}
              defaultValue={formValue}
              onChange={(values) => setFormValue(values)}
            >
              {customerList?.map((item: any) => (
                <CheckList.Item key={item?.id} value={item?.id}>
                  {item?.text ?? '--'}
                </CheckList.Item>
              ))}
            </CheckList>
          </div>
        </div>
      </Popup>
      {props?.children?.(getRawItem(customerList, formValue))}
    </>
  );
};

export default SelectCustomer;
