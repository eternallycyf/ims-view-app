import { getDvaApp, history } from '@umijs/max';
import { useEffect } from 'react';
import { AliveScope } from 'react-activation';
import { useSearchParam } from 'react-use';
import { local_token, setStore } from './utils/storage';

const Init = (props: { children: React.ReactNode }) => {
  const token = useSearchParam('token');
  if (token) setStore(local_token, token);

  const handleRouterChange = async () => {
    const dispatch = getDvaApp?.()._store.dispatch;
    await dispatch({ type: 'global/fetch', payload: {} });
    await dispatch({ type: 'global/fetchUserInfo' });
    await dispatch({ type: 'global/fetchMenu' });
    await dispatch({ type: 'global/fetchAccessCollection' });
  };

  useEffect(() => {
    addParams();
    // history.listen((location) => {
    //   addParams(location);
    // });
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  useEffect(() => {
    handleRouterChange();
  }, [getDvaApp()?._store]);

  function addParams(defaultLocation?: any) {
    const location = defaultLocation || window.location;
    if (!location.query?.dd_full_screen) {
      history.replace({
        ...location,
        search: undefined,
        query: {
          ...location.query,
          dd_full_screen: 'true',
        },
      });
    }
  }

  return props.children;
};

export function rootContainer(container: React.ReactNode) {
  return (
    <Init>
      <AliveScope>{container}</AliveScope>
    </Init>
  );
}
