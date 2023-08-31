import { useState } from 'react';
import KeepAlive from 'react-activation';
import styles from './index.less';
import { history } from 'umi';

const My = () => {
  const [count, setCount] = useState(0);

  return (
    <div className={styles.foo}>
      <h1>My</h1>
      <p>count: {count}</p>
      <button onClick={() => setCount(count + 1)}>add</button>
      <button onClick={() => history.push('/home')}>go home</button>
    </div>
  );
};

export default function (props: any) {
  return (
    <KeepAlive name="my" when={true}>
      <My {...props} />
    </KeepAlive>
  );
}
