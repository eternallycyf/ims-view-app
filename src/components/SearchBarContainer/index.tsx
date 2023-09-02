import { InputRef, SearchBar, SearchBarProps } from 'antd-mobile';
import { debounce } from 'lodash';
import React, { FormEvent, useCallback } from 'react';

interface IProps extends SearchBarProps {
  immediateSearch?: boolean | undefined;
}

type IHandle = InputRef;

const SearchBarContainer: React.ForwardRefRenderFunction<IHandle, IProps> = (
  props,
  ref,
) => {
  const { immediateSearch = true, onSearch } = props;

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  const onChange = useCallback(
    debounce((value: string) => {
      if (!immediateSearch) return;
      if (typeof onSearch !== 'function') return;
      onSearch(value);
    }, 300),
    [],
  );

  // ios输入框显示为搜索
  return (
    <form onSubmit={onSubmit}>
      <SearchBar {...props} onChange={onChange} ref={ref} />
    </form>
  );
};

export default React.forwardRef(SearchBarContainer);
