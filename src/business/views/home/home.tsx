import { handleCopyText } from '@/utils/global';
import { useState } from 'react';
import KeepAlive from 'react-activation';
import { history } from 'umi';
import styles from './index.less';

const Home = () => {
  const [count, setCount] = useState(0);

  return (
    <div className={styles.foo}>
      <h1>home</h1>
      <p onClick={() => handleCopyText('ssss')}>count: {count}</p>
      <button onClick={() => setCount(count + 1)}>add</button>
      <button onClick={() => history.push('/my')}>go my</button>
    </div>
  );
};

export default function (props: any) {
  return (
    <KeepAlive name="home" when={true}>
      <Home {...props} />
    </KeepAlive>
  );
}
